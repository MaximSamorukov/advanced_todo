import React, { useMemo, useEffect, useCallback } from "react";
import s from '../App.module.scss';
import filter from './styles/filter.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { addFilterTypes, updateCurrentFilter } from '../store/slices/filter';
import { getCurrentTodoTypes } from '../functions';
import { spheresTypes } from '../dictionaries';
import { FilterItem } from "./FilterItem";
import _ from "lodash";

const FilterContainer = () => {
   const dispatch = useDispatch();
   const todos = useSelector((s) => s.todos);
   const filters = useSelector((s) => s.filter);
   const { original, current } = filters;
   const currentTypes = useMemo(() => getCurrentTodoTypes(todos), [todos]);

   useEffect(() => {
      dispatch(addFilterTypes(currentTypes));
   }, [])

   const active = useCallback((type) => currentTypes?.includes(type), [currentTypes]);

   const filterTypeHandler = useCallback((type, operation) => {
      if (operation === 'add') {
         dispatch(updateCurrentFilter({ operation, type }));
      }
      if (operation === 'remove') {
         dispatch(updateCurrentFilter({ operation, type }));
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