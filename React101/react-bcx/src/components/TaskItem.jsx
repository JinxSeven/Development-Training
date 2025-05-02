import * as React from "react";

export default function TaskItem({ title, isCompleted, id, toggleTaskStatus }) {
  function onTaskClick(taskId) {
    toggleTaskStatus(taskId);
  }

  return (
    <div
      style={{
        display: "flex",
        padding: "10px",
        flexDirection: "column",
        backgroundColor: "#C2C2C2",
        color: "#000",
        borderRadius: "10px",
        textAlign: "left"
      }}
      onClick={() => onTaskClick(id)}
    >
      <p style={{margin: "0"}}><span>{id}) </span>{title}</p>
      <p style={{margin: "0"}}>{isCompleted ? "Task completed" : "Task not completed"}</p>
    </div>
  );
}
