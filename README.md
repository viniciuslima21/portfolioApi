# Portfólio API V1
Repositório da API do meu antigo portfólio.

Para visualizar em seu computador use: 

```
git clone https://github.com/viniciuslimaan/oldPortfolioApi.git
```

## Tecnologias utilizadas
* JavaScript
* MongoDB
* Node
    * Express
    * Mongoose
    * Nodemon
    * Multer
    * Validator
    * Jsonwebtoken
    * BcryptJs

## Variáveis de ambiente
Para utilizar essa aplicação, será necessário a criação de um arquivo ".env" na pasta raiz do projeto com as seguintes variáveis: 

```
MONGO_URL=(Link do mongodb. Ex: mongodb://localhost:27017/portfolio)
PORT=(Porta que vai rodar a aplicação. Ex: 3000)

JWT_EXPIRES=(Uma quantidade de tempo para expirar o token das contas. Ex: 7d)
JWT_SECRET_TOKEN=(Algum texto aleatório que seja o mesmo colocado no token do FrontEnd. Ex: 5fg1h5fdg1hf5dgh41fd5g)
```
