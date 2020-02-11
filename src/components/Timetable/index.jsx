import React from 'react';
import PropTypes from 'prop-types';

function Timetable(props) {
  const { schedule } = props;

  return (
    // TODO: make the actual timetable
    <div>{JSON.stringify(schedule)}</div>
  );
}

Timetable.propTypes = {
  schedule: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Timetable;
