import {BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";

interface CreateUnit {
	title: string;
	image: string;
	lat: number;
	lng: number;
}

@Table({tableName: 'units', timestamps: true, paranoid: true, deletedAt: true})
export class Unit extends Model<Unit, CreateUnit> {

	@Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
	id: number;

	@Column({type: DataType.STRING, allowNull: false})
	title: string;

	@Column({type: DataType.STRING, allowNull: false})
	image: string;

	@Column({type: DataType.FLOAT, allowNull: false})
	lat: number;

	@Column({type: DataType.FLOAT, allowNull: false})
	lng: number;
}
