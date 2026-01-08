class TodoApp {
    constructor() {
        this.todos = this.loadTodos();
        this.currentFilter = 'all';
        this.initElements();
        this.attachEventListeners();
        this.render();
    }

    initElements() {
        this.todoInput = document.getElementById('todoInput');
        this.addBtn = document.getElementById('addBtn');
        this.todoList = document.getElementById('todoList');
        this.todoCount = document.getElementById('todoCount');
        this.clearCompletedBtn = document.getElementById('clearCompleted');
        this.filterBtns = document.querySelectorAll('.filter-btn');
    }

    attachEventListeners() {
        this.addBtn.addEventListener('click', () => this.addTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });
        this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.setFilter(e.target.dataset.filter));
        });
    }

    loadTodos() {
        const saved = localStorage.getItem('todos');
        return saved ? JSON.parse(saved) : [];
    }

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    addTodo() {
        const text = this.todoInput.value.trim();
        if (text === '') {
            this.todoInput.focus();
            return;
        }

        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.todos.unshift(todo);
        this.todoInput.value = '';
        this.saveTodos();
        this.render();
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.render();
        }
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.saveTodos();
        this.render();
    }

    clearCompleted() {
        this.todos = this.todos.filter(t => !t.completed);
        this.saveTodos();
        this.render();
    }

    setFilter(filter) {
        this.currentFilter = filter;
        this.filterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        this.render();
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(t => !t.completed);
            case 'completed':
                return this.todos.filter(t => t.completed);
            default:
                return this.todos;
        }
    }

    render() {
        const filteredTodos = this.getFilteredTodos();
        this.todoList.innerHTML = '';

        if (filteredTodos.length === 0) {
            const emptyState = document.createElement('li');
            emptyState.className = 'empty-state';
            emptyState.textContent = this.todos.length === 0
                ? 'タスクがありません。新しいタスクを追加しましょう！'
                : 'このフィルターに該当するタスクがありません。';
            this.todoList.appendChild(emptyState);
        } else {
            filteredTodos.forEach(todo => {
                const li = document.createElement('li');
                li.className = `todo-item ${todo.completed ? 'completed' : ''}`;

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.className = 'todo-checkbox';
                checkbox.checked = todo.completed;
                checkbox.addEventListener('change', () => this.toggleTodo(todo.id));

                const text = document.createElement('span');
                text.className = 'todo-text';
                text.textContent = todo.text;

                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'delete-btn';
                deleteBtn.textContent = '削除';
                deleteBtn.addEventListener('click', () => this.deleteTodo(todo.id));

                li.appendChild(checkbox);
                li.appendChild(text);
                li.appendChild(deleteBtn);
                this.todoList.appendChild(li);
            });
        }

        this.updateStats();
    }

    updateStats() {
        const activeCount = this.todos.filter(t => !t.completed).length;
        this.todoCount.textContent = `${activeCount}件のタスク`;

        const completedCount = this.todos.filter(t => t.completed).length;
        this.clearCompletedBtn.style.display = completedCount > 0 ? 'block' : 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});
