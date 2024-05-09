import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
async function main() {
  // seeding company
  const companyList = [
    'First Solar',
    'Vestas Wind System',
    'Ormat Technologies',
    'Tesla',
    'Brookfield Renewable Partners',
    'Waste Management',
  ];

  const stockSymbols = ['FSLR', 'VWS', 'ORA', 'TSLA', 'BEP', 'WM'];

  for (var i = 0; i < companyList.length; i++) {
    console.log(`seeding ${companyList[i]}...`);
    const id = faker.string.uuid();
    await prisma.company.upsert({
      where: { id: id },
      update: {},
      create: {
        id: id,
        name: companyList[i],
        description: faker.word.words(10),
        tagline: faker.commerce.productDescription(),
        stockSymbol: stockSymbols[i],
        founder: {
          create: {
            id: faker.string.uuid(),
            username: faker.internet.userName(),
            password: await bcrypt.hash('root', 10),
            email: faker.internet.email(),
            name: `${faker.person.firstName()} ${faker.person.lastName()}`,
          },
        },
        coFounder: {
          create: {
            id: faker.string.uuid(),
            username: faker.internet.userName(),
            password: await bcrypt.hash('root', 10),
            email: faker.internet.email(),
            name: `${faker.person.firstName()} ${faker.person.lastName()}`,
          },
        },
        strengths: {
          create: [
            {
              title: faker.commerce.product(),
              detail: faker.word.words(5),
            },
            {
              title: faker.commerce.product(),
              detail: faker.word.words(5),
            },
            {
              title: faker.commerce.product(),
              detail: faker.word.words(5),
            },
            {
              title: faker.commerce.product(),
              detail: faker.word.words(5),
            },
          ],
        },
        portfolios: {
          create: [
            {
              title: faker.commerce.product(),
              detail: faker.word.words(5),
            },
            {
              title: faker.commerce.product(),
              detail: faker.word.words(5),
            },
            {
              title: faker.commerce.product(),
              detail: faker.word.words(5),
            },
            {
              title: faker.commerce.product(),
              detail: faker.word.words(5),
            },
          ],
        },
        news: {
          create: [
            {
              title: faker.word.words(5),
              body: faker.word.words(100),
              creator: {
                create: {
                  id: faker.string.uuid(),
                  username: faker.internet.userName(),
                  password: await bcrypt.hash('root', 10),
                  email: faker.internet.email(),
                  name: `${faker.person.firstName()} ${faker.person.lastName()}`,
                },
              },
              comments: {
                create: [
                  {
                    content: faker.word.words(50),
                    user: {
                      create: {
                        id: faker.string.uuid(),
                        username: faker.internet.userName(),
                        password: await bcrypt.hash('root', 10),
                        email: faker.internet.email(),
                        name: `${faker.person.firstName()} ${faker.person.lastName()}`,
                      },
                    },
                  },
                  {
                    content: faker.word.words(50),
                    user: {
                      create: {
                        id: faker.string.uuid(),
                        username: faker.internet.userName(),
                        password: await bcrypt.hash('root', 10),
                        email: faker.internet.email(),
                        name: `${faker.person.firstName()} ${faker.person.lastName()}`,
                      },
                    },
                  },
                  {
                    content: faker.word.words(50),
                    user: {
                      create: {
                        id: faker.string.uuid(),
                        username: faker.internet.userName(),
                        password: await bcrypt.hash('root', 10),
                        email: faker.internet.email(),
                        name: `${faker.person.firstName()} ${faker.person.lastName()}`,
                      },
                    },
                  },
                  {
                    content: faker.word.words(50),
                    user: {
                      create: {
                        id: faker.string.uuid(),
                        username: faker.internet.userName(),
                        password: await bcrypt.hash('root', 10),
                        email: faker.internet.email(),
                        name: `${faker.person.firstName()} ${faker.person.lastName()}`,
                      },
                    },
                  },
                ],
              },
            },
            {
              title: faker.word.words(5),
              body: faker.word.words(100),
              creator: {
                create: {
                  id: faker.string.uuid(),
                  username: faker.internet.userName(),
                  password: await bcrypt.hash('root', 10),
                  email: faker.internet.email(),
                  name: `${faker.person.firstName()} ${faker.person.lastName()}`,
                },
              },
              comments: {
                create: [
                  {
                    content: faker.word.words(50),
                    user: {
                      create: {
                        id: faker.string.uuid(),
                        username: faker.internet.userName(),
                        password: await bcrypt.hash('root', 10),
                        email: faker.internet.email(),
                        name: `${faker.person.firstName()} ${faker.person.lastName()}`,
                      },
                    },
                  },
                  {
                    content: faker.word.words(50),
                    user: {
                      create: {
                        id: faker.string.uuid(),
                        username: faker.internet.userName(),
                        password: await bcrypt.hash('root', 10),
                        email: faker.internet.email(),
                        name: `${faker.person.firstName()} ${faker.person.lastName()}`,
                      },
                    },
                  },
                  {
                    content: faker.word.words(50),
                    user: {
                      create: {
                        id: faker.string.uuid(),
                        username: faker.internet.userName(),
                        password: await bcrypt.hash('root', 10),
                        email: faker.internet.email(),
                        name: `${faker.person.firstName()} ${faker.person.lastName()}`,
                      },
                    },
                  },
                  {
                    content: faker.word.words(50),
                    user: {
                      create: {
                        id: faker.string.uuid(),
                        username: faker.internet.userName(),
                        password: await bcrypt.hash('root', 10),
                        email: faker.internet.email(),
                        name: `${faker.person.firstName()} ${faker.person.lastName()}`,
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    });
  }

  // seeding random users
  for (var i = 0; i < 10; i++) {
    const email: string = faker.internet.email();
    console.log(`seeding ${email}...`);
    await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        username: faker.internet.userName(),
        password: await bcrypt.hash('root', 10),
        email: email,
        name: `${faker.person.firstName()} ${faker.person.lastName()}`,
      },
    });
  }

  // seeding admin user
  console.log(`seeding admin...`);
  await prisma.user.upsert({
    where: { email: 'admin@root' },
    update: {},
    create: {
      username: 'admin',
      password: await bcrypt.hash('root', 10),
      email: 'admin@root',
      name: 'Administrator',
      isAdmin: true,
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
