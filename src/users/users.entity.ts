import { JsonValue } from '@prisma/client/runtime/library';

export class User {
  id: string;
  username: string;
  name: string;
  isAdmin: boolean;
  image: string;
  asFounder: Company[];
  asCoFounder: Company[];
  news: News[];
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

class Company {
  id: string;
  name: string;
  description: string;
  logo: string;
  tagline: string;
  stockSymbol: string;
  createdAt: Date;
  updatedAt: Date;
}

class News {
  id: string;
  title: string;
  body: JsonValue;
  thumbnail: string;
  creatorId: string;
  createdAt: Date;
  updatedAt: Date;
}

class Comment {
  id: string;
  newsId: string;
  userId: string;
  content: JsonValue;
}
