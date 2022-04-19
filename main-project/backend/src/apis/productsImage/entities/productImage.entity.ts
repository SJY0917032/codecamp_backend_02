import { Field, ObjectType } from "@nestjs/graphql";
import { Product } from "src/apis/products/entities/product.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
@ObjectType()
export class ProductImage{
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @ManyToOne(() => Product)
    @Field(() => Product)
    product: Product

    @Column({type: 'varchar'})
    url: string;

    @CreateDateColumn()
    @Field(() => Date, {nullable:true})
    createdAt: Date;

    @DeleteDateColumn()
    @Field(() => Date, {nullable:true})
    deletedAt: Date;
}