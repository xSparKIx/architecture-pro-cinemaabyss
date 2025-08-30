import { Controller, Get, Inject, Post } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { KAFKA_NAME, MOVIE_TOPIC, PAYMENT_TOPIC, USER_TOPIC } from "src/const";

@Controller('events')
export class EventsProducer {
    constructor(@Inject(KAFKA_NAME) private readonly kafkaClient: ClientKafka) {}

    @Get('health')
    getHealth(): { status: boolean } {
        return { status: true };
    }

    @Post('movie')
    createMovie() {
        this.kafkaClient.emit(MOVIE_TOPIC, { message: 'Фильм создан' });
        return {
            status: "success",
            movie_id: 1,
            title: "Inception",
            action: "viewed",
            user_id: 1,
            rating: 8.5,
            genres: [
                "Sci-Fi",
                "Action"
            ],
            description: "A mind-bending thriller"
        };
    }

    @Post('payment')
    createPayment() {
        this.kafkaClient.emit(PAYMENT_TOPIC, { message: 'Оплата создана' });
        return {
            status: "success",
            payment_id: 1,
            user_id: 1,
            amount: 9.99,
            timestamp: "2023-01-15T14:30:00Z",
            method_type: "credit_card"
        };
    }

    @Post('user')
    createUser() {
        this.kafkaClient.emit(USER_TOPIC, { message: 'Пользователь создан' });
        return {
            status: "success",
            user_id: 1,
            username: "john_doe",
            email: "john.doe@example.com",
            action: "registered",
            timestamp: "2023-01-15T14:30:00Z"
        };
    }
}