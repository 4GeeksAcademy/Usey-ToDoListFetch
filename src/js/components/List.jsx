import React from "react";


const List = (props) => {
   

   return (
     <div className="list">
        {props.taskList.filter(task => props.show == "all" ? true : !task.is_done).map ((task, index)=> (
          <AddTask key={index} id={task.id} task={task} taskList={props.taskList} setTaskList={props.setTaskList} getFetch={props.getFetch}/>
        ))}
     </div>
   )

}
export default List;
