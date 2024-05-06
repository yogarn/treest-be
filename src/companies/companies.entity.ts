import { User } from "src/users/users.entity";

class Company {
  id: string;
  name: string;
  description: string;
  logo?: string;
  tagline: string;
  strengths: Strength[];
  portfolios: Portfolio[];
  founder: User;
  coFounder: User;
  stockSymbol: string;
}

class Strength {
  id: string;
  companyId: string;
  title: string;
  detail: string;
  image: string;
}

class Portfolio {
    id: string;
    companyId: string;
    title: string;
    detail: string;
    image: string;
}

export { Company };
