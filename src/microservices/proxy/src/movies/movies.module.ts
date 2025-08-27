import { Module } from "@nestjs/common";
import { MoviesController } from "./movies.controller";
import { ProxyModule } from "src/proxy/proxy.module";

@Module({
  imports: [ProxyModule],
  controllers: [MoviesController],
  providers: [],
})
export class MoviesModule {}