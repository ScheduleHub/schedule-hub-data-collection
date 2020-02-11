import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    // height: 800,
    width: 1000,
  },
  timeColumn: {
    flexGrow: 1,
  },
  days: {
    display: 'flex',
    flexGrow: 1,
  },
  dayColumn: {
    width: '20%',
  },
}));

function Timetable(props) {
  const { schedule } = props;

  const classes = useStyles();

  const times = ['', '8 am', '9 am', '10 am', '11 am', '12 pm', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm', '7 pm', '8 pm', '9 pm', '10 pm'];

  return (
    // TODO: make the actual timetable
    <div className={classes.root}>
      <Box style={{ backgroundColor: '#0ff' }}>
        {times.map((value) => (
          <Box p={2}>{value}</Box>
        ))}
      </Box>
      <Box className={classes.days} style={{ backgroundColor: '#f00' }}>
        <Box height="100%" width="20%" classes={classes.dayColumn} style={{ backgroundColor: '#f00' }}>1</Box>
        <Box height="100%" width="20%" classes={classes.dayColumn} style={{ backgroundColor: '#ff0' }}>1</Box>
        <Box height="100%" width="20%" classes={classes.dayColumn} style={{ backgroundColor: '#f0f' }}>1</Box>
        <Box height="100%" width="20%" classes={classes.dayColumn} style={{ backgroundColor: '#00f' }}>1</Box>
        <Box height="100%" width="20%" classes={classes.dayColumn} style={{ backgroundColor: '#0f0' }}>1</Box>
      </Box>
    </div>
  );
}

Timetable.propTypes = {
  schedule: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Timetable;
