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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const visits_service_1 = require("./visits/visits.service");
let AppController = class AppController {
    visitsService;
    constructor(visitsService) {
        this.visitsService = visitsService;
    }
    async visitorInfo(request) {
        const createVisitDto = {
            visit_dt: new Date(),
            ip: request.ip || request.socket.remoteAddress || '-',
            user_agent: request.get('user-agent') || 'unknown',
        };
        await this.visitsService.create(createVisitDto);
        const queryParams = Object.keys(request.query).length > 0
            ? `?${new URLSearchParams(request.query).toString()}`
            : '';
        return {
            request: `[${request.method}] ${request.path}${queryParams}`,
            user_agent: request.get('user-agent') ?? 'unknown',
        };
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "visitorInfo", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [visits_service_1.VisitsService])
], AppController);
//# sourceMappingURL=app.controller.js.map