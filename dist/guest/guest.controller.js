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
exports.GuestController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const units_service_1 = require("../entries/units/units.service");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class UnitsDTO {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => { return value * 1; }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UnitsDTO.prototype, "NELat", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => { return value * 1; }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UnitsDTO.prototype, "NELng", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => { return value * 1; }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UnitsDTO.prototype, "SWLat", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => { return value * 1; }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UnitsDTO.prototype, "SWLng", void 0);
class UnitDTO {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], UnitDTO.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => { return value * 1; }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UnitDTO.prototype, "lat", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => { return value * 1; }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UnitDTO.prototype, "lng", void 0);
let GuestController = class GuestController {
    constructor(unitsService) {
        this.unitsService = unitsService;
    }
    async getAllUnit(unitsDTO) {
        return await this.unitsService.getUnits(unitsDTO.NELat, unitsDTO.NELng, unitsDTO.SWLat, unitsDTO.SWLng);
    }
    async addUnit(images, unitDTO) {
        return await this.unitsService.createUnit(unitDTO.title, images, unitDTO.lat, unitDTO.lng);
    }
};
__decorate([
    (0, common_1.Get)('/units'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UnitsDTO]),
    __metadata("design:returntype", Promise)
], GuestController.prototype, "getAllUnit", null);
__decorate([
    (0, common_1.Post)('/unit/add'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images[]', 1, {
        limits: {
            fileSize: 3 * 1024 * 1024
        },
        fileFilter: (req, file, callback) => {
            if (file.originalname.length > 100)
                callback(new common_1.ConflictException('Origin filename must been not more than 100 characters'));
            if (!/^image\//i.test(file.mimetype))
                callback(new common_1.ConflictException('Invalid mime file type'));
            callback(null, true);
        }
    })),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, UnitDTO]),
    __metadata("design:returntype", Promise)
], GuestController.prototype, "addUnit", null);
GuestController = __decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, common_1.Controller)('/guest/api'),
    __metadata("design:paramtypes", [units_service_1.UnitsService])
], GuestController);
exports.GuestController = GuestController;
//# sourceMappingURL=guest.controller.js.map