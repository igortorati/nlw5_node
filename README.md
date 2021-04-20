# nlw5_node
 
## Instruções para construção do projeto:

1- yarn init -v
2- yarn add express
3- yarn add @types/express -D
4- yarn add typescript -D
5- yarn tsc --init
6- setar variavel strict em tsconfic.json para false.
7- yarn add ts-node-dev -D
8-  em package.json colocar o seguinte código antes de "dependencies":
"scripts": {
	"dev": "ts-node-dev src/server.ts"
},
9- rodar comando "yarn dev"
