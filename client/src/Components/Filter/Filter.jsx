import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import nl from 'date-fns/locale/nl';
import store from '../../js/store/index';
import { setFilter, setBounds, setInformation } from '../../js/actions/index';
import 'react-datepicker/dist/react-datepicker.css';
import './Filter.scss';

registerLocale('nl', nl);

const Filter = () => {
  const [startDate, setStartDate] = useState(new Date());
  const today = new Date();

  const handleOnChange = (date) => {
    setStartDate(date);

    store.dispatch(setFilter(date));
    store.dispatch(setBounds(null));
    store.dispatch(setInformation(null));
  };

  return (
    <div id="filter">
      <h2>Filter op datum en tijd</h2>

      <DatePicker
        selected={startDate}
        onChange={handleOnChange}
        showTimeSelect
        dateFormat="d MMMM, yyyy HH:mm"
        locale="nl"
        maxDate={today}
        isClearable
      />
    </div>
  );
};

export default Filter;
