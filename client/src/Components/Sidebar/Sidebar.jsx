import React from 'react';
import { useSelector } from 'react-redux';
import Road from './Road/Road';
import './Sidebar.scss';

const Sidebar = () => {
  const roads = useSelector((state) => state.roads);

  return (
    <aside id="sidebar">
      <h2>Verkeersinformatie</h2>
      {
        !roads ? ''
          : roads.map((road) => {
            if (road.incidents.length > 0) {
              return <Road road={road} key={road.name} />;
            }

            return null;
          })
      }
    </aside>
  );
};

export default Sidebar;
