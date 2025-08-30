import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Устанавливаем глобальный префикс
  app.setGlobalPrefix('api', { exclude: ['health'] });
  await app.listen(process.env.PORT ?? 3000);

  const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [process.env.KAFKA_BROKERS || 'localhost:9092']
        },
        consumer: {
          groupId: process.env.CONSUMER || 'default',
        },
      }
    }
  );

  microservice.listen();
}
bootstrap();
