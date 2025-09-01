import { All, Controller, Req, Res } from "@nestjs/common";
import { ProxyService } from "src/proxy/proxy.service";

@Controller('users')
export class UsersController {
    constructor(private readonly proxyService: ProxyService) {}
    
    /**
     * Обрабатываем все запросы, которые уходят к системе пользователей
     * @param req 
     * @param res 
     */
    @All()
    async handleAllRequests(@Req() req: Request, @Res() res: Response) {
        await this.proxyService.proxyToOldSystem(req, res);
    }
}