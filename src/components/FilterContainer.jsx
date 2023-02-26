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
import { addFilterTypes, removeFilterType, addFilterType } from '../store/slices/filter';

import { spheresTypes } from '../dictionaries';
import { FilterItem } from "./FilterItem";
import _ from "lodash";

const FilterContainer = () => {
   const dispatch = useDispatch();
   const todos = useSelector((s) => s.todos);
   const filters = useSelector((s) => s.filter);
   const { original, current } = filters;
   console.log(filters)
   const currentTodoSpheres = useMemo(() => todos.reduce((acc, i) => {
      if (!acc.includes(i.sphere)) {
         acc.push(i.sphere);
         return acc;
      }
   }, []), [todos]);

   useEffect(() => {
      console.log('hey', currentTodoSpheres);
      dispatch(addFilterTypes(currentTodoSpheres));
   }, [currentTodoSpheres, todos, dispatch])

   const active = useCallback((type) => current?.includes(type), [current]);

   const filterTypeHandler = useCallback((type, operation) => {
      if (operation === 'add') {
         dispatch(addFilterType(type));
      }
      if (operation === 'remove') {
         dispatch(removeFilterType(type));
      }
   }, [dispatch])

   return (
      <div className={s.filter_container}>
         <div className={filter.card}>
            <div className={filter.card_header}>Filters</div>
            <div className={filter.filters}>
               {original.map((i) => (
                  <FilterItem
                     key={i}
                     name={i}
                     label={spheresTypes[i]}
                     active={active(i)}
                     toggleFilter={filterTypeHandler}
                     current={current}
                  />
               ))}
            </div>
         </div>
      </div>
   )
}

export { FilterContainer };