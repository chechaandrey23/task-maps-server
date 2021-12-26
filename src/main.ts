import {NestFactory} from '@nestjs/core';
import {NestExpressApplication} from '@nestjs/platform-express';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common';

import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const httpAdapter = app.getHttpAdapter();

	httpAdapter.use('/', express.static(path.resolve()+'/../client/build'));

	// upload files
	httpAdapter.use('/images/', express.static(path.resolve()+'/../uploads'));

	app.useGlobalPipes(new ValidationPipe());

	await app.listen(process.env.PORT || 3041);
}
bootstrap();
