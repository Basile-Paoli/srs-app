# Architecture base de données

## Tables

### Table `collections`

| colonne               | type          | description                                                                 |
|-----------------------|---------------|-----------------------------------------------------------------------------|
| id                    | int           | identifiant de la collection                                                |
| name                  | varchar(80)   | nom de la collection                                                        |
| description           | varchar       | description de la collection                                                |
| creator               | int           | identifiant de l'utilisateur qui a créé la collection                       |
| default_answer_fields | varchar(80)[] | liste des champs de réponse par défaut lorsque l'utilisateur ajoute un item |
| is_public             | bool          | indique si la collection est publique ou privée                             |
| is_static             | bool          | indique si la collection est statique (ne peut pas être modifiée)           |

### Table `items`

| colonne       | type | description                            |
|---------------|------|----------------------------------------|
| id            | int  | identifiant de l'item                  |
| prompt        | text | Élément qui s'affiche lors des reviews |
| description   | text | Description de l'item                  |
| collection_id | int  | identifiant de la collection           |

### Table `answer_fields`

| colonne | type           | description                     |
|---------|----------------|---------------------------------|
| id      | int            | identifiant du champ de réponse |
| item_id | int            | identifiant de l'item           |
| label   | varchar(255)   | Label du champ de réponse       |
| answers | varchar(255)[] | Réponse(s) valides              |

### Table `users`

| colonne         | type         | description                     |
|-----------------|--------------|---------------------------------|
| id              | int          | identifiant de l'utilisateur    |
| name            | VARCHAR(255) | nom d'utilisateur               |
| email           | VARCHAR(255) | email de l'utilisateur          |
| "emailVerified" | TIMESTAMPTZ  | date de vérification de l'email |
| image           | TEXT         | image de l'utilisateur          |

### Table `custom_answers`

| colonne         | type         | description                     |
|-----------------|--------------|---------------------------------|
| id              | int          | identifiant de la réponse       |
| user_id         | int          | identifiant de l'utilisateur    |
| answer_field_id | int          | identifiant du champ de réponse |
| answer          | varchar(255) | réponse de l'utilisateur        |

### Table `progress`

| colonne     | type        | description                   |
|-------------|-------------|-------------------------------|
| id          | int         | identifiant de la progression |
| user_id     | int         | identifiant de l'utilisateur  |
| item_id     | int         | identifiant de l'item         |
| next_review | TIMESTAMPTZ | date de la prochaine review   |
| srs_level   | int         | niveau de la répétition       |

### Table `srs_levels`

| colonne  | type | description              |
|----------|------|--------------------------|
| id       | int  | identifiant du niveau    |
| name     | text | nom du niveau            |
| interval | int  | intervalle de répétition |



