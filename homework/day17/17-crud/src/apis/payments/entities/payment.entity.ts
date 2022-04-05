import { User } from 'src/apis/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Payment {
  
    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @JoinColumn()
    @OneToOne(() => User)
    user : User;

    @Column({type:'varchar', nullable:false, length:20})
    name: string;
}
