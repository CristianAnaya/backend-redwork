import { Category } from "src/category/category.entity";
import { UserHasCategories } from "src/users/user_has_categories.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'services' })
export class Service {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    id_category: number;

    @Column( { type: 'datetime', default: () => 'CURRENT_TIMESTAMP'} )
    created_at: Date;

    @Column( { type: 'datetime', default: () => 'CURRENT_TIMESTAMP'} )
    updated_at: Date;

    @ManyToOne(() => Category, (category) => category.services)
    @JoinColumn({ name: 'id_category' })
    category: Category;

    @OneToMany(() => UserHasCategories, (uhc) => uhc.service)
    userHasCategories: UserHasCategories[];
    
}