import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles, Box, Typography, Backdrop,
} from '@material-ui/core';
import { parseTime } from 'utils/courses';
import TimeBlock from './TimeBlock';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'table',
    // height: '100%',
    // width: '100%',
  },
  weekdayRow: {
    display: 'table-row',
    '& > *': {
      display: 'table-cell',
      position: 'sticky',
      top: 0,
      zIndex: 3,
      backgroundColor: theme.palette.background.paper,
      borderTop: `1px solid ${theme.palette.divider}`,
      borderBottom: `1px solid ${theme.palette.divider}`,
      borderRight: `1px solid ${theme.palette.divider}`,
      padding: theme.spacing(1),
      width: 144,
      minWidth: 144,
      maxWidth: 144,
    },
    '& > *:first-child': {
      left: 0,
      zIndex: 4,
      borderLeft: `1px solid ${theme.palette.divider}`,
      width: 96,
      minWidth: 96,
    },
  },
  scheduleRow: {
    display: 'table-row',
    '& > *': {
      display: 'table-cell',
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  },
  timeColumn: {
    position: 'sticky',
    left: 0,
    zIndex: 2,
    backgroundColor: theme.palette.background.paper,
    borderLeft: `1px solid ${theme.palette.divider}`,
    borderRight: `1px solid ${theme.palette.divider}`,
    width: 96,
    minWidth: 96,
    '& > *': {
      height: 64,
      padding: theme.spacing(1),
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  },
  dayColumn: {
    width: 144,
    minWidth: 144,
    maxWidth: 144,
    borderRight: `1px solid ${theme.palette.divider}`,
    position: 'relative',
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
const shortWeekdays = ['M', 'T', 'W', 'Th', 'F'];

function Timetable(props) {
  const classes = useStyles();
  
  const { schedule } = props;

  const blocks = (schedule || []).map(parseTime).flat();
  console.log(blocks);

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
        {shortWeekdays.map((day) => (
          <Box className={classes.dayColumn}>
            {blocks.filter((b) => b.day === day).map((b) => (
              <TimeBlock startTime={b.startTime} endTime={b.endTime} blockInfo={b.blockInfo} />
            ))}
          </Box>
        ))}
      </Box>
    </div>
  );
}

Timetable.propTypes = {
  schedule: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default Timetable;
