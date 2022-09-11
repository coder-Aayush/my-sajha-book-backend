import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    // create user
  for (let index = 0; index < 100; index++) {
    const user1 =  await prisma.user.upsert({
        where: {email: 'aayush@aayush.com'},
        update: {},
        create: {
            token: `token12 ${index + 300}`,
            name: "Alice",
            email: `aayushab${index + 200}@aayush.com`,
            password: "alice",
            role: "ADMIN",
        },
    });
    
  }

    
}

main();