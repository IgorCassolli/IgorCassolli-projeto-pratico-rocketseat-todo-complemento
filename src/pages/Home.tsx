import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask = tasks.find(task => task.title === newTaskTitle);

    if(newTask){
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome.",
        [
          { text: "OK", style: "cancel"}
        ]
      );
    } else {
      const newTask = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
      }
      setTasks(oldTasks => [...oldTasks, newTask]);
    }
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }))
    
    const updateTask = updatedTasks.find(task => task.id === id);
   
    if(!updateTask){
      return;
    }
  
    updateTask.done = !updateTask.done;
    setTasks(updatedTasks);    
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        { text: "NÃO", style: "cancel"},
        {
          text: "SIM",
          onPress: () => 
            setTasks(oldTasks => oldTasks.filter(
              tasks => tasks.id !== id
            ))
        },
      ]
    ); 
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})