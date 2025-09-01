import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { MOVIE_TOPIC, PAYMENT_TOPIC, USER_TOPIC } from "src/const";

@Controller()
export class EventsConsumer {
    @EventPattern(MOVIE_TOPIC)
    handleCreateMovie() {
        console.log('Фильм создан');
    }

    @EventPattern(PAYMENT_TOPIC)
    handleCreatePayments() {
        console.log('Платеж создан');
    }

    @EventPattern(USER_TOPIC)
    handleCreateUser() {
        console.log('Пользователь создан');
    }
}