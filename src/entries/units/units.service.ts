import {ConflictException, NotAcceptableException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Sequelize} from 'sequelize-typescript';
import {Op, Transaction} from 'sequelize';

import {v4 as uuidv4} from 'uuid';
import * as path from 'path';
import {writeFile} from 'fs/promises';

import {handlerError} from '../../helpers/handler.error';

import {Unit} from './unit.model';

@Injectable()
export class UnitsService {
	constructor(
		private sequelize: Sequelize,
		@InjectModel(Unit) private units: typeof Unit,
	) {}

	public async createUnit(title: string, images: Array<Express.Multer.File>, lat: number, lng: number) {
		try {
			return await this.sequelize.transaction({}, async (t) => {
				if(images.length < 1) throw new ConflictException('At least one file must be transferred');
				const extNameArr = images[0].originalname.split('.');
				const fileName = `${uuidv4()}.${extNameArr[extNameArr.length - 1]}`;

				const res = await this.units.create({title, lat, lng, image: fileName}, {transaction: t});

				await this.writeFile(fileName, images[0].buffer);

				return await this.units.findOne({where: {id: res.getDataValue('id')}, transaction: t});
			});
		} catch(e) {
			handlerError(e);
		}
	}

	protected async writeFile(fileName: string, fileBuffer: Buffer) {
		await writeFile(path.resolve()+'/../uploads/'+fileName, fileBuffer);
	}

	public async getUnits(neLat: number, neLng: number, swLat: number, swLng: number) {
		return this.units.findAll({where: {
			[Op.and]: [
				{[Op.and]: [
					{lat: {[Op.lte]: neLat}},
					{lng: {[Op.lte]: neLng}}
				]},
				{[Op.and]: [
					{lat: {[Op.gte]: swLat}},
					{lng: {[Op.gte]: swLng}}
				]}
			]
		}});
	}
}
