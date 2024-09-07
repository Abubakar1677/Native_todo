// App.js
import React from 'react';
import TodoList from './components/TodoList';

export default function App() {
  return (
    <TodoList />
  );
}


// components/TodoList.js
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import TodoItem from './TodoItem';

export default function TodoList() {
  // State Hooks
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Doctor Appointment', completed: true },
    { id: 2, text: 'Meeting at School', completed: false },
  ]);
  const [text, setText] = useState('');
  // Function to Add Task
  function addTask() {
    const newTask = { id: Date.now(), text, completed: false };
    setTasks([...tasks, newTask]);
    setText('');
  }
  // Function to Delete Task
  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }
  // Function to Toggle Task Completion
  function toggleCompleted(id) {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
  }
  // Render TodoList Component
  return (
    <View>
      {tasks.map(task => (
        <TodoItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleCompleted={toggleCompleted}
        />
      ))}
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="New Task"
      />
      <Button title="Add" onPress={addTask} />
    </View>
  );
}


// components/TodoItem.js
import React from 'react';
import { View, Text, CheckBox, Button } from 'react-native';

export default function TodoItem({ task, deleteTask, toggleCompleted }) {
  return (
    <View>
      <CheckBox
        value={task.completed}
        onValueChange={() => toggleCompleted(task.id)}
      />
      <Text style={{ textDecorationLine: task.completed ? 'line-through' : 'none' }}>
        {task.text}
      </Text>
      <Button title="X" onPress={() => deleteTask(task.id)} />
    </View>
  );
}


/* styles.css */
.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center; /* Align items vertically in the center */
  margin-bottom: 8px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.todo-item-text {
  flex: 1; /* Allow the text to take up remaining space */
  margin-right: 8px;
  color: #333;
}
.completed {
  text-decoration: line-through;
  color: #888;
}
.delete-button {
  background-color: #ff6347; /* Tomato color */
  color: #fff;
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}


// components/TodoItem.js
import React from 'react';
import { View, Text, CheckBox, TouchableOpacity } from 'react-native';
import styles from './styles'; // Import the styles

export default function TodoItem({ task, deleteTask, toggleCompleted }) {
  return (
    <View style={styles.todo-item}>
      <CheckBox
        value={task.completed}
        onValueChange={() => toggleCompleted(task.id)}
      />
      <Text style={[styles.todo-item-text, task.completed && styles.completed]}>
        {task.text}
      </Text>
      <TouchableOpacity
        style={styles.delete-button}
        onPress={() => deleteTask(task.id)}
      >
        <Text style={{ color: '#fff' }}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}