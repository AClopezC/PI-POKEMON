import React from 'react';
import style from './landing.module.css';
import { Link } from 'react-router-dom';

export const Landing = () => {
   return (
      <div className={style.page} >
         <h1>Welcome to Pokemon App</h1>
         <Link to='/home'>
            <button>Home</button>
         </Link>
      </div>
   )
};
