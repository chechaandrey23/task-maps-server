import {Body, Controller, Get, Post, Param, Query, StreamableFile} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Controller()
export class FinalController {
	constructor() {}

	@Get('/*')
	public async finalClient() {
		return fs.readFileSync(path.resolve()+'/../client/build/index.html', 'utf8')
	}
}
