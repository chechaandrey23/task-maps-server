"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_2 = require("sequelize");
const uuid_1 = require("uuid");
const path = require("path");
const promises_1 = require("fs/promises");
const handler_error_1 = require("../../helpers/handler.error");
const unit_model_1 = require("./unit.model");
let UnitsService = class UnitsService {
    constructor(sequelize, units) {
        this.sequelize = sequelize;
        this.units = units;
    }
    async createUnit(title, images, lat, lng) {
        try {
            return await this.sequelize.transaction({}, async (t) => {
                if (images.length < 1)
                    throw new common_1.ConflictException('At least one file must be transferred');
                const extNameArr = images[0].originalname.split('.');
                const fileName = `${(0, uuid_1.v4)()}.${extNameArr[extNameArr.length - 1]}`;
                const res = await this.units.create({ title, lat, lng, image: fileName }, { transaction: t });
                await this.writeFile(fileName, images[0].buffer);
                return await this.units.findOne({ where: { id: res.getDataValue('id') }, transaction: t });
            });
        }
        catch (e) {
            (0, handler_error_1.handlerError)(e);
        }
    }
    async writeFile(fileName, fileBuffer) {
        await (0, promises_1.writeFile)(path.resolve() + '/../uploads/' + fileName, fileBuffer);
    }
    async getUnits(neLat, neLng, swLat, swLng) {
        return this.units.findAll({ where: {
                [sequelize_2.Op.and]: [
                    { [sequelize_2.Op.and]: [
                            { lat: { [sequelize_2.Op.lte]: neLat } },
                            { lng: { [sequelize_2.Op.lte]: neLng } }
                        ] },
                    { [sequelize_2.Op.and]: [
                            { lat: { [sequelize_2.Op.gte]: swLat } },
                            { lng: { [sequelize_2.Op.gte]: swLng } }
                        ] }
                ]
            } });
    }
};
UnitsService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, sequelize_1.InjectModel)(unit_model_1.Unit)),
    __metadata("design:paramtypes", [sequelize_typescript_1.Sequelize, Object])
], UnitsService);
exports.UnitsService = UnitsService;
//# sourceMappingURL=units.service.js.map