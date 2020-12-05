# STUD'CONNECT - Backend ✨🔌

## Configuration ⚙️
Éditer le fichier .sample.env :
* Renseigner le port de l'application **APP_PORT**
* Renseigner la chaine de connection à la base de données **DB_CONN_STRING**

Renommer le fichier sample.env en **.env**

## Lancer le serveur 🏃
```
$ npm run start
```

## Routes 🛣
### Format des données de retour
* Si la requête réussit, la réponse sera au format ```{ "success": true, "body": { data } }```
* Si la requête échoue, la réponse sera au format ```{ "success": false, "error": { error } }```

### 📂 *TOPICS*
**GET** ```/topics```
* Retourne tous les *topics* avec leurs commentaires

**GET** ```/topic/:id```
* Retourne un *topic* dont l'id est indiqué dans le paramètre **:id**
* Les commentaires du *topic* sont également retournés

**POST** ```/topic```
* Crée un nouveau document *topic*
* Les paramètres envoyés dans le *body* de la requête doivent suivre le [modèle de Topic](https://github.com/WildCodeSchool/2020-11-wns-paris-fantasticfork-projet-back/blob/api-v2/src/models/Topic.js)

**PUT** ```/topic/:id```
* Met à jour un *topic* dont l'id est indiqué dans le paramètre **:id**
* Les nouvelles informations doivent être passés dans le body de la requête

**DELETE** ```/topic/:id```
* Supprime un *topic* dont l'id est indiqué dans le paramètre **:id**
* Supprime tous les commentaires associés au *topic*

### 💬 *COMMENTS*
**GET** ```/comments/:topicID```
* Retourne les commentaires du topic dont l'id est indiqué par **:topicID**

**POST** ```/comment```
* Crée un nouveau document *comment*
* Les paramètres envoyés dans le *body* de la requête doivent suivre le [modèle de Comment](https://github.com/WildCodeSchool/2020-11-wns-paris-fantasticfork-projet-back/blob/api-v2/src/models/Comment.js)

### 👤 *USER*
**POST** ```/user```
* Crée un nouveau document *user*
* Les paramètres envoyés dans le *body* de la requête doivent suivre le [modèle de User](https://github.com/WildCodeSchool/2020-11-wns-paris-fantasticfork-projet-back/blob/api-v2/src/models/User.js)
