import React, { useState, useMemo, useEffect, useCallback } from "react";
import s from '../App.module.scss';
import filter from './styles/filter.module.scss';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import preview from './styles/preview.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { addTodo, editTodo, removeTodo } from "../store/slices/todos";
import { emptyCurrentTodo, editCurrentTodo } from "../store/slices/todo";
import { validate } from "../functions";
import { spheresTypes } from '../dictionaries';
import { FilterItem } from "./FilterItem";
import _ from "lodash";
import { createFilterOptions } from "@mui/material";

const FilterContainer = () => {
   const [todoObject, setTodoObject] = useState({});
   const todos = useSelector((s) => s.todos);
   const currentTodo = useSelector((s) => s.todo);



   return (
      <div className={s.filter_container}>
         <div className={filter.card}>
            <div className={filter.card_header}>Filters</div>
            <div className={filter.filters}>
               {todos.map((i) => (<FilterItem />))}
            </div>
         </div>
      </div>
   )
}

export { FilterContainer };