import React from 'react';
import { Link } from 'react-router-dom';

export const NavBar = () => {
  return (
     <div>
        <Link to='/'>
            <button>Landing</button>
        </Link>
        <Link to='/home'>
            <button>Home</button>
        </Link>
        <Link to='/form'>
            <button>Create</button>
        </Link>

     </div>
  )
}
