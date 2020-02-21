import React from 'react';
import { Link } from 'react-router-dom';
export default function Header(props) {

  return (
    <header>
      <h1>Feed Viewer</h1>
      <nav>
        <Link to="/pips">Pips</Link>
        {/* <Link to="/about">About</Link> */}
      </nav>
    </header>
  )
}

