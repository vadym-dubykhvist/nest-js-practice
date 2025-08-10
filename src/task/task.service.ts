import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  private tasks = [
    {
      id: 1,
      title: 'Nest js',
      isCompleted: false,
      description: '',
      priority: 1,
      tags: [] as string[],
    },
    {
      id: 2,
      title: 'Nest js 2',
      isCompleted: true,
      description: '',
      priority: 2,
      tags: [] as string[],
    },
  ];
  findAll() {
    return this.tasks;
  }

  findById(id: number) {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  create(dto: CreateTaskDto) {
    const { title, description, priority, tags } = dto;

    const newTask = {
      id: this.tasks.length + 1,
      title,
      description,
      priority,
      tags: tags,
      isCompleted: false,
    };

    this.tasks.push(newTask);

    return this.tasks;
  }

  update(id: number, dto: UpdateTaskDto) {
    const { title, isCompleted } = dto;

    const task = this.findById(id);

    task.title = title;
    task.isCompleted = isCompleted;

    return task;
  }

  patchUpdate(id: number, dto: Partial<UpdateTaskDto>) {
    const task = this.findById(id);

    Object.assign(task, dto);

    return task;
  }

  delete(id: number) {
    const task = this.findById(id);

    this.tasks = this.tasks.filter((t) => t.id !== task.id);

    return task;
  }
}
