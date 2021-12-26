import {Module} from '@nestjs/common';

import {GuestController} from './guest.controller';

import {UnitsModule} from '../entries/units/units.module';

@Module({
	imports: [
		UnitsModule
	],
	controllers: [
		GuestController
	],
	providers: [

	]
})
export class GuestModule {}
