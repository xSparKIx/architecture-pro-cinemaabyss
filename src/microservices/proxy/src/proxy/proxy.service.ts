import { Injectable } from "@nestjs/common";
import { createProxyMiddleware } from "http-proxy-middleware";

/**
 * Сервис проксирования запросов в зависимости от заданного Feature Flag
 */
@Injectable()
export class ProxyService {
    /**
     * Прокси старой системы
     */
    private oldSystemProxy;
    /**
     * Прокси новой системы
     */
    private newSystemProxy;
    /**
     * Процент перенаправляемого трафика
     */
    private percent: number;

    constructor() {
        this.oldSystemProxy = createProxyMiddleware({
            target: process.env.MONOLITH_URL,
            changeOrigin: true,
        });

        this.newSystemProxy = createProxyMiddleware({
            target: process.env.MOVIES_SERVICE_URL,
            changeOrigin: true,
        });

        this.percent = process.env.MOVIES_MIGRATION_PERCENT ? +process.env.MOVIES_MIGRATION_PERCENT : 10;
    }

    /**
     * Метод перенаправления запроса на определенную систему
     * @param req 
     * @param res 
     */
    async handleRequest(req: Request, res: Response) {
        // @todo Не оптимальный способ надо поправить
        // @todo Осталось поправить тесты event
        const useNewSystem = Math.random() < (this.percent * 0.01);

        if (useNewSystem) {
            this.newSystemProxy(req, res);
        } else {
            this.oldSystemProxy(req, res);
        }
    }
}