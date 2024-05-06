import { JsonValue } from "@prisma/client/runtime/library";

export class CreateComment {
  newsId: string;
  userId: string;
  content: JsonValue;
}
