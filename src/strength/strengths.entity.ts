import { Company } from 'src/companies/companies.entity';

export class Strength {
  id: string;
  company: {
    id: string;
    name: string;
    description: string;
    logo?: string;
    tagline: string;
    stockSymbol: string;
  };
  companyId: string;
  title: string;
  detail: string;
  image: string;
}
