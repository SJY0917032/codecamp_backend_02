import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Product } from './product.entity';
import { BigQuery } from '@google-cloud/bigquery';
import { config } from 'dotenv';

config();

@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface<Product> {
  constructor(connection: Connection) {
    // TypeOrm Connection객체에 Subscriber로 해당 클래스를 요소로 넣는다.
    connection.subscribers.push(this);
  }

  // Product 객체를 Listen한다.
  listenTo() {
    return Product;
  }

  // Insert가 완료된다면(Product테이블에)
  afterInsert(event: InsertEvent<Product>) {
    console.log(event);
    // event.entity.id
    // event.entity.name
    // event.entity.price

    const bigQuery = new BigQuery({
      keyFilename: process.env.BIGQUERY_KEY_FILENAME,
      projectId: process.env.PROJECT_ID,
    });

    bigQuery
      .dataset('class_project_camp')
      .table('products')
      .insert([
        {
          id: event.entity.id,
          name: event.entity.name,
          price: event.entity.price,
          description: event.entity.description,
          isSoldout: event.entity.isSoldOut,
        },
      ]);
  }
}
