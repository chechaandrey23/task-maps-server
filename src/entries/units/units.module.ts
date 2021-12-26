import {Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";

import {UnitsService} from './units.service';

import {Unit} from './unit.model';

@Module({
	imports: [
		SequelizeModule.forFeature([Unit]),
	],
	controllers: [],
	providers: [
		UnitsService
	],
	exports: [
		UnitsService
	]
})
export class UnitsModule {}
