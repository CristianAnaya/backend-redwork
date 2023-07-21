import { Category } from "src/category/category.entity";
import { Service } from "src/services/service.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";


@Entity('user_has_categories')
export class UserHasCategories {

    @PrimaryColumn()
    id_user: number

    @PrimaryColumn()
    id_category: number

    @PrimaryColumn()
    id_service: number

    @Column( { type: 'datetime', default: () => 'CURRENT_TIMESTAMP'} )
    created_at: Date;

    @Column( { type: 'datetime', default: () => 'CURRENT_TIMESTAMP'} )
    updated_at: Date;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name:  'id_user' })
    user: User;

    @ManyToOne(() => Category, (category) => category.id)
    @JoinColumn({ name:  'id_category' })
    category: Category;

    @ManyToOne(() => Service, (service) => service.id)
    @JoinColumn({ name:  'id_service' })
    service: Service;

}