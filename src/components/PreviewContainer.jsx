import React, { useState } from "react";
import s from '../App.module.scss';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import preview from './styles/preview.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { addTodo, editTodo, removeTodo } from "../store/slices";

const PreviewContainer = () => {
   const [todoObject, setTodoObject] = useState({});
   const dispatch = useDispatch();
   const addTodoHandler = (todoItem) => dispatch(addTodo(todoItem));
   const editTodoHandler = (todoItem) => dispatch(editTodo(todoItem));
   const removeTodoHandler = (todoId) => dispatch(removeTodo({ id: todoId}));

   const editTodoFields = ({ name, value }) => setTodoObject((prev) => ({...prev, [name]: value }));
   const onChangeField = (v) => {
      editTodoFields({
         name: v.target.name,
         value: v.target.value,
      });
   };

   return (
      <div className={s.preview_container}>
         <div className={preview.btns}>
            <Stack spacing={2} direction="row">
               <Button variant="contained" onClick={(() => removeTodoHandler(todoObject.id))}>Удалить</Button>
               <Button variant="contained" onClick={(() => addTodoHandler({...todoObject, id: new Date().valueOf(), completed: false }))}>Создать</Button>
               <Button variant="contained" onClick={(() => editTodoHandler(todoObject))}>Сохранить</Button>
               <Button variant="contained" onClick={(() => editTodoHandler({...todoObject, completed: !todoObject.completed }))}>Выполнено</Button>
            </Stack>
         </div>
         <div className={preview.card}>
            <div className={preview.card_header}>{`Todo card ${todoObject.completed ? " (Completed)" : " (Not completed)"}`}</div>
            <div className={preview.card_inputs}>
               <TextField
                  className={preview.title}
                  value={todoObject.title}
                  name="todo_title"
                  id="todo_title"
                  label="Todo title"
                  variant="outlined"
                  color="secondary"
                  onChange={onChangeField}
               />
               <Select
                  className={preview.sphere}
                  id="sphere"
                  value={todoObject.sphere}
                  name="sphere"
                  variant="outlined"
                  color="secondary"
                  onChange={onChangeField}
               >
                  <MenuItem value='personal'>Личная</MenuItem>
                  <MenuItem value='business'>Бизнес</MenuItem>
                  <MenuItem value='health'>Здоровье</MenuItem>
                  <MenuItem value='family'>Семья</MenuItem>
                  <MenuItem value='sport'>Спорт</MenuItem>
               </Select>
            </div>

            <div className={preview.card_inputs}>
               <TextField
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