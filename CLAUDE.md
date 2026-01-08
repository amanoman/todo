# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a client-side TODO list application built with vanilla JavaScript, HTML, and CSS. The app runs entirely in the browser with no build process or dependencies.

## Architecture

### Single-Page Application Structure
- **index.html**: Main HTML structure with Japanese UI text (すべて, 未完了, 完了済み)
- **script.js**: TodoApp class that manages all application logic
- **style.css**: Complete styling with purple gradient theme and animations

### Data Flow
- All todos stored in browser localStorage as JSON
- TodoApp class manages state via `this.todos` array
- Each todo object: `{ id, text, completed, createdAt }`
- IDs generated using `Date.now()` for uniqueness
- State persistence: automatic save after every operation (add, toggle, delete)

### TodoApp Class Architecture
The application uses a single class pattern with these key methods:
- **State Management**: `loadTodos()`, `saveTodos()` handle localStorage persistence
- **CRUD Operations**: `addTodo()`, `toggleTodo()`, `deleteTodo()`, `clearCompleted()`
- **Filtering**: `setFilter()`, `getFilteredTodos()` support three views (all/active/completed)
- **Rendering**: `render()`, `updateStats()` rebuild DOM on every state change

### UI Patterns
- Filter buttons toggle via `data-filter` attributes and `.active` class
- Complete re-render on every change (not optimized for large lists)
- Empty states shown when no todos match current filter
- Stats show active (incomplete) task count only

## Running the Application

Open `index.html` directly in a browser. No build step, server, or dependencies required.

For development with live reload:
```bash
python -m http.server 8000
# or
npx serve
```

## Language Notes

The UI is in Japanese. Key terms:
- すべて = All
- 未完了 = Active/Incomplete
- 完了済み = Completed
- 追加 = Add
- 削除 = Delete
- 完了済みを削除 = Clear Completed
