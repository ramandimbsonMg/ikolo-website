const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@ikolo.com"; // 🔹 Email souhaité
  const adminPassword = "SuperAdmin2025!"; // 🔹 Nouveau mot de passe
  const adminName = "Admin Ikolo"; // 🔹 Nouveau nom

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  // Cherche l'admin existant
  const existingAdmin = await prisma.user.findFirst({
    where: { role: "admin" },
  });

  if (!existingAdmin) {
    // Crée un nouvel admin
    await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: adminName,
        role: "admin",
      },
    });
    console.log("✅ Admin créé avec succès");
  } else {
    // Met à jour l'admin existant
    await prisma.user.update({
      where: { id: existingAdmin.id },
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: adminName,
      },
    });
    console.log("ℹ️ Admin existant mis à jour avec succès");
  }
}

main()
  .catch((e) =>
    console.error("Erreur lors de la création/mise à jour de l’admin :", e)
  )
  .finally(() => prisma.$disconnect());
