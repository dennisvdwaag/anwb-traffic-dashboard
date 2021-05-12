import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarSide, faHardHat } from '@fortawesome/free-solid-svg-icons';
import './Road.scss';
import store from '../../../js/store/index';
import { setBounds, setInformation } from '../../../js/actions/index';

const Road = ({ road }) => {
  const incidents = road.incidents;

  const handleRoadClick = ev => {
    if (!ev.target.classList.contains('roadwork') && !ev.target.classList.contains('jam')) {
      ev.target.closest('.road').classList.toggle('active');
    }
  }

  const handleIncidentClick = incident => {
    store.dispatch(setBounds(incident.bounds));
    store.dispatch(setInformation(
      {
        road: incident.road ?? null,
        type: incident.type ?? null,
        from: incident.from ?? null,
        to: incident.to ?? null,
        reason: incident.reason ?? null,
        delay: incident.delay ?? null,
        distance: incident.distance ?? null
      }
    ))
  }

  return (
    <div className={`road ${ road.type }-road`} onClick={ handleRoadClick }>
      <span className="name">{ road.name }</span>
      <span className="icons">
        <div className="roadworks">
          <FontAwesomeIcon icon={ faHardHat } /> <span className="number">{ road.roadwork_amount.length ? road.roadwork_amount[0].count : 0 }</span>
        </div>
        <div className="jams">
          <FontAwesomeIcon icon={ faCarSide } /> <span className="number">{ road.jam_amount.length ? road.jam_amount[0].count : 0 }</span>
        </div>
      </span>
      <span className="quickinfo">
        {
          incidents.length ?
            incidents.map((incident, key) => {
              return <div className={ incident.type } onClick={ () => { handleIncidentClick(incident) } } key={ key }><FontAwesomeIcon icon={ incident.type === 'roadwork' ? faHardHat : faCarSide } /> Van { incident.from.label } tot { incident.to.label }</div>;
            })
          : ''
        }
      </span>
    </div>
  )
}

export default Road
