import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from '@nestjs/common';
import { Subscribe } from "./entities/subscribe.entity";
import { SubscribeResolver } from "./subscribe.resolver";
import { SubscribeService } from "./subscribe.service";
import { Product } from "../products/entities/product.entity";
import { SubCategory } from "../subCategorys/entities/subcategory.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Subscribe, Product, SubCategory])],
    providers: [SubscribeResolver, SubscribeService],
})
export class SubscribeModule {}