import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const withLogger = (WrappedComponent) => {
    return (props) => {
        const ref = useRef();
        const { tasks } = useSelector((state) => state.todos);

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
                } else if (ref.current.length + 1 === tasks.length) {
                    console.log(`Пользователь добавил новую задачу ${tasks[0].title}`);
                }
            }
            ref.current = tasks;
        }, [tasks]);

        return <WrappedComponent {...props} />;
    };
};

export default withLogger;
