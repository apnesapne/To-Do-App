"use client";

import React, { useState, useEffect } from "react";
import { Plus, CheckCircle2 } from "lucide-react";
import { initialLists, initialTasks } from "@/lib/data";
import { TaskListComponent } from "@/components/task-list";
import { TaskFormSheet } from "@/components/task-form-sheet";
import { Button } from "@/components/ui/button";

export function TaskBoard() {
  const [lists, setLists] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem("tasks");
      const storedLists = localStorage.getItem("lists");
      if (storedTasks && storedLists) {
        const parsedTasks = JSON.parse(storedTasks).map((task) => ({
          ...task,
          dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
        }));
        setTasks(parsedTasks);
        setLists(JSON.parse(storedLists));
      } else {
        setLists(initialLists);
        setTasks(initialTasks);
      }
    } catch (error) {
      console.error("Failed to parse from localStorage", error);
      setLists(initialLists);
      setTasks(initialTasks);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
      localStorage.setItem("lists", JSON.stringify(lists));
    } catch (error) {
      console.error("Failed to save to localStorage", error);
    }
  }, [tasks, lists]);

  const handleOpenAddTask = () => {
    setEditingTask(null);
    setSheetOpen(true);
  };

  const handleOpenEditTask = (task) => {
    setEditingTask(task);
    setSheetOpen(true);
  };

  const handleTaskFormSubmit = (taskData, id) => {
    if (id) {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, ...taskData } : task
        )
      );
    } else {
      const newTask = {
        ...taskData,
        id: `task-${Date.now()}`,
        completed: false,
      };
      setTasks([...tasks, newTask]);
    }
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="flex h-screen w-full flex-col">
      <header className="flex items-center justify-between border-b px-4 py-3 shrink-0">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold font-headline">TaskFlow</h1>
        </div>
        <Button onClick={handleOpenAddTask} className="bg-accent hover:bg-accent/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </header>
      <main className="flex-1 overflow-x-auto p-4">
        <div className="flex h-full gap-6">
          {lists.map((list) => (
            <TaskListComponent
              key={list.id}
              list={list}
              tasks={tasks.filter((task) => task.listId === list.id)}
              onEditTask={handleOpenEditTask}
              onDeleteTask={deleteTask}
              onToggleComplete={toggleTaskCompletion}
            />
          ))}
        </div>
      </main>
      <TaskFormSheet
        open={isSheetOpen}
        onOpenChange={setSheetOpen}
        lists={lists}
        task={editingTask}
        onSubmit={handleTaskFormSubmit}
      />
    </div>
  );
}
