import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { KafkaExceptionFilter } from './config/kafka-exception-filter';
import { ValidationPipe } from '@nestjs/common';

async function onlyWorker() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'my-group-id',
          sessionTimeout: 30000,
        },
        subscribe: {
          fromBeginning: true
        },
      },
    },
  );
  app.useGlobalFilters(new KafkaExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    validateCustomDecorators: true,
  }))
  await app.listen();
  console.log('🚀 Worker iniciado e ouvindo Kafka!');
}

async function apiAndWorker() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'my-group-id',
        sessionTimeout: 30000,
      },
      subscribe: {
        fromBeginning: true,
      },
    },
  });

  app.useGlobalFilters(new KafkaExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    validateCustomDecorators: true,
  }));

  await app.startAllMicroservices();

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 API HTTP rodando na porta ${port}`);
  console.log('🎧 Worker iniciado e ouvindo Kafka!');
}

// void apiAndWorker();
void onlyWorker();
