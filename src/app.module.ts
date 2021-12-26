import {Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";

import {GuestModule} from './guest/guest.module';
import {FinalModule} from './final/final.module';

@Module({
	imports: [
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'postgres',
			password: 'password',
			database: 'maps',
			autoLoadModels: true
		}),
		GuestModule,
		FinalModule
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
