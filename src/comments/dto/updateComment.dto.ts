import { JsonValue } from '@prisma/client/runtime/library';

export class UpdateComment {
  newsId: string;
  userId: string;
  content: JsonValue;
}
