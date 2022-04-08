import { User } from 'src/apis/users/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Payment {
  
    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @Column({type:'varchar', nullable:false, length:20})
    name: string;
}
