# Architecture base de données
## Tables
### Table `collections`
| colonne | type | description|
|---------|------| ---|
|  id     | int  | identifiant de la collection|
|  name   | text | nom de la collection|
|  description | text | description de la collection|


### Table `items`
| colonne | type | description                            |
|---------|------|----------------------------------------|
| id      | int  | identifiant de l'item                  |
| prompt  | text | Élément qui s'affiche lors des reviews |
| description | text | Description de l'item                |

### Table `collections_items`
| colonne | type | description|
|---------|------| ---|
|  id     | int  | identifiant de la relation|
|  collection_id | int | identifiant de la collection|
|  item_id | int | identifiant de l'item|

### Table `answers`

| colonne | type | description               |
|---------|------|---------------------------|
|  id     | int  | identifiant de la réponse |
|  item_id | int | identifiant de l'item     |
| label | text | Label de la réponse       |
| answer | text | Réponse à la question     |

### Table `users`
| colonne | type | description|
|---------|------| ---|
|  id     | int  | identifiant de l'utilisateur|
|  username | text | nom d'utilisateur|
