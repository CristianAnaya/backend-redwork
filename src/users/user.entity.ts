import { Rol } from "src/roles/rol.entity";
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { hash } from 'bcrypt'

@Entity({ name: 'users' })
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column( { unique: true } )
    email: string;

    @Column( { unique: true } )
    phone: string;

    @Column({ nullable: true })
    image: string;

    @Column({ nullable: true, select: false })
    identification: string;

    @Column({ nullable: true })
    font_identification: string;

    @Column({ nullable: true })
    behind_identification: string;

    @Column({ nullable: true })
    curriculum: string;

    @Column({ nullable: true })
    notification_token: string;

    @Column( { type: 'datetime', default: () => 'CURRENT_TIMESTAMP'} )
    created_at: Date;

    @Column( { type: 'datetime', default: () => 'CURRENT_TIMESTAMP'} )
    updated_at: Date;

    @JoinTable({
        name: 'user_has_role',
        joinColumn: {
            name: 'id_user'
        },
        inverseJoinColumn: {
            name: 'id_rol'
        }
    })
    @ManyToMany(() => Rol, (rol) => rol.users)
    roles: Rol[]

    // @BeforeInsert()
    // async hasPassword() {
    //     this.identification = await hash(this.identification, Number(process.env.HASH_SALT));
    // }
}