import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  KafkaContext,
  Payload,
} from '@nestjs/microservices';
import { ProcessMessageUseCase } from '../core/application/use-cases/process-message.use-case';
import { ExampleDTO } from '../core/application/use-cases/dtos/example.dto';

@Controller()
export class WorkerController {
  constructor(private readonly processMessageUseCase: ProcessMessageUseCase) { }

  @EventPattern('meu-topico-teste')
  async processMessage(
    @Payload() message: ExampleDTO,
    @Ctx() context: KafkaContext,
  ) {
    console.log(context, message);
    await this.processMessageUseCase.execute(message);
  }
}
