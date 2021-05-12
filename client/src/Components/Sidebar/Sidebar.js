import React from 'react'
import { useSelector } from 'react-redux';
import Road from './Road/Road';
import './Sidebar.scss';

const Sidebar = () => {
  const roads = useSelector(state => state.roads);

  return (
    <aside id="sidebar">
      <h2>Verkeersinformatie</h2>
      {
        !roads ? '' : 
        roads.map((road, key) => {
          if (road.incidents.length > 0) {
            return <Road road={ road } key={ key } />
          }

          return
        })
      }
    </aside>
  )
}

export default Sidebar
