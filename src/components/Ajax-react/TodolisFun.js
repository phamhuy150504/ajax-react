import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Todolist.css'
export default function TodolisFun() {
    const [taskList, setTasList] = useState({
        taskListMap: [],
        values: {
            taskName: ''
        },
        errors: {
            taskName: ''
        }
    })

    useEffect(() =>{
        getTasList();

        return () => {

        }
    }, [])

    const getTasList = () => {
       axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
            method: 'GET'
        }).then(result => {
            // if call API given success => SetState component
            setTasList({
                ...taskList, taskListMap: result.data
            })
        }).catch(err => {
            console.log(err.response.data);
        })
    }
    const handleChangeInPut = (event) => {
        const {value, name} = event.target
        let cloneValueInput = {...taskList.values}

        cloneValueInput = {...cloneValueInput, [name]: value}

        let cloneErrInput = {...taskList.erros}

        let regexString = /^[a-z A-Z]+$/;

        if(!regexString.test(value)) {
            cloneErrInput[name] = name + ' ivalid !'
        } else {
            cloneErrInput[name] = ''
        }

        setTasList({
            ...taskList,
            values: cloneValueInput,
            errors: cloneErrInput
        })

    }

    
    const addTask = (e) => {
        e.preventDefault();

        axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
            method: 'POST',
            data: {taskName: taskList.values.taskName}
        }).then(resolve => {
            getTasList();
        }).catch(err =>{
            console.log(err);
        })
    }

    const delTask = (taskName) => {
        console.log(taskName);
        axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE'
        }).then(resolve => {
            console.log(resolve.data);
            getTasList()
        }).catch(err => console.log(err))
    }


    const checkTask = (taskName) => {
        axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
        }).then(resolve => {
            getTasList()
        }).catch(err => console.log(err))
    }

    const rejectTask = (taskName) =>{
        axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: 'PUT'
        }).then(resolve => {
            getTasList()
        }).catch(err => console.log(err))
    }

    const renderTaskToDo = () => {
        return taskList.taskListMap.filter(item => !item.status).map((item, index) => {
            return (
            <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button type='button' className="remove" onClick={()=> delTask(item.taskName)} >
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button  type='button' className="complete" onClick={() => checkTask(item.taskName)}>
                        <i className="far fa-check-circle" />
                        <i className="fas fa-check-circle" />
                    </button>
                </div>
            </li>
            )
        })
    }
    const renderToDoDone = () => {
        return taskList.taskListMap.filter(item => item.status).map((item, index) => {
            return (
                <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button type='button' className="remove"  onClick={()=> delTask(item.taskName)} >
                        <i className="fa fa-trash-alt" /> 
                    </button>
                    <button type='button' className="complete" onClick={() =>rejectTask(item.taskName)} >
                        <i className="far fa-undo" />
                        <i className="fas fa-undo" />
                    </button>
                </div>
            </li>
            )
        })
    }
    
    let checkSubmit = ''
    taskList.errors.taskName !== '' ? checkSubmit = true : checkSubmit = false
    
    return (
        <div>
           
            <div className="card">
                <div className="card__header">
                    <img src={require('./bg.png')} />
                </div>
                {/* <h2>hello!</h2> */}
                <form onSubmit={addTask}  className="card__body" disabled={checkSubmit}>
                    <div className="card__content">
                        <div className="card__title">
                            <h2>My Tasks</h2>
                            <p>September 9,2020</p>
                        </div>
                        <div className="card__add">
                            <input onChange={handleChangeInPut} value={taskList.values.taskName} name='taskName'  id="newTask" type="text" placeholder="Enter an activity..." />
                            <button id="addItem" onSubmit={addTask} disabled={checkSubmit}>  
                                <i className="fa fa-plus" />
                            </button>
                        </div>
                        <p className='text-danger'>{taskList.errors.taskName}</p>
                        <div className="card__todo">
                            Uncompleted tasks
                            <ul className="todo" id="todo">
                                {renderTaskToDo()}
                            </ul>
                            {/* Completed tasks */}
                            <ul className="todo" id="completed">
                                {renderToDoDone()}
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}