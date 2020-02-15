import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  Popover,
  Slider,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { HelpOutline } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  helpText: {
    whiteSpace: 'pre',
  },
  paper: {
    padding: theme.spacing(1),
  },
  popover: {
    pointerEvents: 'none',
  },
  preferenceHeader: {
    color: '#666666',
  },
}));

const propTypes = {
  label: PropTypes.string.isRequired,
  helpMsg: PropTypes.string.isRequired,
  leftLabel: PropTypes.string.isRequired,
  rightLabel: PropTypes.string.isRequired,
  sliderValue: PropTypes.number.isRequired,
  onSliderValueChange: PropTypes.func.isRequired,
};

function PreferenceSlider(props) {
  const {
    label, helpMsg, leftLabel, rightLabel, sliderValue, onSliderValueChange,
  } = props;

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box>
      <Typography
        component="span"
        gutterBottom
        className={classes.preferenceHeader}
      >
        <Box display="inline" fontWeight="fontWeightMedium">{`${label} `}</Box>
        <Typography
          display="inline"
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        >
          <HelpOutline
            color="action"
            fontSize="small"
          />
        </Typography>
        <Popover
          id="mouse-over-popover"
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography style={{ whiteSpace: 'pre' }}>{helpMsg}</Typography>
        </Popover>
      </Typography>
      <Grid container spacing={1}>
        <Grid item>
          <Typography color="textSecondary">{leftLabel}</Typography>
        </Grid>
        <Grid item xs>
          <Slider
            display="inline"
            value={sliderValue}
            onChange={onSliderValueChange}
          />
        </Grid>
        <Grid item>
          <Typography color="textSecondary">{rightLabel}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

PreferenceSlider.propTypes = propTypes;

export default PreferenceSlider;
