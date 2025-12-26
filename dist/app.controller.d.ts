import { VisitsService } from './visits/visits.service';
import { Request } from 'express';
import { VisitorInfoResponseDto } from './dto/visitorInfoResponse.dto';
export declare class AppController {
    private readonly visitsService;
    constructor(visitsService: VisitsService);
    visitorInfo(request: Request): Promise<VisitorInfoResponseDto>;
}
