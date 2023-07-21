import { User } from "src/users/user.entity";
import { Column, Double, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'address' })
export class Address {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    address: string;

    @Column('double precision')
    latitude: number;

    @Column('double precision')
    longitude: number;

    @Column()
    id_user: number;

    @Column( { type: 'datetime', default: () => 'CURRENT_TIMESTAMP'} )
    created_at: Date;

    @Column( { type: 'datetime', default: () => 'CURRENT_TIMESTAMP'} )
    updated_at: Date;

    @ManyToOne(() => User, (user) => user.address)
    @JoinColumn({ name: 'id_user' })
    user: User;

}