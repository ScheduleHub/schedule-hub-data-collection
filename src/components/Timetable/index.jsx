import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Box, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
    // height: 800,
    // width: 1000,
  },
  hourHeaders: {
    '& *': {
      borderBottom: `1px solid ${theme.palette.divider}`,
      height: 64,
      padding: theme.spacing(1),
    },
    '& *:first-child': {
      borderTop: `1px solid ${theme.palette.divider}`,
    },
  },
  weekdayHeaders: {
    display: 'flex',
    '& *': {
      borderRight: `1px solid ${theme.palette.divider}`,
      padding: theme.spacing(1),
      width: 144,
    },
    '& *:first-child': {
      borderLeft: `1px solid ${theme.palette.divider}`,
      width: 96,
    },
  },
  timeColumn: {
    flexGrow: 1,
  },
  days: {
    display: 'flex',
    flexGrow: 1,
  },
  dayColumn: {
    width: 144,
  },
}));

const hours = [
  '8 am', '9 am', '10 am', '11 am',
  '12 pm', '1 pm', '2 pm', '3 pm',
  '4 pm', '5 pm', '6 pm', '7 pm',
  '8 pm', '9 pm', '10 pm',
];

const weekdays = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
];

function Timetable(props) {
  const { schedule } = props;

  const classes = useStyles();

  return (
    // TODO: make the actual timetable
    <div className={classes.root}>
      <Box className={classes.weekdayHeaders}>
        <Box />
        {weekdays.map((value) => (
          <Typography variant="subtitle2">{value}</Typography>
        ))}
      </Box>
      <Box className={classes.hourHeaders}>
        {hours.map((value) => (
          <Typography variant="subtitle2">{value}</Typography>
        ))}
      </Box>
      <Box className={classes.days}>
        <Box height="100%" width="20%" className={classes.dayColumn} style={{ backgroundColor: '#f00' }}>1</Box>
        <Box height="100%" width="20%" className={classes.dayColumn} style={{ backgroundColor: '#ff0' }}>1</Box>
        <Box height="100%" width="20%" className={classes.dayColumn} style={{ backgroundColor: '#f0f' }}>1</Box>
        <Box height="100%" width="20%" className={classes.dayColumn} style={{ backgroundColor: '#00f' }}>1</Box>
        <Box height="100%" width="20%" className={classes.dayColumn} style={{ backgroundColor: '#0f0' }}>1</Box>
      </Box>
    </div>
  );
}

Timetable.propTypes = {
  schedule: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Timetable;
