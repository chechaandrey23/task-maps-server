/// <reference types="multer" />
/// <reference types="node" />
import { Sequelize } from 'sequelize-typescript';
import { Unit } from './unit.model';
export declare class UnitsService {
    private sequelize;
    private units;
    constructor(sequelize: Sequelize, units: typeof Unit);
    createUnit(title: string, images: Array<Express.Multer.File>, lat: number, lng: number): Promise<Unit>;
    protected writeFile(fileName: string, fileBuffer: Buffer): Promise<void>;
    getUnits(neLat: number, neLng: number, swLat: number, swLng: number): Promise<Unit[]>;
}
