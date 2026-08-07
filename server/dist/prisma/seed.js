import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PrismaPg } from "@prisma/adapter-pg";
import { Prisma, PrismaClient } from "../generated/prisma/client.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
const identityColumns = [
    { tableName: "Team", columnName: "id" },
    { tableName: "Project", columnName: "id" },
    { tableName: "ProjectTeam", columnName: "id" },
    { tableName: "User", columnName: "userId" },
    { tableName: "Task", columnName: "id" },
    { tableName: "Attachment", columnName: "id" },
    { tableName: "Comment", columnName: "id" },
    { tableName: "TaskAssignment", columnName: "id" },
];
async function deleteModelData(modelName) {
    switch (modelName) {
        case "team":
            return prisma.team.deleteMany({});
        case "project":
            return prisma.project.deleteMany({});
        case "projectTeam":
            return prisma.projectTeam.deleteMany({});
        case "user":
            return prisma.user.deleteMany({});
        case "task":
            return prisma.task.deleteMany({});
        case "attachment":
            return prisma.attachment.deleteMany({});
        case "comment":
            return prisma.comment.deleteMany({});
        case "taskAssignment":
            return prisma.taskAssignment.deleteMany({});
    }
}
async function seedModelData(modelName, data) {
    switch (modelName) {
        case "team":
            return prisma.team.createMany({
                data: data,
            });
        case "project":
            return prisma.project.createMany({
                data: data,
            });
        case "projectTeam":
            return prisma.projectTeam.createMany({
                data: data,
            });
        case "user":
            return prisma.user.createMany({
                data: data,
            });
        case "task":
            return prisma.task.createMany({
                data: data,
            });
        case "attachment":
            return prisma.attachment.createMany({
                data: data,
            });
        case "comment":
            return prisma.comment.createMany({
                data: data,
            });
        case "taskAssignment":
            return prisma.taskAssignment.createMany({
                data: data,
            });
    }
}
async function deleteAllData(modelNames) {
    for (const modelName of modelNames) {
        try {
            await deleteModelData(modelName);
            console.log(`Cleared data from ${modelName}`);
        }
        catch (error) {
            console.error(`Error clearing data from ${modelName}:`, error);
        }
    }
}
async function resetIdentitySequences() {
    for (const { tableName, columnName } of identityColumns) {
        await prisma.$executeRawUnsafe(`SELECT setval(pg_get_serial_sequence('"${tableName}"', '${columnName}'), 1, false);`);
    }
}
async function main() {
    const dataDirectory = path.join(__dirname, "seedData");
    const deleteOrder = [
        "taskAssignment",
        "comment",
        "attachment",
        "task",
        "projectTeam",
        "user",
        "project",
        "team",
    ];
    const seedOrder = [
        "team",
        "project",
        "projectTeam",
        "user",
        "task",
        "attachment",
        "comment",
        "taskAssignment",
    ];
    await deleteAllData(deleteOrder);
    await resetIdentitySequences();
    for (const modelName of seedOrder) {
        const fileName = `${modelName}.json`;
        const filePath = path.join(dataDirectory, fileName);
        const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        try {
            await seedModelData(modelName, jsonData);
            console.log(`Seeded ${modelName} with data from ${fileName}`);
        }
        catch (error) {
            console.error(`Error seeding data for ${modelName}:`, error);
        }
    }
}
main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
//# sourceMappingURL=seed.js.map