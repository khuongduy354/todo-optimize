import express, { Request, Response } from "express";

const app = express();
const PORT = 3000;

app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("Hello Worldaa!");
});

// ROUTE
app.get("/:username/todos", async (req: Request, res: Response) => {
  const { username } = req.params;
  const todos = Model.Todo.getAll(username);
  res.status(200).json(todos);
});
app.post("/:username/todo", async (req: Request, res: Response) => {
  const { username } = req.params;
  const { taskname, completed } = req.body;
  Model.Todo.create(username, taskname, completed);
  res.status(201).json({ message: "Todo created" });
});
app.delete("/:username/todo/:todoId", async (req: Request, res: Response) => {
  const { todoId } = req.params;
  Model.Todo.deleteOne(todoId);
  res.status(200).json({ message: "Todo deleted" });
});

// MODEL
const Model = {
  Todo: {
    create: function (username: string, taskname: string, completed: boolean) {
      Database.Todo.push({
        id: Database.Todo.length,
        username,
        taskname,
        completed,
      });
    },
    getAll: (username: string) => {
      return Database.Todo.filter((todo) => todo.username === username);
    },
    deleteOne: (todoId: string) => {
      Database.Todo = Database.Todo.filter(
        (todo) => todo.id !== Number(todoId)
      );
    },
  },
};

// Database
const Database = {
  Todo: [{ id: 0, username: "alice", taskname: "Buy milk", completed: false }],
  User: [{ id: 0, username: "alice" }],
};

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
