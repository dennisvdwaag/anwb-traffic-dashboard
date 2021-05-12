import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import Sidebar from './Components/Sidebar/Sidebar';
import Loading from './Components/Loading/Loading';
import Maps from './Components/Maps/Maps';
import Filter from './Components/Filter/Filter';
import InformationCard from "./Components/Information/InformationCard";
import store from './js/store/index';
import { setRoads } from './js/actions/index';
import './App.scss';

function App() {
  const roads = useSelector(state => state.roads);
  const filter = useSelector(state => state.filter);

  useEffect(() => {
    const params = new URLSearchParams({ filter });

    fetch(`/data/get?${ params.toString() }`)
      .then(response => response.json())
      .then(data => store.dispatch(setRoads(data)));
  }, [filter]);

  return (
    <div id="app">
      {
        !roads ? <Loading /> : 
        <>
          <Sidebar />
          <Maps />
          <Filter />
          <InformationCard />
        </>
      }
    </div>
  );
}

export default App;
