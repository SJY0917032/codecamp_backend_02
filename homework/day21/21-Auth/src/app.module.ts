import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ProductModule } from './apis/products/products.module';
import { SubscribeModule } from './apis/subscribe/subscribe.module';
import { MainCategoryModule } from './apis/mainCategorys/mainCategory.module';
import { SubCategoryModule } from './apis/subCategorys/subCategory.module';
import { UserModule } from './apis/users/user.module';
import { UserSubscribesModule } from './apis/userSubscribes/userSubscribes.module';
import { AuthModule } from './apis/auth/auth.module';


@Module({
  imports: [
    ProductModule,
    MainCategoryModule,
    SubCategoryModule,
    SubscribeModule,
    UserModule,
    UserSubscribesModule,
    AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver:ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'my-database', // docker에 올리기때문에 docker에 지정한 네임으로 가야한다.
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'mydocker02',
      entities: [__dirname + '/apis/**'],
      synchronize: true,
      logging: true, // 로그를 남긴다 (명령어가 어떻게 바뀌는지)
      retryAttempts: 30,
      retryDelay: 5000,
    }),
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}

// Main App Dir

/**
 *  app.module
 *    ┗ BoardModule, ProductModule(API's)
 *
 */
