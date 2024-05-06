export class Strength {
  id: string;
  company: {
    id: string;
    name: string;
    description: string;
    logo?: string;
    tagline: string;
    stockSymbol: string;
    createdAt: Date;
    updatedAt: Date;
  };
  companyId: string;
  title: string;
  detail: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}
