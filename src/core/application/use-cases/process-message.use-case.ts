import { UseCaseBase } from './use-case-base';
import { ExampleDTO } from './dtos/example.dto';

export class ProcessMessageUseCase extends UseCaseBase<ExampleDTO, void> {
  async processMessage(data: ExampleDTO): Promise<void> {
    console.log('--- Nova Mensagem Recebida ---');

    console.log('Conteúdo (JSON):', data);
  }
}
