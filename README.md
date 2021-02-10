# STUD'CONNECT - Backend ✨🔌

## Configuration ⚙️

Copier le fichier _sample.env_ en le renomant **_.env_**

Éditer le fichier **_.env_** avec les informations suivantes :

* **NODE_ENV** : l'environnement de l'application.(_dev_, _production_ etc...)
* **PORT** : Le port de l'application 
* **MONGODB_URI** : URI de connection à la base de données 
* **JWT_SECRET** : Code secret pour le chiffrage des tokens
* **JWT_LIFE_TIME** : Durée de validité des tokens

## Commandes package.json 📜

#### Démarrage en mode production (à partir des sources compilées par Typescript)
```
$ npm start
```

#### Démarrage en mode développement (lance Nodemon et Typescript en mode watch)
```
$ npm run start:watch
```

#### Lancer les tests
```
$ npm run test
```

#### Lancer les tests en mode watch
```
$ npm run test:watch
```

#### Lancer un build Typescript
```
$ npm run build
```
#### Lancer eslint
```
$ npm run lint
```
