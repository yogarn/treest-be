export const companySelect = {
  id: true,
  name: true,
  description: true,
  logo: true,
  tagline: true,
  strengths: true,
  portfolios: true,
  news: {
    select: {
      id: true,
      title: true,
      body: true,
      thumbnail: true,
      creator: true,
      createdAt: true,
      updatedAt: true,
    },
  },
  founder: true,
  founderId: false,
  coFounder: true,
  coFounderId: false,
  stockSymbol: true,
  createdAt: true,
  updatedAt: true,
};