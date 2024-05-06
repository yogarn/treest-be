import { JsonValue } from "@prisma/client/runtime/library";
import { User } from "src/users/users.entity";

export class News {
    id: string;
    title: string;
    body: JsonValue;
    thumbnail: string;
    creator: User;
    creatorId: string;
    createdAt: Date;
    updatedAt: Date;
}
