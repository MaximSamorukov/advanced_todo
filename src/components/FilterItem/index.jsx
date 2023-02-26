import React from "react";
import Checkbox from '@mui/material/Checkbox';
import s from './style.module.scss';

const FilterItem = ({ name, label, toggleFilter, current }) => {
   return (
      <div className={s.filter_item_container}>
         <div className={s.filter_item}>
         <Checkbox
            label={label}
            name={name}
            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
            checked={current?.includes(name)}
            onChange={(e) => {
               console.log(e.target.checked);
               toggleFilter(name, e.target.checked ? 'add' : 'remove' );
            }}
         />
            {label}
         </div>
      </div>
   );
}

export { FilterItem };