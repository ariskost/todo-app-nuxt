# To-Do List Application

This project is a task management application built using **Nuxt 3**, **Vue 3**, **Pinia**, and **Tailwind CSS**. It allows users to add, display, and remove tasks with real-time updates and smooth animations for an enhanced user experience.

## Features

- Real-time task management with instant updates for adding and removing tasks.
- Smooth animations using Vue's `<transition-group>` for fade-down and fade-left effects.
- Optimized API interactions to minimize redundant calls and improve performance.
- A responsive and clean UI styled with Tailwind CSS.

---

## Improvements Made During Development

### Initial Setup

The initial implementation relied on `useFetch` to:

- Load tasks from the API when the component mounted.
- Re-fetch the entire task list after adding or removing tasks.

While functional, this approach had the following drawbacks:

- Entire list re-renders disrupted animations and caused flickering.
- Redundant API calls increased performance overhead.
- Transient states during re-fetching led to occasional "No Tasks" messages being displayed.

---

### Enhancements

To address these issues, the following improvements were made:

1. **Local Reactive State**
   - Introduced a `safeTasks` array to manage tasks locally.
   - This ensures stable UI updates without relying on constant re-fetching.

2. **Minimized API Calls**
   - Instead of re-fetching the entire task list, tasks are now updated directly in `safeTasks`.
   - For adding tasks, the new task is appended locally after a successful API response.
   - For removing tasks, the task is filtered out locally without a full list refresh.

3. **Precise Animations**
   - Animations were added for adding and removing tasks:
     - A fade-down animation for adding tasks.
     - A fade-left animation for removing tasks.
   - Vue’s `<transition-group>` ensures animations are applied only to affected items.

4. **Improved Event Handling**
   - A centralized `eventBus` was used to communicate between components, allowing real-time updates to the task list when a new task is added.

5. **Better User Experience**
   - Eliminated flickering and transient "No Tasks" states by syncing the reactive `safeTasks` array with the fetched data.

---

## Project Structure

The app has the following main components:

- **ToDoForm.vue**: Handles adding new tasks, including form validation and API interactions.
- **ToDoList.vue**: Displays tasks with options to remove them and handles animations for real-time updates.
- **eventBus.js**: A simple event bus for inter-component communication.
- **assets/css/animations.css**: Contains the fade-down and fade-left animations for task updates.

---

## How It Works

### Fetching Tasks

- On mount, tasks are fetched from the API and stored in the `safeTasks` array for rendering.
- If no tasks are available, a "No Tasks" message is displayed.

### Adding Tasks

- A new task is added via the `addNewTask` function in `ToDoForm.vue`.
- After a successful API call, the new task is emitted via the `eventBus` and added to `safeTasks`.

### Removing Tasks

- A task is removed by sending a DELETE request to the API.
- Once confirmed, the task is filtered out locally from `safeTasks`.

---

## Animations

- **Fade-Down Animation**: Applied to tasks when they are added.
- **Fade-Left Animation**: Applied to tasks when they are removed.
- Defined in `assets/css/animations.css` and applied using Vue's `<transition-group>`.


# Clone the repository
git clone https://github.com/ariskost/todo-app-nuxt.git

# Navigate to the project directory
cd project directory

# Install dependencies
npm install
