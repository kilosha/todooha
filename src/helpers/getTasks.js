const initialTasks = [
    { title: "Купить гвозди 🔨", id: "ea6abbd7-eb68-4ee0-b352-23721c84c1f2", isCompleted: true },
    { title: "Сделать домашку по React", id: "0b480ff3-64bd-42d3-9318-f728cc1d62dd", isCompleted: true },
    { title: "Защитить чек-лист", id: "bae6bb59-5c22-42f5-8f4c-1fc8d9877a5d", isCompleted: false },
    { title: "Переехать в США", id: "e7f723f0-867c-4184-bdbf-7774faea5ec5", isCompleted: false }
];

const getTasks = () => {
    const tasks = localStorage?.getItem('tasks');

    if (tasks) {
        try {
            return JSON.parse(tasks);
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    return initialTasks;
}

export { getTasks };