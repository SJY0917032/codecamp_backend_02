import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from '@nestjs/common';
import { Subscribe } from "./entities/subscribe.entity";
import { SubscribeResolver } from "./subscribe.resolver";
import { SubscribeService } from "./subscribe.service";

@Module({
    imports: [TypeOrmModule.forFeature([Subscribe])],
    providers: [SubscribeResolver, SubscribeService],
})
export class SubscribeModule {}