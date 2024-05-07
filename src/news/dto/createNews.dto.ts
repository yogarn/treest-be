import { JsonValue } from "@prisma/client/runtime/library";

export class CreateNews {
    title: string;
    body: JsonValue;
    thumbnail: string;
    companyId: string;
}
