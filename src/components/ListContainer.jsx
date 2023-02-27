import React from "react";
import s from '../App.module.scss';
import { useSelector } from "react-redux";
import { TodoItemCard } from "./todoItemCard/todoItemCard";

const ListContainer = () => {
   const todos = useSelector((store) => store.todos);
   const filters = useSelector((s) => s.filter);
   const { current } = filters;
   return (
      <div className={s.list_container}>
         <div className={s.list_header}>Todos list</div>
         <div className={s.list}>
            {todos.filter((i) => current.includes(i.sphere)).map((todo) => (<TodoItemCard item={todo} />))}
         </div>
      </div>
   )
}

export { ListContainer };