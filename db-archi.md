# Architecture base de données
## Tables
### Table `collections`
| colonne     | type | description                                           |
|-------------|------|-------------------------------------------------------|
| id          | int  | identifiant de la collection                          |
| name        | text | nom de la collection                                  |
| description | text | description de la collection                          |
| user_id     | int  | identifiant de l'utilisateur qui a créé la collection |


### Table `items`
| colonne     | type | description                            |
|-------------|------|----------------------------------------|
| id          | int  | identifiant de l'item                  |
| prompt      | text | Élément qui s'affiche lors des reviews |
| description | text | Description de l'item                  |

### Table `collections_items`
| colonne       | type | description                  |
|---------------|------|------------------------------|
| id            | int  | identifiant de la relation   |
| collection_id | int  | identifiant de la collection |
| item_id       | int  | identifiant de l'item        |

### Table `answer_fields`

| colonne | type   | description                     |
|---------|--------|---------------------------------|
| id      | int    | identifiant du champ de réponse |
| item_id | int    | identifiant de l'item           |
| label   | text   | Label du champ de réponse       |
| answer  | text[] | Réponse(s) valides              |

### Table `users`
| colonne         | type         | description                     |
|-----------------|--------------|---------------------------------|
| id              | int          | identifiant de l'utilisateur    |
| name            | VARCHAR(255) | nom d'utilisateur               |
| email           | VARCHAR(255) | email de l'utilisateur          |
| "emailVerified" | TIMESTAMPTZ  | date de vérification de l'email |
| image           | TEXT         | image de l'utilisateur          |

### Table `custom_answers`
| colonne         | type | description                     |
|-----------------|------|---------------------------------|
| id              | int  | identifiant de la réponse       |
| user_id         | int  | identifiant de l'utilisateur    |
| answer_field_id | int  | identifiant du champ de réponse |
| answer          | text | réponse de l'utilisateur        |

### Table `progress`
| colonne     | type        | description                   |
|-------------|-------------|-------------------------------|
| id          | int         | identifiant de la progression |
| user_id     | int         | identifiant de l'utilisateur  |
| item_id     | int         | identifiant de l'item         |
| next_review | TIMESTAMPTZ | date de la prochaine review   |
| srs_level   | int         | niveau de la répétition       |

### Table `srs_levels`
| colonne         | type | description              |
|-----------------|------|--------------------------|
| id              | int  | identifiant du niveau    |
| name            | text | nom du niveau            |
| interval        | int  | intervalle de répétition |



