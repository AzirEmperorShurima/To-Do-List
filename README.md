# Todo List Application

A simple, interactive Todo List application built with React, featuring drag-and-drop functionality, task filtering, searching, and local storage persistence.

## Features

- Add, remove, and toggle completion of tasks
- Drag-and-drop to reorder tasks
- Filter tasks by All, Completed, or Incomplete
- Search tasks by keyword
- Clear all completed tasks
- Persistent storage using LocalStorage
- Responsive design with Tailwind CSS
- Toast notifications for user actions
- Keyboard support (Enter key to add tasks)
- Confirmation modal for task deletion

## Technologies Used

- React 18.2.0
- Tailwind CSS 2.2.19
- React Toastify 9.1.3
- @hello-pangea/dnd 16.2.0 (Drag and Drop)
- Babel Standalone 7.22.9

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, etc.)
- No additional software installation required as all dependencies are loaded via CDN

### Installation

1. Clone or download the repository:
   ```bash
   git clone <repository-url>
   ```

2. Ensure the following files are in your project directory:
   - `index.html`
   - `TodoList.jsx`

3. Open `index.html` in a web browser:
   - You can simply double-click the `index.html` file, or
   - Serve it using a local server (e.g., Live Server extension in VS Code) for best results

### File Structure

```
├── index.html        # Main HTML file with CDN dependencies
├── TodoList.jsx      # React component for the Todo List
└── README.md         # Project documentation
```

## Usage

1. **Add a Task**:
   - Enter a task in the input field and click "Thêm" or press Enter
   - Duplicate tasks are prevented with a toast notification

2. **Toggle Task Completion**:
   - Click on a task's text to mark it as completed or incomplete

3. **Remove a Task**:
   - Click the "Xóa" button next to a task
   - Confirm deletion in the modal that appears

4. **Reorder Tasks**:
   - Drag and drop tasks to reorder them

5. **Filter Tasks**:
   - Use the dropdown menu to filter by All, Completed, or Incomplete tasks

6. **Search Tasks**:
   - Enter a keyword in the search input to filter tasks by text

7. **Clear Completed Tasks**:
   - Click the "Xóa tất cả đã hoàn thành" button to remove all completed tasks

## Notes

- Tasks are automatically saved to LocalStorage and persist across page reloads
- All dependencies are loaded via CDN, so no `node_modules` or build step is required
- The application is in Vietnamese, with all UI text and notifications in Vietnamese
- Toast notifications appear in the bottom-right corner for 2 seconds

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add your feature'`)
5. Push to the branch (`git push origin feature/your-feature`)
6. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- [React](https://reactjs.org/) for the UI library
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React Toastify](https://fkhadra.github.io/react-toastify/) for notifications
- [@hello-pangea/dnd](https://github.com/hello-pangea/dnd) for drag-and-drop functionality