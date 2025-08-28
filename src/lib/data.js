export const initialLists = [
  { id: "todo", title: "To-Do" },
  { id: "inprogress", title: "In Progress" },
  { id: "done", title: "Done" },
];

export const initialTasks = [
  {
    id: "task-1",
    listId: "todo",
    title: "Design the new landing page",
    description: "Create mockups and wireframes in Figma.",
    priority: "high",
    completed: false,
    dueDate: new Date(new Date().setDate(new Date().getDate() + 2)),
  },
  {
    id: "task-2",
    listId: "todo",
    title: "Develop the API for user authentication",
    description: "Use JWT for authentication.",
    priority: "high",
    completed: false,
    dueDate: new Date(new Date().setDate(new Date().getDate() + 5)),
  },
  {
    id: "task-3",
    listId: "todo",
    title: "Write documentation for the new feature",
    priority: "medium",
    completed: false,
  },
  {
    id: "task-4",
    listId: "inprogress",
    title: "Fix the bug on the settings page",
    description: "The save button is not working correctly.",
    priority: "high",
    completed: false,
  },
  {
    id: "task-5",
    listId: "inprogress",
    title: "Refactor the database schema",
    priority: "low",
    completed: false,
    dueDate: new Date(new Date().setDate(new Date().getDate() + 14)),
  },
  {
    id: "task-6",
    listId: "done",
    title: "Deploy the latest version to production",
    priority: "medium",
    completed: true,
  },
  {
    id: "task-7",
    listId: "done",
    title: "Onboard new team member",
    description: "Schedule orientation and introduce to the team.",
    priority: "low",
    completed: true,
  },
];
