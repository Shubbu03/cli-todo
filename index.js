const fs = require("fs");
const path = "./todos.json";
const { Command } = require("commander");
const program = new Command();

program
  .command("add")
  .description("Lets the user add a new todo")
  .argument('<todo-task>,"todo to be added"')
  .action(() => {
    const name = process.argv[3];
    const createdAt = new Date().toISOString();

    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return;
      }

      let todos = [];

      // Parse the existing todos if there are any
      if (data) {
        todos = JSON.parse(data);
      }

      let newId = 1;
      if (todos.length > 0) {
        const lastTodo = todos[todos.length - 1];
        newId = lastTodo.id + 1; // Increment ID by 1
      }

      const newTodo = {
        id: newId,
        name,
        createdAt,
        status: "pending",
      };
      // Add the new todo object to the array
      todos.push(newTodo);

      // Write the updated todos array back to the file
      fs.writeFile(path, JSON.stringify(todos, null, 2), "utf8", (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return;
        }
        console.log("Todo added successfully with ID:", newTodo.id);
      });
    });
  });

program
  .command("read")
  .description("Lets the user see the todo with given id")
  .argument('<todo-id>,"todo to be read"')
  .action(() => {
    const todoID = process.argv[3];

    fs.readFile(path, "utf-8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return;
      }

      let todos = [];

      if (data) {
        todos = JSON.parse(data);
      }

      const todo = todos.filter((todo) => todo.id.toString() === todoID);

      console.log(`Todo with id: ${todoID} is : ${todo[0].name}`);
    });
  });

program
  .command("read-all")
  .description("Lets the user see all of his created todos")
  .action(() => {
    fs.readFile(path, "utf-8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return;
      }

      let todos = [];
      let ctr = 1;

      if (data) {
        todos = JSON.parse(data);
      }

      console.log(`Pending todos are :- \n`);
      for (let i = 0; i < todos.length; i++) {
        console.log(`${ctr}) ${todos[i].name}`);
        ctr += 1;
      }
    });
  });

program
  .command("show-pending")
  .description("Lets the user see the pending todos")
  .action(() => {
    fs.readFile(path, "utf-8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return;
      }

      let todos = [];

      if (data) {
        todos = JSON.parse(data);
      }

      let pendingTodos = [];
      let ctr = 0;
      for (let i = 0; i < todos.length; i++) {
        if (todos[i].status === "pending") {
          pendingTodos.push(todos[i]);
          ctr += 1;
        }
      }

      if (pendingTodos.length == 0) {
        console.log("You have 0 pending tasks. Enjoy your day😇");
      } else {
        let ct = 1;
        console.log(`You have ${ctr} pending todos. They are:\n`);
        for (let i = 0; i < pendingTodos.length; i++) {
          console.log(`${ct}) ${pendingTodos[i].name}`);
        }
      }
    });
  });

program
  .command("update")
  .description("Lets user update a todo with given id")
  .arguments("<todo-id> <text>")
  .action(() => {
    const todoID = process.argv[3];
    const text = process.argv[4];

    fs.readFile(path, "utf-8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return;
      }

      let todos = [];

      if (data) {
        todos = JSON.parse(data);
      }

      for (let i = 0; i < todos.length; i++) {
        if (todos[i].id.toString() === todoID) {
          todos[i].name = text;
        }
      }

      fs.writeFile(path, JSON.stringify(todos, null, 2), "utf8", (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return;
        }
        console.log(`Todo with ID ${todoID} has been updated.`);
      });
    });
  });

program
  .command("update-status")
  .description("Lets user update a todo with given id")
  .argument('<todo-id>,"todo whose status is to be marked completed"')
  .action(() => {
    const todoID = process.argv[3];

    fs.readFile(path, "utf-8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return;
      }

      let todos = [];

      if (data) {
        todos = JSON.parse(data);
      }

      for (let i = 0; i < todos.length; i++) {
        if (todos[i].id.toString() === todoID) {
          todos[i].status = "completed";
        }
      }

      fs.writeFile(path, JSON.stringify(todos, null, 2), "utf8", (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return;
        }
        console.log(`Status of Todo with ID ${todoID} has been updated.`);
      });
    });
  });

program
  .command("delete")
  .description("Lets the user delete an existing todo of given id")
  .argument('<todo-id>, "todo to be deleted"')
  .action(() => {
    const deleteID = process.argv[3];

    fs.readFile(path, "utf-8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return;
      }

      let todos = [];

      if (data) {
        todos = JSON.parse(data);
      }

      const updatedTodos = todos.filter(
        (todo) => todo.id.toString() !== deleteID
      );

      fs.writeFile(
        path,
        JSON.stringify(updatedTodos, null, 2),
        "utf8",
        (err) => {
          if (err) {
            console.error("Error writing file:", err);
            return;
          }
          console.log(`Todo with ID ${deleteID} has been deleted.`);
        }
      );
    });
  });

program.parse();
