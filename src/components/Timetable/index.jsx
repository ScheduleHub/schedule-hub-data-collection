import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Box, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'table',
    height: '100%',
    width: '100%',
  },
  weekdayRow: {
    display: 'table-row',
    '& > *': {
      display: 'table-cell',
      position: 'sticky',
      top: 0,
      zIndex: 3,
      backgroundColor: theme.palette.primary.light,
      borderTop: `1px solid ${theme.palette.divider}`,
      borderBottom: `1px solid ${theme.palette.divider}`,
      borderRight: `1px solid ${theme.palette.divider}`,
      padding: theme.spacing(1),
      width: 144,
      minWidth: 144,
    },
    '& > *:first-child': {
      left: 0,
      zIndex: 4,
      backgroundColor: theme.palette.secondary.main,
      borderLeft: `1px solid ${theme.palette.divider}`,
      width: 96,
      minWidth: 96,
    },
  },
  scheduleRow: {
    display: 'table-row',
    '& > *': {
      display: 'table-cell',
      borderBottom: `1px solid ${theme.palette.divider}`
    },
  },
  timeColumn: {
    position: 'sticky',
    left: 0,
    zIndex: 2,
    backgroundColor: theme.palette.primary.light,
    borderLeft: `1px solid ${theme.palette.divider}`,
    borderRight: `1px solid ${theme.palette.divider}`,
    width: 96,
    minWidth: 96,
    '& > *': {
      padding: theme.spacing(1),
    },
  },
  dayColumn: {
    width: 144,
    minWidth: 144,
    borderRight: `1px solid ${theme.palette.divider}`,
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
      <Box className={classes.weekdayRow}>
        <Box />
        {weekdays.map((value) => (
          <Typography variant="subtitle2">{value}</Typography>
        ))}
      </Box>
      <Box className={classes.scheduleRow}>
        <Box className={classes.timeColumn}>
          {hours.map((value) => (
            <Typography variant="subtitle2">{value}</Typography>
          ))}
        </Box>
        {weekdays.map((value) => (
          <Box className={classes.dayColumn}>{value}</Box>
        ))}
      </Box>
    </div>
  );
}

Timetable.propTypes = {
  schedule: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Timetable;
