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
