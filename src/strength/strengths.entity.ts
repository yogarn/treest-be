export class Strength {
  id: string;
  title: string;
  detail: string;
  image: string;
  company: Company;
  createdAt: Date;
  updatedAt: Date;
}

class Company {
  id: string;
  name: string;
  description: string;
  logo?: string;
  tagline: string;
  stockSymbol: string;
  createdAt: Date;
  updatedAt: Date;
}
