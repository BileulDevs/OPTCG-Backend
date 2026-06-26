import { prisma } from "../src/shared/db/prisma";

async function main() {
  await prisma.healthCheck.upsert({
    where: { id: "00000000-0000-0000-0000-000000000001" },
    update: { status: "healthy" },
    create: {
      id: "00000000-0000-0000-0000-000000000001",
      status: "healthy",
    },
  });

  console.log("Seed completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
