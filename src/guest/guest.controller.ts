import {Body, Controller, Get, Post, Param, Query, UploadedFile, UploadedFiles, UseInterceptors, ValidationPipe, UsePipes, ConflictException} from '@nestjs/common';
import {FileInterceptor, FilesInterceptor, AnyFilesInterceptor} from '@nestjs/platform-express';

import {Express} from 'express';

import {UnitsService} from '../entries/units/units.service';

import {IsInt, IsNotEmpty, Min, Max, MinLength, MaxLength, IsNumberString, IsString, IsArray, IsBoolean, IsEmail, ValidateIf, ValidateNested, IsNumber} from 'class-validator';
import {Transform, Type} from 'class-transformer';

class UnitsDTO {
	@IsNotEmpty()
	@Transform(({value}) => {return value*1})
	@IsNumber()
	NELat: number;

	@IsNotEmpty()
	@Transform(({value}) => {return value*1})
	@IsNumber()
	NELng: number;

	@IsNotEmpty()
	@Transform(({value}) => {return value*1})
	@IsNumber()
	SWLat: number;

	@IsNotEmpty()
	@Transform(({value}) => {return value*1})
	@IsNumber()
	SWLng: number;
}

class UnitDTO {
	@IsNotEmpty()
	@IsString()
	@MinLength(1)
	@MaxLength(255)
	title: string;

	@IsNotEmpty()
	@Transform(({value}) => {return value*1})
	@IsNumber()
	lat: number;

	@IsNotEmpty()
	@Transform(({value}) => {return value*1})
	@IsNumber()
	lng: number;
}

@UsePipes(new ValidationPipe({transform: true}))
@Controller('/guest/api')
export class GuestController {
	constructor(private unitsService: UnitsService) {}

	@Get('/units')
	public async getAllUnit(@Query() unitsDTO: UnitsDTO) {
		return await this.unitsService.getUnits(unitsDTO.NELat, unitsDTO.NELng, unitsDTO.SWLat, unitsDTO.SWLng);
	}

	@Post('/unit/add')
	@UseInterceptors(FilesInterceptor('images[]', 1, {
		limits: {
			fileSize: 3*1024*1024
		},
		fileFilter: (req: any, file: any, callback: Function) => {
			// originalname
			if(file.originalname.length > 100) callback(new ConflictException('Origin filename must been not more than 100 characters'))
			// mimetype
			if(!/^image\//i.test(file.mimetype)) callback(new ConflictException('Invalid mime file type'))

			callback(null, true);
		}
	}))
	public async addUnit(@UploadedFiles() images: Array<Express.Multer.File>, @Body() unitDTO: UnitDTO) {
		return await this.unitsService.createUnit(unitDTO.title, images, unitDTO.lat, unitDTO.lng);
	}
}
