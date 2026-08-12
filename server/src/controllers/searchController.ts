import type { Request, Response } from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client.js";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export const Search = async (
    req: Request,
    res: Response
): Promise<void> => {
    const {query} = req.query;
    try {
        const tasks = await prisma.task.findMany({
            where: {
                OR: [
                    {title: { contains: query as string}},
                    {description: { contains: query as string}}
                ]
            }
        });

        const projects = await prisma.project.findMany({
            where: {
                OR: [
                    {name: { contains: query as string}},
                    {description: { contains: query as string}}
                ]
            }
        });

        const users = await prisma.user.findMany({
            where: {
                OR: [
                    {username: { contains: query as string}},
                ]
            }
        })
        res.json({tasks, projects, users});
    } catch (error: any) {
        res.status(500).json({ message: `Error performing search: ${error.message}`});
    }
};