import React from "react";
import Checkbox from '@mui/material/Checkbox';
import s from './style.module.scss';

const FilterItem = ({ name, label, active, toggleFilter, current }) => {
   return (
      <div className={s.filter_item_container}>
         <div className={`${s.filter_item} ${active && s.active}`}>
            <Checkbox
               className={s.filter_checkbox}
               disabled={!active}
               label={label}
               name={name}
               sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
               checked={current?.includes(name)}
               onChange={(e) => {
                  toggleFilter(name, e.target.checked ? 'add' : 'remove' );
               }}
            />
            <div className={s.filter_label}>
               {label}
            </div>
         </div>
      </div>
   );
}

export { FilterItem };