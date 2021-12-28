import { Model } from "sequelize-typescript";
interface CreateUnit {
    title: string;
    image: string;
    lat: number;
    lng: number;
}
export declare class Unit extends Model<Unit, CreateUnit> {
    id: number;
    title: string;
    image: string;
    lat: number;
    lng: number;
}
export {};
