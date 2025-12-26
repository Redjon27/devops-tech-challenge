import { CreateVisitDto } from './dto/create-visit.dto';
import { Visit, VisitDocument } from './entities/visit.entity';
import { Model } from 'mongoose';
export declare class VisitsService {
    private readonly visitModel;
    constructor(visitModel: Model<VisitDocument>);
    create(createVisit: CreateVisitDto): Promise<import("mongoose").Document<unknown, {}, VisitDocument, {}, {}> & Visit & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
