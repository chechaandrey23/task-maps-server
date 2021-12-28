/// <reference types="multer" />
import { UnitsService } from '../entries/units/units.service';
declare class UnitsDTO {
    NELat: number;
    NELng: number;
    SWLat: number;
    SWLng: number;
}
declare class UnitDTO {
    title: string;
    lat: number;
    lng: number;
}
export declare class GuestController {
    private unitsService;
    constructor(unitsService: UnitsService);
    getAllUnit(unitsDTO: UnitsDTO): Promise<import("../entries/units/unit.model").Unit[]>;
    addUnit(images: Array<Express.Multer.File>, unitDTO: UnitDTO): Promise<import("../entries/units/unit.model").Unit>;
}
export {};
