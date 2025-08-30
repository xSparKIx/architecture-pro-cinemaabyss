import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { KAFKA_NAME } from "src/const";

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: KAFKA_NAME,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'events',
              brokers: [configService.get('KAFKA_BROKERS') || 'localhost:9092']
            },
            producer: {
              allowAutoTopicCreation: true,
            },
          }
        })
      }
    ])
  ],
  exports: [ClientsModule],
})
export class KafkaModule { }