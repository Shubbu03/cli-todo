# CLI Todo App

A simple command-line interface (CLI) todo application built using Node.js. This application allows you to add, list, update, and delete your tasks directly from the terminal. Created for in class assignment Cohort3.0 week#4.

## Features

- **Add Todos**: You can add a new todo task to your list.
- **List Todos**: View all your current todos, along with their unique IDs and completion status.
- **Update Todos**: Modify the content of a todo based on its unique ID.
- **Delete Todos**: Remove a todo from your list by specifying its ID.
- **Complete Todos**: Mark a todo as completed to keep track of tasks you've finished.
- **Auto Incrementing ID**: Each new todo is assigned a unique ID starting from 1 and incrementing automatically.

## Usage

1. **Add a todo**
   ```bash
   node index.js add "Your task here"

2. **View todo by id**
   ```bash
   node index.js read "Your todo id here"

3. **View all todos**
   ```bash
   node index.js read-all

4. **Check pending todos**
   ```bash
   node index.js show-pending

5. **Update a todo**
   ```bash
   node index.js update "todo id here" "Your updated task here"

1. **Update a todo status**
   ```bash
   node index.js update-status "Your todo id here"

1. **Delete a todo**
   ```bash
   node index.js delete "Your todo id here"
