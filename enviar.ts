import { Kafka } from 'kafkajs';
import * as fs from 'fs';
import * as path from 'path';

async function run() {
  // 1. Configuração do Cliente Kafka
  const kafka = new Kafka({
    clientId: 'script-producer',
    brokers: ['localhost:9092'], // Seu endereço do Kafka
    retry: {
      retries: 2,
    },
  });

  const producer = kafka.producer();
  const nomeDoArquivo = 'dados.json';
  const nomeDoTopico = 'meu-topico-teste';

  try {
    console.log('🔌 Conectando ao Kafka...');
    await producer.connect();

    // 2. Lendo o arquivo
    const caminhoArquivo = path.resolve(__dirname, nomeDoArquivo);
    console.log(`📂 Lendo arquivo: ${caminhoArquivo}`);

    if (!fs.existsSync(caminhoArquivo)) {
      throw new Error('Arquivo não encontrado!');
    }

    const conteudoArquivo = fs.readFileSync(caminhoArquivo, 'utf-8');

    // 3. Enviando a mensagem
    console.log(`🚀 Enviando para o tópico: "${nomeDoTopico}"...`);

    await producer.send({
      topic: nomeDoTopico,
      messages: [
        {
          value: conteudoArquivo,
          // Opcional: Adicionar uma chave ou headers
          key: 'chave-arquivo-1',
        },
      ],
    });

    console.log('✅ Mensagem enviada com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao enviar:', error);
  } finally {
    // 4. Desconectando (Importante para liberar o processo)
    await producer.disconnect();
    console.log('👋 Desconectado.');
  }
}

run();
