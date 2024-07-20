create table verification_token
(
    identifier text                     not null,
    expires    timestamp with time zone not null,
    token      text                     not null,
    primary key (identifier, token)
);

create table accounts
(
    id                  serial
        primary key,
    "userId"            integer      not null,
    type                varchar(255) not null,
    provider            varchar(255) not null,
    "providerAccountId" varchar(255) not null,
    refresh_token       text,
    access_token        text,
    expires_at          bigint,
    id_token            text,
    scope               text,
    session_state       text,
    token_type          text
);

create table sessions
(
    id             serial
        primary key,
    "userId"       integer                  not null,
    expires        timestamp with time zone not null,
    "sessionToken" varchar(255)             not null
);

create table users
(
    id              serial
        primary key,
    name            varchar(255),
    email           varchar(255),
    "emailVerified" timestamp with time zone,
    image           text
);

create table collections
(
    id                    serial
        primary key,
    name                  varchar(80),
    description           varchar,
    creator               integer
        constraint collections_user_id_fkey
            references users,
    default_answer_fields varchar(80)[],
    is_public             boolean   default false,
    is_static             boolean   default false,
    upload_date           timestamp,
    last_edited           timestamp default now()
);

create table items
(
    id            serial
        primary key,
    prompt        text,
    description   text,
    collection_id integer not null
        references collections
);

create table answer_fields
(
    id      serial
        primary key,
    item_id integer
        references items,
    label   varchar(255),
    answers varchar(255)[]
);

create table custom_answers
(
    id              serial
        primary key,
    user_id         integer
        references users,
    answer_field_id integer
        references answer_fields,
    answer          varchar(255)
);

create function to_jsonb_array_accum(jsonb, anynonarray) returns jsonb
    language plpgsql
as
$$
BEGIN
    IF $1 IS NULL THEN
        RETURN to_jsonb($2);
    ELSE
        RETURN $1 || to_jsonb($2);
    END IF;
END;
$$;

create function answer_fields(item items) returns jsonb
    language sql
as
$$
    select to_jsonb_array(answer_fields)
    from answer_fields
    where item_id = item.id;
$$;

create function items(collection collections) returns jsonb
    language sql
as
$$
select to_jsonb_array(items)
from (SELECT items.*, items.answer_fields
      FROM items
      WHERE items.collection_id = collection.id) as items;
$$;

create aggregate to_jsonb_array(anynonarray) (
    sfunc = to_jsonb_array_accum,
    stype = jsonb,
    initcond = '[]'
    );
