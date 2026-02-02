import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { KafkaContext, RpcException } from '@nestjs/microservices';
import { throwError } from 'rxjs';

@Catch()
export class KafkaExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(KafkaExceptionFilter.name);

  async catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToRpc().getContext<KafkaContext>();
    const originalMessage = ctx.getMessage();
    const topic = ctx.getTopic();
    const partition = ctx.getPartition();
    const { offset } = originalMessage;

    const errorDetails = this.extractErrorDetails(exception);

    this.logger.error(`🔥 ERRO CRÍTICO NO KAFKA`);
    this.logger.error(`Topic: ${topic} | Partition: ${partition} | Offset: ${offset}`);
    this.logger.error(`Causa: ${JSON.stringify(errorDetails)}`);
    this.logger.error(`Payload (Raw): ${originalMessage.value?.toString()}`);

    try {
      const consumer = ctx.getConsumer();

      const nextOffset = (BigInt(offset) + 1n).toString();

      await consumer.commitOffsets([
        {
          topic: topic,
          partition: partition,
          offset: nextOffset,
        },
      ]);

      this.logger.warn(`✅ Mensagem defeituosa (Offset ${offset}) foi commitada/ignorada para evitar loop.`);


    } catch (commitError) {
      this.logger.error('Falha crítica ao tentar commitar offset no filtro de exceção', commitError);
    }

    return throwError(() => exception);
  }

  private extractErrorDetails(exception: unknown): any {
    if (exception instanceof HttpException) {
      return exception.getResponse();
    }
    if (exception instanceof RpcException) {
      return exception.getError();
    }
    if (exception instanceof Error) {
      return {
        message: exception.message,
        stack: exception.stack,
      };
    }
    return exception;
  }
}
