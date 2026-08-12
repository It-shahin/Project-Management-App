import type { Request, Response } from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client.js";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export const getUsers = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const users = await prisma.user.findMany()
        res.json(users);
    } catch (error: any) {
        res.status(500).json({ message: `Error retrieving users: ${error.message}`});
    }
};