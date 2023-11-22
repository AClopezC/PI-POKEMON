
import React from 'react';
import style from './landing.module.css';
import { Link } from 'react-router-dom';

export const Landing = () => {
   return (
      <div className={style.page} >
         <h1>Welcome to Pokemon App</h1>
         <div className={style.content}>
            <label className={style.message} htmlFor="">Click aquí para acceder</label>
            <Link to='/home'>
               <button>Home</button>
            </Link>
         </div>
      </div>
   );
};
