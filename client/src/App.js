import React from "react";
import { useSelector } from 'react-redux';
import Sidebar from './Components/Sidebar/Sidebar';
import Loading from './Components/Loading/Loading';
import Maps from './Components/Map/Maps';
import './App.scss';

function App() {
  const roads = useSelector(state => state.roads);

  return (
    <div id="app">
      {
        !roads ? <Loading /> : 
        <>
          <Sidebar />
          <Maps />
        </>
      }
    </div>
  );
}

export default App;
