import type { Request, Response } from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client.js";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export const getTasks = async (
    req: Request,
    res: Response
): Promise<void> => {
    const {projectId} = req.query;
    try {
        const tasks = await prisma.task.findMany({
            where: {
                projectId: Number(projectId),
            },
            include: {
                author: true,
                assignee: true,
                comments: true,
                attachments: true,
            },
        })
        res.json(tasks);
    } catch (error: any) {
        res.status(500).json({ message: `Error retrieving tasks: ${error.message}`});
    }
};

export const createTask = async (
    req: Request,
    res: Response
): Promise<void> => {
    if (!req.body) {
        res.status(400).json({ message: "Request body is required. Send JSON with Content-Type: application/json." });
        return;
    }

    const {
        title,
        description,
        status,
        priority,
        tags,
        startDate,
        dueDate,
        points,
        projectId,
        authorUserId,
        assignedUserId,
    } = req.body;

    if (!title || !projectId || !authorUserId) {
        res.status(400).json({ message: "title, projectId, and authorUserId are required" });
        return;
    }

    try {
        const newTask = await prisma.task.create({
            data: {
                title,
                description,
                status,
                priority,
                tags,
                startDate,
                dueDate,
                points,
                projectId,
                authorUserId,
                assignedUserId,
            },
        });

        res.status(201).json(newTask);
    } catch (error: any) {
        res.status(500).json({ message: `Error creating task: ${error.message}`});
    }
};

export const updateTaskStatus = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { taskId } = req.params;
    const { status } = req.body;
    try {
        const updatedTask = await prisma.task.update({
            where: {
                id: Number(taskId),
            },
            data: {
                status: status,
            }
        })
        res.json(updatedTask);
    } catch (error: any) {
        res.status(500).json({ message: `Error updating task: ${error.message}`});
    }
};