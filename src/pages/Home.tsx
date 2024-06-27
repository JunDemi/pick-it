import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
   <div>
    <Link to='/create-game'>게임생성</Link>
   </div>
  );
}

export default Home;
