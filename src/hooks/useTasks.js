import { useState, useEffect } from 'react';

const STORAGE_KEY = 'dark-todo-tasks';

export const useTasks = () => {
  const [columns, setColumns] = useState([
    { id: 'todo', title: 'A Fazer', status: 'todo', tasks: [] },
    { id: 'doing', title: 'Fazendo', status: 'doing', tasks: [] },
    { id: 'done', title: 'Concluído', status: 'done', tasks: [] }
  ]);

  useEffect(() => {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    if (savedTasks) {
      try {
        const parsedColumns = JSON.parse(savedTasks);
        setColumns(parsedColumns);
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(columns));
  }, [columns]);

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date()
    };

    setColumns(prev => prev.map(column => 
      column.status === task.status 
        ? { ...column, tasks: [...column.tasks, newTask] }
        : column
    ));
  };

  const moveTask = (taskId, fromStatus, toStatus) => {
    if (fromStatus === toStatus) return;

    setColumns(prev => {
      const newColumns = [...prev];
      const fromColumn = newColumns.find(col => col.status === fromStatus);
      const toColumn = newColumns.find(col => col.status === toStatus);
      
      if (!fromColumn || !toColumn) return prev;

      const taskIndex = fromColumn.tasks.findIndex(task => task.id === taskId);
      if (taskIndex === -1) return prev;

      const [task] = fromColumn.tasks.splice(taskIndex, 1);
      task.status = toStatus;
      toColumn.tasks.push(task);

      return newColumns;
    });
  };

  const deleteTask = (taskId) => {
    setColumns(prev => prev.map(column => ({
      ...column,
      tasks: column.tasks.filter(task => task.id !== taskId)
    })));
  };

  const updateTask = (taskId, updatedTask) => {
    setColumns(prev => prev.map(column => ({
      ...column,
      tasks: column.tasks.map(task => 
        task.id === taskId 
          ? { ...task, ...updatedTask, id: taskId }
          : task
      )
    })));
  };

  return { columns, addTask, moveTask, deleteTask, updateTask };
};