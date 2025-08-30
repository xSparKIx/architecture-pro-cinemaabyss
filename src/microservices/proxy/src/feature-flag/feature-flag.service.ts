import { Injectable } from "@nestjs/common";

@Injectable()
export class FeatureFlagService {
    /**
     * Процент перенаправляемого трафика
     */
    private percent: number;

    constructor() {
        this.percent = process.env.MOVIES_MIGRATION_PERCENT ? +process.env.MOVIES_MIGRATION_PERCENT : 10;
    }

    /**
     * Простая реализация проверки на основе userId
     * @param userId Уникальный идентификатор пользователя
     */
    isNewSystem(userId: string): boolean {
        if (!userId) {
            return false;
        }

        const hash = this.hashCode(userId);
        return (hash & 100) < this.percent;
    }

    private hashCode(str: string) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
        }
        return Math.abs(hash);
    }
}