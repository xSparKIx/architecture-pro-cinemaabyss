import { Module } from "@nestjs/common";
import { ProxyService } from "./proxy.service";
import { FeatureFlagModule } from "src/feature-flag/feature-flag.module";

@Module({
    imports: [FeatureFlagModule],
    providers: [ProxyService],
    exports: [ProxyService],
})
export class ProxyModule {}