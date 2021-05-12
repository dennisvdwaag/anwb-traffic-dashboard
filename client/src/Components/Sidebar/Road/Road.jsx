import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarSide, faHardHat } from '@fortawesome/free-solid-svg-icons';
import './Road.scss';
import store from '../../../js/store/index';
import { setBounds, setInformation } from '../../../js/actions/index';

const Road = ({ road }) => {
  const { incidents } = road;

  const handleRoadClick = (ev) => {
    if (!ev.target.classList.contains('roadwork') && !ev.target.classList.contains('jam')) {
      ev.target.closest('.road').classList.toggle('active');
    }
  };

  const handleIncidentClick = ({
    road: name,
    bounds,
    type,
    from,
    to,
    reason,
    delay,
    distance,
  }) => {
    store.dispatch(setBounds(bounds));
    store.dispatch(setInformation(
      {
        road: name ?? null,
        type: type ?? null,
        from: from ?? null,
        to: to ?? null,
        reason: reason ?? null,
        delay: delay ?? null,
        distance: distance ?? null,
      },
    ));
  };

  return (
    <div className={`road ${road.type}-road`} onClick={handleRoadClick} aria-hidden="true">
      <span className="name">{ road.name }</span>
      <span className="icons">
        <div className="roadworks">
          <FontAwesomeIcon icon={faHardHat} /> <span className="number">{ road.roadwork_amount.length ? road.roadwork_amount[0].count : 0 }</span>
        </div>
        <div className="jams">
          <FontAwesomeIcon icon={faCarSide} /> <span className="number">{ road.jam_amount.length ? road.jam_amount[0].count : 0 }</span>
        </div>
      </span>
      <span className="quickinfo">
        {
          incidents.length
            ? incidents.map((incident) => (
              <div className={incident.type} onClick={() => { handleIncidentClick(incident); }} key={road.extid} aria-hidden="true">
                <FontAwesomeIcon icon={incident.type === 'roadwork' ? faHardHat : faCarSide} /> Van { incident.from.label } tot { incident.to.label }
              </div>
            ))
            : ''
        }
      </span>
    </div>
  );
};

export default Road;
