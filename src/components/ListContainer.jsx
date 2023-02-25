import React from "react";
import s from '../App.module.scss';
import { useSelector } from "react-redux";
const ListContainer = () => {
   const store = useSelector((store) => store.todos);
   console.log(store);
   return (
      <div className={s.list_container}>todos list</div>
   )
}

export { ListContainer };