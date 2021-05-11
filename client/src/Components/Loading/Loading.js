import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './Loading.scss';

const Loading = () => {
  return (
    <div id="loading">
      <h2><FontAwesomeIcon icon={ faSpinner } spin /> Laden...</h2>
    </div>
  )
}

export default Loading
