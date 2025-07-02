import React from "react";

const AddTask = (props) => {

    const removeTask = (id) => {
        fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: "DELETE"
        })
            .then(results => {
                if (!results.ok) throw Error(results.statusText);
                console.log(results);
                props.getFetch();
            })
            .catch(error => console.log(error));

    };

    const completeTask = (id) => {
        fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: 'PUT',
            body: JSON.stringify(
				{
					"label": props.task.label,
					"is_done": true
				}
			),
			headers: {
				'Content-type': 'application/json'
			}
		})
			.then(results => {
				if (!results.ok) throw Error(results.statusText);
				return res.json();
			})
			.then(response => props.getFetch())
			.catch(error => console.error(error));
    }
   
    return (
        <div id="item">
            <div id="label">{props.task.label}</div>
            <span id="complete" type="button" className={props.task.is_done ? "completed" : "btn btn-outline-success"} onClick={()=> {
                completeTask(props.id)
            }}>{props.task.is_done ? "completed" : "complete"}</span>
            <span className="X btn" onClick={() => {
                removeTask(props.id);
            }}>X</span>
        </div>

    )

}

export default AddTask;