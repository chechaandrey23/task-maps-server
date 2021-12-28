"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuestModule = void 0;
const common_1 = require("@nestjs/common");
const guest_controller_1 = require("./guest.controller");
const units_module_1 = require("../entries/units/units.module");
let GuestModule = class GuestModule {
};
GuestModule = __decorate([
    (0, common_1.Module)({
        imports: [
            units_module_1.UnitsModule
        ],
        controllers: [
            guest_controller_1.GuestController
        ],
        providers: []
    })
], GuestModule);
exports.GuestModule = GuestModule;
//# sourceMappingURL=guest.module.js.map