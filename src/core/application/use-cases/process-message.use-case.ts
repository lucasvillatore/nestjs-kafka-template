import { UseCaseBase } from './use-case-base';
import { ExampleDTO } from './dtos/example.dto';

export class ProcessMessageUseCase extends UseCaseBase<ExampleDTO, void> {
  async execute(data: ExampleDTO): Promise<void> {
    console.log('executando caso de uso');
    console.log('Conteúdo (JSON):', data);
  }
}
