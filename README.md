# Descrição

Template de como utilizar Kafka com NestJS.

Nesse template, temos a opção de utilizar o Kafka em conjunto de uma API ou somente o worker.

## Como executar

Para execução, siga os seguintes passos:

1. Clone o repositório:
   ```bash
   git clone https://github.com/lucas.villatore/nestjs-kafka-template.git
   ```

2. Instale as dependências:
   ```bash
   cd kafka-validator
   npm install
   ```

3. Execute o kafka:
    ```bash
    docker-compose up -d
    ```

4. Execute o aplicativo:
   ```bash
   npm run start:dev
   ```

### Para mandar mensagens para fila, basta executar o comando abaixo:
    ```bash
    npm run kafka:send
    ```

Para alterar a mensagem, basta editar o arquivo ./dados.json

## Somente o worker

1. Entre no arquivo main.ts 
2. Comente a linha que chama a função apiAndWorker()
3. Descomente a linha que chama a função onlyWorker()

## Somente a API + Worker
1. Entre no arquivo main.ts 
2. Comente a linha que chama a função onlyWorker()
3. Descomente a linha que chama a função apiAndWorker()
