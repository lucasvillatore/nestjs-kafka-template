import { Module } from '@nestjs/common';
import { WorkerModule } from './modules/worker.module';

@Module({
  imports: [WorkerModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
