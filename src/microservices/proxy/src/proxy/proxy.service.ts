import { Injectable } from "@nestjs/common";
import { createProxyMiddleware } from "http-proxy-middleware";
import { FeatureFlagService } from "src/feature-flag/feature-flag.service";

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

    constructor(private readonly featureFlagService: FeatureFlagService) {
        this.oldSystemProxy = createProxyMiddleware({
            target: process.env.MONOLITH_URL,
            changeOrigin: true,
        });

        this.newSystemProxy = createProxyMiddleware({
            target: process.env.MOVIES_SERVICE_URL,
            changeOrigin: true,
        });
    }

    /**
     * Метод перенаправления запроса на старую версию
     * @param req 
     * @param res 
     */
    proxyToOldSystem(req: Request, res: Response) {
        return this.oldSystemProxy(req, res);
    }

    /**
     * Метод перенаправления запроса на определенную систему
     * @param req 
     * @param res 
     */
    handleRequest(req: Request, res: Response) {
        const userId = this.getUserKey(req);
        const useNewSystem = this.featureFlagService.isNewSystem(userId);

        if (useNewSystem) {
            this.newSystemProxy(req, res);
        } else {
            this.oldSystemProxy(req, res);
        }
    }

    /**
     * Метод получения id пользователя
     * @param req 
     * @returns 
     */
    private getUserKey(req: Request): string {
        // Приоритеты для идентификации пользователя
        return (
            req.headers['x-user-id']?.toString() ||
            req.headers['authorization']?.toString() ||
            'anonymous'
        );
    }
}