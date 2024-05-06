import { JsonValue } from '@prisma/client/runtime/library';

export class Comment {
  id: string;
  news: {
    id: string;
    title: string;
    body: JsonValue;
    thumbnail: string;
    creatorId: string;
    createdAt: Date;
    updatedAt: Date;
  };
  user: {
    id: string;
    username: string;
    name: string;
    isAdmin: boolean;
    image: string;
    createdAt: Date;
    updatedAt: Date;
  };
  content: JsonValue;
  createdAt: Date;
  updatedAt: Date;
}
