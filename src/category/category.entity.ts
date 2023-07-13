import { Service } from "src/services/service.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'categories'})
export class Category {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @Column()
    route: string;

    @Column( { type: 'datetime', default: () => 'CURRENT_TIMESTAMP'} )
    created_at: Date;

    @Column( { type: 'datetime', default: () => 'CURRENT_TIMESTAMP'} )
    updated_at: Date;

    @OneToMany(() => Service, (service) => service.category)
    services: Service[];

}