import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import store from '../../js/store/index';
import './InformationCard.scss';
import { setInformation, setBounds, setFilter } from '../../js/actions';

const InformationCard = () => {
  const information = useSelector((state) => state.information);
  const [card, setCard] = useState(null);

  const handleClose = () => {
    store.dispatch(setInformation(null));
    store.dispatch(setBounds(null));
    store.dispatch(setFilter(null));
  };

  useEffect(() => {
    setCard(information);
  }, [information]);

  return (
    <div id="information-card">
      {
        card !== null
          ? (
            <>
              <h3>
                { card.road } ({ card.type === 'roadwork' ? 'Wegwerkzaamheden' : 'File' }) <FontAwesomeIcon icon={faTimes} onClick={handleClose} className="close" />
              </h3>
              <div className="info">
                <div className="row">
                  <span className="title">Van:</span>
                  <span className="value">{ card.from.label }</span>
                </div>

                <div className="row">
                  <span className="title">Tot:</span>
                  <span className="value">{ card.to.label }</span>
                </div>

                {
                card.distance
                && (
                <>
                  <div className="row">
                    <span className="title">Lengte:</span>
                    <span className="value">
                      { card.distance / 1000 } km
                    </span>
                  </div>
                </>
                )
              }

                {
                card.delay
                && (
                <>
                  <div className="row">
                    <span className="title">Vertraging:</span>
                    <span className="value">
                      { card.delay / 60 } minuten
                    </span>
                  </div>
                </>
                )
              }

                {
                card.reason
                && (
                <>
                  <div className="row">
                    <span className="title">Reden:</span>
                    <span className="value">{ card.reason }</span>
                  </div>
                </>
                )
              }
              </div>
            </>
          )
          : <h3>Geen incident geselecteerd</h3>
      }
    </div>
  );
};

export default InformationCard;
