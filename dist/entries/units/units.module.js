"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitsModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const units_service_1 = require("./units.service");
const unit_model_1 = require("./unit.model");
let UnitsModule = class UnitsModule {
};
UnitsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([unit_model_1.Unit]),
        ],
        controllers: [],
        providers: [
            units_service_1.UnitsService
        ],
        exports: [
            units_service_1.UnitsService
        ]
    })
], UnitsModule);
exports.UnitsModule = UnitsModule;
//# sourceMappingURL=units.module.js.map