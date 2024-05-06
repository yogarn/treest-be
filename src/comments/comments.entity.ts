import { JsonValue } from '@prisma/client/runtime/library';

export class Comment {
  id: string;
  news: News;
  user: User;
  content: JsonValue;
  createdAt: Date;
  updatedAt: Date;
}

class News {
  id: string;
  title: string;
  body: JsonValue;
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
}

class User {
  id: string;
  username: string;
  name: string;
  isAdmin: boolean;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}
