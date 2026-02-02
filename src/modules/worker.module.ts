import { Module } from '@nestjs/common';
import { WorkerController } from '../presentation/worker.controller';
import { ProcessMessageUseCase } from '../core/application/use-cases/process-message.use-case';

@Module({
  controllers: [WorkerController],
  providers: [
    ProcessMessageUseCase,
  ],
})
export class WorkerModule { }
