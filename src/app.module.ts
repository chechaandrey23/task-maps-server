import {Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";

import {GuestModule} from './guest/guest.module';
import {FinalModule} from './final/final.module';

let postgres_Config: any;
if(process.env.DATABASE_URL) {
	let match = (process.env.DATABASE_URL || '').match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
	match = match || [];
	let dbname = match[5];
	let username = match[1];
	let password = match[2];
	let host = match[3];
	let port = match[4];

	postgres_Config = {
		host: host,
		port: port,
		username: username,
		password: password,
		database: dbname,

		dialect: 'postgres',
		protocol: 'postgres',
		dialectOptions: {
			//ssl: true
			ssl: {
				require: true,
				rejectUnauthorized: false
			}
		},
		autoLoadModels: true
	};
} else {
	postgres_Config ={
		dialect: 'postgres',
		host: 'localhost',
		port: 5432,
		username: 'postgres',
		password: 'password',
		database: 'maps',
		autoLoadModels: true
	};
}

@Module({
	imports: [
		SequelizeModule.forRoot(postgres_Config),
		GuestModule,
		FinalModule
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
