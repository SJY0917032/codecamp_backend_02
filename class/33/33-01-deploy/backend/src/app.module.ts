import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './apis/auth/auth.module';
import { BoardModule } from './apis/boards/boards.module';
import { Board } from './apis/boards/entities/boards.entity';
import { FileModule } from './apis/file/file.module';
import { PointTransactionModule } from './apis/pointTransaction/pointTransaction.module';
import { ProductCategoryModule } from './apis/productCategory/productCategory.module';
import { ProductModule } from './apis/products/products.module';
import { UserModlue } from './apis/users/user.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    BoardModule,
    ProductCategoryModule,
    ProductModule,
    UserModlue,
    AuthModule,
    PointTransactionModule,
    FileModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql', // 저장되는곳
      context: ({ req, res }) => ({ req, res }), // request와 response를 설정해준다.
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '10.60.224.3', // 05-03  쿠버네티스에 배포된 db를입력한다. 하지만 따로 네트워크 배포를 해야만  서로 네임리졸루션이 되면서 연결됨.
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'myserver02',
      entities: [__dirname + '/apis/**'],
      synchronize: true,
      logging: true, // 로그를 남긴다 (명령어가 어떻게 바뀌는지)
      retryAttempts: 30,
      retryDelay: 5000,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// Main App Dir

/**
 *  app.module
 *    ┗ BoardModule, ProductModule(API's)
 *
 */
