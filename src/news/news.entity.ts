import { JsonValue } from '@prisma/client/runtime/library';

export class News {
  id: string;
  title: string;
  body: JsonValue;
  thumbnail: string;
  creator: User;
  comments: Comment[];
  company: Company;
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

class Comment {
  id: string;
  newsId: string;
  userId: string;
  content: JsonValue;
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
