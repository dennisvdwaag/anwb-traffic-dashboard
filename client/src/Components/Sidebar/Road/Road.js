import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarSide, faHardHat } from '@fortawesome/free-solid-svg-icons';
import './Road.scss';
import store from '../../../js/store/index';

const Road = ({ road }) => {
  const roadworks = road.roadworks;
  const jams = road.jams;
  let quickinfo = [];

  if (roadworks.length) {
    roadworks.forEach(roadwork => {
      const info = <div className="roadwork" onClick={ () => { handleIncidentClick(roadwork.bounds) } }><FontAwesomeIcon icon={ faHardHat } /> Van { roadwork.from.label } tot { roadwork.to.label }</div>;
      quickinfo.push(info);
    });
  }

  if (jams.length) {
    jams.forEach(jam => {
      const info = <div className="jam" onClick={ () => { handleIncidentClick(jam.bounds) } }><FontAwesomeIcon icon={ faCarSide } /> Van { jam.from.label } tot { jam.to.label }{ undefined !== jam.distance ? ` (${ jam.distance / 1000 } km)` : ''}</div>;
      quickinfo.push(info);
    });
  }

  const handleRoadClick = ev => {
    if (!ev.target.classList.contains('roadwork') && !ev.target.classList.contains('jam')) {
      ev.target.closest('.road').classList.toggle('active');
    }
  }

  const handleIncidentClick = bounds => {
    store.dispatch(window.setBounds(bounds))
  }

  return (
    <div className={`road ${ road.type }-road`} onClick={ handleRoadClick }>
      <span className="name">{ road.name }</span>
      <span className="icons">
        <div className="roadworks">
          <FontAwesomeIcon icon={ faHardHat } /> <span className="number">{ roadworks.length }</span>
        </div>
        <div className="jams">
          <FontAwesomeIcon icon={ faCarSide } /> <span className="number">{ jams.length }</span>
        </div>
      </span>
      <span className="quickinfo">
        {
          quickinfo.map(info => {
            return info;
          })
        }
      </span>
    </div>
  )
}

export default Road
