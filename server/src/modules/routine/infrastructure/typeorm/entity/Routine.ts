import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinTable, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import User from '@modules/user/infrastructure/typeorm/entity/User';
import Food from '@modules/food/infrastructure/typeorm/entity/Food';

@Entity('routines')
class Routine {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('datetime')
    day: Date;

    @Column('json')
    breakfast: object[];

    @Column('json')
    lunch: object[];

    @Column('json')
    dinner: object[];

    @Column('json')
    snacks: object[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @ManyToOne(() => User, (user) => user.id)
    user: User

    @ManyToMany(() => Food)
    @JoinTable()
    food: Food[]
}

export default Routine;