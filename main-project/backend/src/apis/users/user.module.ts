import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from '@nestjs/common';
import { User } from "./entities/user.entity";
import { Payment } from "../payments/entities/payment.entity";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";
import { JwtAccessStrategy } from "src/commons/auth/jwt-access.strategy";


@Module({
    imports: [TypeOrmModule.forFeature([User,Payment])],
    providers: [JwtAccessStrategy,UserResolver,UserService],
})
export class UserModule {}