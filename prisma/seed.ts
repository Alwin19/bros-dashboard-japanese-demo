import { prisma } from "../lib/prisma";
import "dotenv/config"



async function main() {
  // Create User 1 (CEO)
  const user1 = await prisma.user.create({
    data: {
      email: "user1@example.com",
      password: "password123",
      name: "User1",
      role: "CEO",
    },
  });


  // Create User 2 (CFO)
  const user2 = await prisma.user.create({
    data: {
      email: "user2@example.com",
      password: "password123",
      name: "User2",
      role: "CFO",
    },
  });


  // Fetch all users
  const allUsers = await prisma.user.findMany();
  console.log("All users:", JSON.stringify(allUsers, null, 2));
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
