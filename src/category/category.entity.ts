import { Service } from "src/services/service.entity";
import { UserHasCategories } from "src/users/user_has_categories.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany(() => UserHasCategories, (uhc) => uhc.category)
    @JoinColumn({ referencedColumnName: 'id_category' })
    userHasCategories: UserHasCategories[];
    
}