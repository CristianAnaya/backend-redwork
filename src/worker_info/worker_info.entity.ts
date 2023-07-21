import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('worker_info')
export class WorkerInfo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    curriculum: string;

    @Column({ nullable: true })
    front_id_card_image: string;

    @Column({ nullable: true })
    back_id_card_image: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    id_worker: number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name:  'id_worker' })
    worker: User;

}