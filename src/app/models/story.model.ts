import { Task } from "./task.model";

export interface Story {
    description: string;
    taskList: Task[];
}