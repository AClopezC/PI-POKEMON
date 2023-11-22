import React from 'react';
import { Link } from 'react-router-dom';
import style from './navBar.module.css';

export const NavBar = () => {
  return (
     <div className={style.NavBar}>
        <Link to='/'>
           <button className={style.button}>Landing</button>
        </Link>
        <Link to='/home'>
            <button className={style.button}>Home</button>
        </Link>
        <Link to='/form'>
            <button className={style.button}>Create</button>
        </Link>

     </div>
  )
}
