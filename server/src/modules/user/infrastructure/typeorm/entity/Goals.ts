import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, JoinTable } from 'typeorm';
import User from './User';

@Entity('goals')
class Goals {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('int')
    initial_weight: number;

    @Column('int')
    actual_weight: number;
    
    @Column('int')
    goal_weight: number;

    @Column('int')
    calories: number;
    
    @Column('int')
    proteins: number;
    
    @Column('int')
    carbs: number;
    
    @Column('int')
    fats: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @OneToOne((type) => User, (user) => user.id, {
        cascade: true
    })
    @JoinTable()
    user: User[]
}

export default Goals;