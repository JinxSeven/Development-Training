import "./App.css";
import AddTask from "./components/AddTask";
import TaskItem from "./components/TaskItem";
import { useState } from "react";


function App() {
  const [taskData, addTaskData] = useState([]);
  const [taskCount, addTaskCount] = useState(1);
  
  const proceedAddingTask = (taskTitle) => {
    addTaskData((taskData) => [
      ...taskData,
      {
        title: taskTitle,
        isCompleted: false,
        id: taskCount
      }
    ]);
    addTaskCount((taskCount) => taskCount + 1);
  }

  const toggleTaskStatus = (taskId) => {
    addTaskData((taskData) => 
      taskData.map(task => 
        task.id === taskId 
          ? {...task, isCompleted: !task.isCompleted} 
          : task
      )
    );
  }

  function deleteTask(taskId) {
    addTaskData((taskData) => 
      taskData.filter(task => task.id !== taskId)
    );
  }

  return (
    <>
      <AddTask onAddTask={proceedAddingTask}></AddTask>
      <div style={
        {
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginTop: "10px"
        }
      }>
        {taskData.map((task) => (
          <TaskItem key={task.id}
            id={task.id}
            title={task.title}
            isCompleted={task.isCompleted}
            toggleTaskStatus={toggleTaskStatus}
            deleteTask={deleteTask}
          ></TaskItem>
        ))}
      </div>
    </>
  );
}

export default App;
