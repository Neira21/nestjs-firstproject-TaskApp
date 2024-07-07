import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import { TaskStatus } from './task.entity';
import { v4 } from 'uuid';
import { UpdateTaskDTO } from './dto/task.dto';

@Injectable()

// Simulate a database
export class TasksService {
  private tasks: Task[] = [
    {
      id: '1',
      title: 'Task 1',
      description: 'Task 1 Description',
      status: TaskStatus.PENDING,
    },
  ];

  getAllTasks() {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(title: string, description: string) {
    const newTask = {
      id: v4(),
      title,
      description,
      status: TaskStatus.PENDING,
    };
    this.tasks.push(newTask);

    return newTask;
  }

  updateTask(id: string, updatedFields: UpdateTaskDTO): Task {
    const task = this.getTaskById(id);
    const newTask = Object.assign(task, updatedFields);
    this.tasks = this.tasks.map((task) => (task.id === id ? newTask : task));
    return newTask;
  }

  deleteTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
