"use client";

import { Calendar, Edit, Flag, MoreVertical, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const priorityVariant = {
  high: "destructive",
  medium: "default",
  low: "secondary",
};

export function TaskCard({ task, onEdit, onDelete, onToggleComplete }) {
  const isDueSoon = task.dueDate && !task.completed ? new Date(task.dueDate) < new Date(new Date().setDate(new Date().getDate() + 3)) : false;

  return (
    <Card
      className={cn(
        "hover:shadow-lg transition-shadow",
        task.completed && "bg-card/50",
        isDueSoon && "border-destructive/50"
      )}
    >
      <CardHeader className="flex flex-row items-start gap-4 space-y-0 p-4">
        <div className="flex items-center space-x-3">
           <Checkbox
            id={`complete-${task.id}`}
            checked={task.completed}
            onCheckedChange={() => onToggleComplete(task.id)}
            aria-label={`Mark ${task.title} as complete`}
           />
        </div>
        <div className="flex-1">
          <CardTitle
            className={cn(
              "text-base",
              task.completed && "line-through text-muted-foreground"
            )}
          >
            {task.title}
          </CardTitle>
          {task.description && (
            <CardDescription className={cn("mt-1", task.completed && "line-through")}>
              {task.description}
            </CardDescription>
          )}
        </div>
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(task)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the task "{task.title}".
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => onDelete(task.id)}
                className="bg-destructive hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardHeader>
      {(task.dueDate || task.priority) && (
        <CardContent className="p-4 pt-0 flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
                {task.dueDate && (
                    <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{format(new Date(task.dueDate), "MMM d")}</span>
                    </div>
                )}
            </div>
            <Badge variant={priorityVariant[task.priority]} className="capitalize flex items-center gap-1">
                <Flag className="h-3 w-3" />
                {task.priority}
            </Badge>
        </CardContent>
      )}
    </Card>
  );
}
