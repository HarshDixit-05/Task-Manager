import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { v4 as uuidv4 } from "uuid"; // Unique IDs for tasks
import "./MyTasks.css"; 

const MyTasks = ({ tasks, setTasks }) => {
  const categories = ["To Do", "In Progress", "Completed"]; // Updated categories

  const categoryColors = {
    "To Do": "todo-header",
    "In Progress": "inprogress-header",
    "Completed": "completed-header", 
  };

  const taskColors = {
    "To Do": "todo-task",
    "In Progress": "inprogress-task",
    "Completed": "completed-task",
  };

  // Ensure every task has a unique ID
  const ensureTaskIds = (tasks) =>
    tasks.map((task) => ({
      ...task,
      id: task.id || uuidv4(), // Assign a UUID if the task doesn't have an ID
    }));

  const updatedTasks = ensureTaskIds(tasks);

  const getColumnTasks = (status) => updatedTasks.filter((task) => task.status === status);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const reorderedTasks = [...updatedTasks];

    // Find the dragged task by ID
    const movedTaskIndex = reorderedTasks.findIndex((task) => task.id === result.draggableId);
    if (movedTaskIndex === -1) return;

    const movedTask = reorderedTasks[movedTaskIndex];
    movedTask.status = destination.droppableId; // Update status
    // Remove from source and add to the new location
    reorderedTasks.splice(movedTaskIndex, 1);
    reorderedTasks.splice(destination.index, 0, movedTask);

    setTasks(reorderedTasks);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban-board">
        {categories.map((status) => (
          <Droppable key={status} droppableId={status}>
            {(provided) => (
              <div className="kanban-column" ref={provided.innerRef} {...provided.droppableProps}>
                <div className={`column-header ${categoryColors[status]}`}>{status}</div>
                <div className="task-list">
                  {getColumnTasks(status).map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`tasks-card ${taskColors[status]}`}
                        >
                          <h4>{task.title || "Untitled Task"}</h4>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default MyTasks;
