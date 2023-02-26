import React from "react";
import s from './style.module.scss';

const FilterItem = () => {
   return (
      <div className={s.filter_item_container}>
         <div className={s.filter_item}>
            filter item
         </div>
      </div>
   )
}

export { FilterItem };