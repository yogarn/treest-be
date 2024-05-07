import { JsonValue } from "@prisma/client/runtime/library";

export class UpdateNews {
    title: string;
    body: JsonValue;
    thumbnail: string;
    companyId: string;
}
