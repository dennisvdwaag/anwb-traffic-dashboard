import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import './InformationCard.scss';

const InformationCard = () => {
  const information = useSelector(state => state.information);
  const [card, setCard] = useState(null);

  useEffect(() => {
    setCard(information);
  }, [information]);

  return (
    <div id="information-card">
      {
        card !== null ?
          <>
            <h3>{ card.road } ({ card.type === 'roadwork' ? 'Wegwerkzaamheden' : 'File' })</h3>
            <div className="info">
              <div className="row">
                <span className="title">Van:</span>
                <span className="value">{ card.from.label }</span><br />
              </div>

              <div className="row">
                <span className="title">Tot:</span>
                <span className="value">{ card.to.label }</span><br />
              </div>

              {
                card.distance &&
                <>
                  <div className="row">
                    <span className="title">Lengte:</span>
                    <span className="value">{ card.distance / 1000 } km</span><br />
                  </div>
                </>
              }

              {
                card.delay &&
                <>
                  <div className="row">
                    <span className="title">Vertraging:</span>
                    <span className="value">{ card.delay / 60 } minuten</span><br />
                  </div>
                </>
              }

              {
                card.reason &&
                <>
                  <div className="row">
                    <span className="title">Reden:</span>
                    <span className="value">{ card.reason }</span><br />
                  </div>
                </>
              }
            </div>
          </>
        : <h3>Geen incident geselecteerd</h3>
      }
    </div>
  )
}

export default InformationCard
