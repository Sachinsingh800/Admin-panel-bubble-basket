import React from 'react';
import style from './Header.module.css';

import BasicPopover from '../Popover/Popover';

function Header() {
  const PageName = JSON.parse(localStorage.getItem('PageName'));
  return (
    <div className={style.headers}>
      <div className={style.header}>
        <h2>{PageName ? PageName : 'DashBoard'}</h2>
      </div>
      <div className={style.settingbtn}>
      <BasicPopover />
      </div>
     
    </div>
  );
}

export default Header;
