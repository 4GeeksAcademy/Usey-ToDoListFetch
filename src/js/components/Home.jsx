import React from "react";
import { useState, useEffect } from "react";
import List from "./List";
import '../../styles/index.css'; 





//create your first component
const Home = () => {
	const [taskList, setTaskList] = useState([])
	const [show, setShow] = useState("all")
	const [createTask, setCreateTask] = useState("")

	const getFetch = () => {
		fetch('https://playground.4geeks.com/todo/users/usey')
			.then((results) => {
                if (!results.ok) {
                    
                    console.error("Error fetching tasks, user might not exist or API issue:", results.statusText);
                    setTaskList([]); 
                    return; 
                }
                return results.json();
            })
            .then((response) => {
                if (response && response.todos) {
                    setTaskList(response.todos);
                } else {
                    setTaskList([]); 
                }
            })
            .catch((error) => {
                console.error("Fetch failed:", error);
                setTaskList([]); 
            });
	};

	const addItem = (newItem) => {
		fetch('https://playground.4geeks.com/todo/todos/usey', {
			method: 'POST',
			body: JSON.stringify(
				{
					"label": newItem,
					"is_done": false
				}
			),
			headers: {
				'Content-type': 'application/json'
			}
		})
			.then(results => {
				if (!results.ok) throw Error(results.statusText);
				return results.json();
			})
			.then(response => getFetch())
			.catch(error => console.log(error));

	};


	return (
		<div className="page">
			<h1>To-Do List</h1>
			<div id="toDoList">
				<div id="addLine">
					<input id="inputField" type="text"
						onChange={(event) => setCreateTask(event.target.value)} value={createTask}
						onKeyUp={(event) => {
							if (event.key === "Enter") {
								if (createTask == "") { null }
								else {
									addItem(createTask);
									setCreateTask("");
								}
							}
						}} />
					<div id="addButton" className="btn btn-warning" onClick={() => {
						if (createTask == "") { null }
						else {
							addItem(createTask);
							setCreateTask("");
						}
					}}> Add </div>
				</div>

				<List taskList={taskList} show={show} setTaskList={setTaskList} getFetch={getFetch} />
				<div id="bottomLine">
					<div id="itemCounter">{taskList && taskList.length !== 0 ? `${taskList / length} items left` : "No tasks in list"}</div>
					<button id="filterBtn" type="button" className="btn btn-primary"
						onClick={() => setShow(show == "all" ? "complete" : "all")}>{show == "all" ? "Show only incomplete" : "show all"}</button>
				</div>
			</div>
		</div>
	);
};

export default Home;