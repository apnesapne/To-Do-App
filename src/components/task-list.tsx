"use client";

import type { Task, TaskList } from "@/lib/types";
import { TaskCard } from "@/components/task-card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TaskListProps {
  list: TaskList;
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
}

export function TaskListComponent({ list, tasks, onEditTask, onDeleteTask, onToggleComplete }: TaskListProps) {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const progress = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

  return (
    <div className="flex h-full w-80 shrink-0 flex-col rounded-lg">
      <div className="flex items-center justify-between p-2">
        <h2 className="text-lg font-semibold">{list.title}</h2>
        <span className="text-sm text-muted-foreground">{tasks.length}</span>
      </div>
      <div className="px-2 pb-2">
         <Progress value={progress} className="h-2" indicatorClassName="bg-primary" />
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-3 p-2">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
              onToggleComplete={onToggleComplete}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
