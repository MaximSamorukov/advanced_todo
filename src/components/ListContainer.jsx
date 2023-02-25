import React from "react";
import s from '../App.module.scss';
import { useSelector } from "react-redux";
import { TodoItemCard } from "./todoItemCard/todoItemCard";

const ListContainer = () => {
   const todos = useSelector((store) => store.todos);

   return (
      <div className={s.list_container}>
         <div className={s.list_header}>Todos list</div>
         <div className={s.list}>
            {todos.map((todo) => (<TodoItemCard item={todo} />))}
         </div>
      </div>
   )
}

export { ListContainer };