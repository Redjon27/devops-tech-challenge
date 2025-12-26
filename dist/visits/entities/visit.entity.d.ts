import { Document } from 'mongoose';
export type VisitDocument = Visit & Document;
export declare class Visit {
    visit_dt: Date;
    ip: string;
    user_agent: string;
}
export declare const VisitSchema: import("mongoose").Schema<Visit, import("mongoose").Model<Visit, any, any, any, Document<unknown, any, Visit, any, {}> & Visit & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Visit, Document<unknown, {}, import("mongoose").FlatRecord<Visit>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Visit> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
