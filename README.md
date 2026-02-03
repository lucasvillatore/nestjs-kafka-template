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
   cd nestjs-kafka-template
   npm install
   ```

3. Execute o kafka:
    ```bash
    docker-compose up -d
    ```

4. Execute o aplicativo para execução do worker:
   ```bash
   npm run start:worker:dev
   ```

5. Execute o aplicativo para execução do worker + api:
   ```bash
   npm run start:both:dev
   ```


### Para criar o tópico 
```bash
    docker exec -it kafka /opt/kafka/bin/kafka-console-producer.sh \
    --topic meu-topico-teste \
    --bootstrap-server localhost:9092
```


### Para mandar mensagens para fila, basta executar o comando abaixo:
    ```bash
    npm run kafka:send
    ```

Para alterar a mensagem, basta editar o arquivo ./dados.json
