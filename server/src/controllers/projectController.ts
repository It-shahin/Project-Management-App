import type { Request, Response } from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client.js";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export const getProjects = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const projects = await prisma.project.findMany();
        res.json(projects);
    } catch (error: any) {
        res.status(500).json({ message: `Error retrieving projects: ${error.message}`});
    }
};

export const createProjects = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { name, description, startDate, endDate } = req.body;
    try {
        const newProject = await prisma.project.create({
            data: {
                name,
                description,
                startDate,
                endDate
            }
        })
        res.status(201).json(newProject);
    } catch (error: any) {
        res.status(500).json({ message: `Error creating projects: ${error.message}`});
    }
};
