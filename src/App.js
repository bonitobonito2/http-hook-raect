import React, { useEffect, useState, useCallback } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import HttpHook from './Hooks/HttpHook';
function App() {
  const [tasks, setTasks] = useState([]);
   const data = HttpHook() 
   const {isLoading, error, sendRequest}  = data
  
  useEffect(() => {
    const  transpormTasks = tasksObj => {
      const loadedTasks = [];
      
      for (const taskKey in tasksObj) {
        loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
      }
      setTasks(loadedTasks);
    }
     sendRequest({url: 'https://react-4f330-default-rtdb.firebaseio.com/tasks.json',},transpormTasks)
  }, [sendRequest]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={sendRequest}
      />
    </React.Fragment>
  );
}

export default App;
