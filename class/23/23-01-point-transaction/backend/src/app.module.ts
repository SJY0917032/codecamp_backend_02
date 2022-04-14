import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './apis/auth/auth.module';
import { BoardModule } from './apis/boards/boards.module';
import { Board } from './apis/boards/entities/boards.entity';
import { PointTransactionModule } from './apis/pointTransaction/pointTransaction.module';
import { ProductCategoryModule } from './apis/productCategory/productCategory.module';
import { ProductModule } from './apis/products/products.module';
import { UserModlue } from './apis/users/user.module';

@Module({
  imports: [
    BoardModule,
    ProductCategoryModule,
    ProductModule,
    UserModlue,
    AuthModule,
    PointTransactionModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql', // 저장되는곳
      context: ({ req, res }) => ({ req, res }), // request와 response를 설정해준다.
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // docker에 올리기때문에 docker에 지정한 네임으로 가야한다.
      port: 3306,
      username: 'root',
      password: 'qkek347',
      database: 'myproject02',
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
