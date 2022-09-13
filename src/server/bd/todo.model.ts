import {Column, Model, Table} from "sequelize-typescript";


@Table
export class Todo extends Model {
    @Column
    title: string | undefined;

    @Column({defaultValue: false})
    done: string | undefined;

}
