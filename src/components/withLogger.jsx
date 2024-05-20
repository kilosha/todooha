import React, { useEffect, useContext, useRef } from 'react';

import TasksContext from '../contexts/TasksContext.js';

const withLogger = (WrappedComponent) => {
    return (props) => {
        const ref = useRef();
        const { tasks } = useContext(TasksContext);

        useEffect(() => {
            if (ref.current) {
                if (ref.current.length && ref.current.length === tasks.length) {
                    ref.current.forEach((task, ind) => {
                        if (task.title !== tasks[ind].title) {
                            console.log(
                                `Пользователь изменил текст задачи с ${task.title} на ${tasks[ind].title}`,
                            );
                        } else if (task.isCompleted !== tasks[ind].isCompleted) {
                            console.log(
                                `Пользователь изменил статус задачи ${task.title} с isCompleted: ${task.isCompleted} на ${tasks[ind].isCompleted}`,
                            );
                        }
                    });
                } else if (ref.current.length > tasks.length) {
                    const deletedTaskText = ref.current.find((task, ind) => {
                        return task.id !== tasks[ind]?.id;
                    }).title;
                    console.log(`Пользователь удалил задачу ${deletedTaskText}`);
                } else if (ref.current.length && ref.current.length + 1 === tasks.length) {
                    console.log(
                        `Пользователь добавил новую задачу ${tasks[tasks.length - 1].title}`,
                    );
                } else if (ref.current.length + 1 === tasks.length) {
                    console.log(
                        `У пользователя 1 задача ${tasks[tasks.length - 1].title}`,
                    );
                }
            }
            ref.current = tasks;
        }, [tasks]);

        return <WrappedComponent {...props} />;
    };
};

export default withLogger;
