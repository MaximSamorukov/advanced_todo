import React from 'react';
import s from './style.module.scss';

export const TodoItemCard = ({ item }) => {

   const { title, sphere, from, to, completed } = item;

   return (
      <div className={s.card_container}>
         <div className={s.card_body}>
            <div className={s.item}>
               <div className={s.item_name}>Title:</div>
               <div className={s.item_value}>{title}</div>
            </div>
            <div className={s.item}>
               <div className={s.item_name}>Area of life:</div>
               <div className={s.item_value}>{sphere}</div>
            </div>
            <div className={s.item}>
               <div className={s.item_name}>From:</div>
               <div className={s.item_value}>{from}</div>
            </div>
            <div className={s.item}>
               <div className={s.item_name}>To:</div>
               <div className={s.item_value}>{to}</div>
            </div>
            <div className={s.item}>
               <div className={s.item_name}>Completed</div>
               <div className={s.item_value}>{completed ? 'yes' : 'no'}</div>
            </div>
         </div>
      </div>
   )
}


