import { useState, useMemo } from "react";

enum Status {
  NONE = "NONE",
  TODO = "TODO",
  COMPLETED = "COMPLETED",
}

interface ITask {
  id: number;
  name: string;
  status: Status;
}

export const Todo = () => {
  const [taskName, setTaskName] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([
    {
      id: 1,
      name: "Hoc tieng anh",
      status: Status.NONE,
    },
  ]);
  const [currentStatus, setCurrentStatus] = useState<Status | "ALL">("ALL");

  const fiteredTasks = useMemo(() => {
    if (currentStatus === "ALL") {
      return tasks;
    }

    return tasks.filter((task: ITask) => task.status === currentStatus);
  }, [tasks, currentStatus]);

  const handleOnChangeTaskName = (event: any) => {
    const { value } = event.target;
    setTaskName(value);
  };

  const completeTask = (task: ITask) => {
    const currentTask = tasks.find((t: ITask) => t.id === task.id);
    if (!currentTask) {
      return;
    }

    currentTask.status =
      currentTask.status === Status.COMPLETED ? Status.NONE : Status.COMPLETED;

    setTasks([...tasks]);
  };

  const add = () => {
    const newTask: ITask = {
      id: new Date().getTime(),
      name: taskName,
      status: Status.NONE,
    };

    setTasks([...tasks, newTask]);
  };

  const onEnter = (event: any) => {
    if (event.code !== "Enter") {
      return;
    }

    add();
  };

  const changeCurrentStatus = (event: any) => {
    setCurrentStatus(event.target.value);
  };

  return (
    <div>
      <p>Todo app</p>

      <p>Task name</p>
      <input
        type="text"
        value={taskName}
        onChange={handleOnChangeTaskName}
        onKeyUp={onEnter}
      />
      <button onClick={add}>Add</button>

      <select
        name=""
        id=""
        value={currentStatus}
        onChange={changeCurrentStatus}
      >
        <option value="ALL">ALL</option>
        <option value={Status.NONE}>{Status.NONE}</option>
        <option value={Status.TODO}>{Status.TODO}</option>
        <option value={Status.COMPLETED}>{Status.COMPLETED}</option>
      </select>

      <ul>
        {fiteredTasks.map((task: ITask) => (
          <li
            key={task.id}
            onClick={() => completeTask(task)}
            style={{
              textDecoration:
                task.status === Status.COMPLETED ? "line-through" : "none",
            }}
          >
            {task.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
