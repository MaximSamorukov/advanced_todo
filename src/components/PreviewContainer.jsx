import React, { useState, useMemo, useEffect, useCallback } from "react";
import s from '../App.module.scss';
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
import _ from "lodash";

const PreviewContainer = () => {
   const [todoObject, setTodoObject] = useState({});
   const todos = useSelector((s) => s.todos);
   const currentTodo = useSelector((s) => s.todo);

   const isThereNoChanges = useMemo(() => _.isEqual(currentTodo, todoObject), [currentTodo, todoObject]);
   const dispatch = useDispatch();

   const newTodoObject = {
      title: '',
      from: '',
      to: '',
      description: '',
      completed: false,
      sphere: '',
   };

   const editCurrentTodoFunction = useCallback((item) => dispatch(editCurrentTodo(item)), [dispatch]);

   const emptyCurrentTodoFunction = () => dispatch(emptyCurrentTodo());

   const createNewTodoObject = () => {
      setTodoObject(() => ({ ...newTodoObject, id: new Date().valueOf() }));
      editCurrentTodoFunction({ ...newTodoObject, id: new Date().valueOf() });
   };

   const toggleStatus = () => setTodoObject((prev) => ({...prev, completed: !prev.completed }));

   const editTodoHandler = (todoItem) => {
      if (todos.find((item) => item.id === todoObject.id)) {
         dispatch(editTodo(todoItem));
      } else {
         dispatch(addTodo(todoItem));
      }
      editCurrentTodoFunction(todoItem);
   }

   const removeTodoHandler = (todoId) => dispatch(removeTodo({ id: todoId }));

   const editTodoFields = ({ name, value }) => setTodoObject((prev) => ({...prev, [name]: value }));
   const onChangeField = (v) => {
      editTodoFields({
         name: v.target.name,
         value: v.target.value,
      });
   };

   useEffect(() => {
      if(!todoObject.id) {
         setTodoObject(() => ({ id: new Date().valueOf(), completed: false }));
         editCurrentTodoFunction({ id: new Date().valueOf(), completed: false });
      }
   }, [todoObject.id, editCurrentTodoFunction]);

   const validationRules = useMemo(() => ({
      title: 'required|min:7|max:40',
      sphere: 'required|not_in:SELECT',
      from: 'required',
      to: 'required',
      id: 'required',
      completed: 'boolean',
    }),[]);

   const inputsAreNotEmpty = useMemo(() => {
      return Boolean(Object.entries(todoObject).filter(([name, value]) => {
         if (name === 'id' || name === 'completed') {
            return false;
         } else {
            return Boolean(value);
         }
      }).length);
   },[todoObject]);

   const inputsAreValid = useMemo(() => validate(todoObject, validationRules), [todoObject, validationRules]);

   const spheresTypesArray = useMemo(() => {
      return Object.entries(spheresTypes).map(([value, label]) => ({ value, label }));
   }, []);

   return (
      <div className={s.preview_container}>
         <div className={preview.btns}>
            <Stack spacing={2} direction="row">
               <Button
                  disabled={!inputsAreNotEmpty}
                  variant="contained"
                  onClick={(() => removeTodoHandler(todoObject.id))}
               >
                  Удалить
               </Button>
               <Button
                  disabled={!inputsAreNotEmpty}
                  variant="contained"
                  onClick={createNewTodoObject}
               >
                  Создать
               </Button>
               <Button
                  disabled={!inputsAreValid || isThereNoChanges}
                  variant="contained"
                  onClick={(() => editTodoHandler(todoObject))}
               >
                  Сохранить
               </Button>
               <Button
                  disabled={!inputsAreValid}
                  variant="contained"
                  onClick={toggleStatus}
               >
                  {todoObject.completed ? 'Сделать невыполненным' : 'Выполнено'}
               </Button>
            </Stack>
         </div>
         <div className={preview.card}>
            <div className={preview.card_header}>{`Todo card ${inputsAreNotEmpty ? todoObject.completed ? " (Выполнено)" : " (Не выполнено)" : ''}`}</div>
            <div className={preview.card_inputs}>
               <TextField
                  required
                  className={preview.title}
                  value={todoObject.title}
                  name="title"
                  id="title"
                  label="Todo title, (min:7, max:40)"
                  variant="outlined"
                  color="secondary"
                  onChange={onChangeField}
               />
               <TextField
                  select
                  required
                  defaultValue="select"
                  className={preview.sphere}
                  label="Life area"
                  id="sphere"
                  value={todoObject.sphere || 'SELECT'}
                  name="sphere"
                  variant="outlined"
                  color="secondary"
                  onChange={onChangeField}
               >  {spheresTypesArray.map((item) => (
                     <MenuItem value={item.value}>{item.label}</MenuItem>
                  ))}
               </TextField>
            </div>

            <div className={preview.card_inputs}>
               <TextField
                  required
                  type="date"
                  label="From"
                  name="from"
                  className={preview.title}
                  value={todoObject.from}
                  onChange={onChangeField}
                  InputLabelProps={{
                     shrink: true,
                  }}
               />
               <TextField
                  required
                  type="date"
                  className={preview.sphere}
                  label="To"
                  name="to"
                  value={todoObject.to}
                  onChange={onChangeField}
                  InputLabelProps={{
                     shrink: true,
                  }}
               />
            </div>
            <div className={preview.card_inputs}>
               <TextField
                  className={preview.description}
                  id="description"
                  name="description"
                  value={todoObject.description}
                  label="Description"
                  variant="outlined"
                  color="secondary"
                  multiline
                  rows={5}
                  fullWidth
                  onChange={onChangeField}
               />
            </div>
         </div>
      </div>
   )
}

export { PreviewContainer };