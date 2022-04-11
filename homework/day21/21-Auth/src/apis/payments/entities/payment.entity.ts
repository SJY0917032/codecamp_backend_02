import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
@ObjectType()
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string
    
    @Column({type:'varchar', nullable:false, length:20})
    @Field(() => String)
    name: string;
}
