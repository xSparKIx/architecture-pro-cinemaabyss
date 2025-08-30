import { Module } from "@nestjs/common";
import { KafkaModule } from "src/common/kafka.module";
import { EventsProducer } from "./events.producer";
import { EventsConsumer } from "./events.consumer";

@Module({
    imports: [KafkaModule],
    providers: [],
    controllers: [EventsProducer, EventsConsumer],
})
export class EventsModule {}