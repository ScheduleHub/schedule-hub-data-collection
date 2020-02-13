import React from 'react';
import PropTypes from 'prop-types';
import {
  Box, Typography, Paper, makeStyles,
} from '@material-ui/core';

const hourHeight = 64;
const blockWidth = 144;

const timeStringToNum = (timeStr) => {
  const [h, m] = timeStr.split(':');
  return h * 6 + m / 10;
};

const useStyles = makeStyles((theme) => ({
  paper: (props) => ({
    display: 'flex',
    height: '100%',
    padding: theme.spacing(0.5),
    border: `1px solid ${props.blockInfo.sectionNum.startsWith('0') ? theme.palette.secondary.main : theme.palette.ternary.main}`,
  }),
}));

const propTypes = {
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  blockInfo: PropTypes.shape({ courseCode: PropTypes.string.isRequired }).isRequired,
};

function TimeBlock(props) {
  const classes = useStyles(props);

  const { startTime, endTime, blockInfo } = props;
  const { courseCode, sectionType, sectionNum } = blockInfo;

  const start = timeStringToNum(startTime);
  const end = timeStringToNum(endTime);
  const duration = end - start;

  return (
    <Box
      height={duration * (hourHeight / 6)}
      width={blockWidth}
      position="absolute"
      top={(start - timeStringToNum('8:00')) * (hourHeight / 6)}
    >
      <Paper variant="outlined" className={classes.paper}>
        <Box flexGrow={1}>
          <Typography variant="body2" display="block">
            {courseCode}
          </Typography>
          <Typography variant="caption" display="block">
            {`${startTime}-${endTime}`}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" display="block" style={{ textAlign: 'right', whiteSpace: 'pre', lineHeight: '1.2' }}>
            {`${sectionType}\n${sectionNum}`}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

TimeBlock.propTypes = propTypes;

export default TimeBlock;
