import { All, Controller, Get, Req, Res } from "@nestjs/common";
import { ProxyService } from "src/proxy/proxy.service";

/**
 * Контроллер фильмов
 */
@Controller('movies')
export class MoviesController {
    constructor(private readonly proxyService: ProxyService) {}

    /**
     * Обрабатываем все запросы, которые уходят к системе фильмов
     * @param req 
     * @param res 
     */
    @All()
    async handleAllRequests(@Req() req: Request, @Res() res: Response) {
        await this.proxyService.handleRequest(req, res);
    }
}