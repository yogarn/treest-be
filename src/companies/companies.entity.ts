import { JsonValue } from "@prisma/client/runtime/library";

class Company {
  id: string;
  name: string;
  description: string;
  logo: string;
  tagline: string;
  strengths: Strength[];
  portfolios: Portfolio[];
  news: News[];
  founder: User;
  coFounder: User;
  stockSymbol: string;
  createdAt: Date;
  updatedAt: Date;
}

class Strength {
  id: string;
  companyId: string;
  title: string;
  detail: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

class Portfolio {
  id: string;
  companyId: string;
  title: string;
  detail: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

class News {
  id: string;
  title: string;
  body: JsonValue;
  thumbnail: string;
  creator: User;
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

export { Company };
