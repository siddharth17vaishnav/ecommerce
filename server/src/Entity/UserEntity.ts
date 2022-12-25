import {Entity,BaseEntity,Column,PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn} from "typeorm";

@Entity('users')
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string

    @Column({unique:true})
    email:string

    @Column()
    password:string

    @Column()
    profile:string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}