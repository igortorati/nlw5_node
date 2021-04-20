# nlw5_node
 
## Instruções para construção do projeto (Dia 1):

 1. yarn init -v 
 2. yarn add express 
 3. yarn add @types/express -D 
 4. yarn add typescript -D
 5. yarn tsc --init
 6. setar variavel strict em tsconfic.json para false.
 7. yarn add ts-node-dev -D
 8. Em package.json colocar o seguinte código antes de "dependencies":
```json 
"scripts": {
   "dev": "ts-node-dev src/server.ts"
},
```
 9. Rodar comando "yarn dev"


## Instruções para uso do TypeORM (Dia 2):

1. yarn add typeorm reflect-metadata sqlite3
2. Criar arquivo "ormconfig.json" na raíz e escrever o seguinte código para definir o tipo de BDD, ativar o uso de migrations e já importar as entidades:
```json
{
    "type": "sqlite",
    "database": "./src/database/database.sqlite",
    "migrations": ["./src/database/migrations/**.ts"],
    "entities": ["./src/entities/**.ts"],
    "cli": {
        "migrationsDir": "./src/database/migrations"
    }
}
```
3. Criar uma subpasta em "src" chamada "database" e dentro dela criar um arquivo denominado "index.ts", nele, coloque o seguinte código:
```typescript
import { createConnection } from "typeorm";
createConnection();
```
4. Em "server.ts" fazer o import do "index.ts" da pasta "database" da seguinte forma:
```typescript
import "./database";
```
5. O uso de migrations já foi ativado, agora é preciso criar a subpasta "migrations" dentro de "database". Além disso, precisamos ativar o uso das migrations no "package.json" inserindo a seguinte linha dentro de "scripts" abaixo de "dev" (lembre de colocar a vírgula entre as linhas):
```json
"typeorm": "ts-node-dev node_modules/typeorm/cli.js"
```
6. Para criar as migrations, basta usar o comando "yarn typeorm migration:create -n 'NomeMigration'".
7. Rode a o comando "yarn typeorm migration:run" para executar todas as migrations. Talvez seja necessário mudar a seguinte linha do tsconfig de "target": "e5" para "target": "es2015".
8. Habilitar no "tsconfig.ts" as opções:
```typescript
"experimentalDecorators": true,
"emitDecoratorMetadata": true,
```
9. A responsabilidade de gerar o uuid é do projeto, dessa forma precisamos incluir a biblioteca uuid com o comando "yarn add uuid" e as tipagens com o comando "yarn add @types/uuid -D".