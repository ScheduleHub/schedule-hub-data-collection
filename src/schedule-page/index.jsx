import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Button,
  CssBaseline,
  Fade,
  Hidden,
  Modal,
  Paper,
  Tab,
  Tabs,
  ThemeProvider,
  Toolbar,
  Typography,
  createMuiTheme,
  makeStyles,
} from '@material-ui/core';
import { blue, pink } from '@material-ui/core/colors';
import axios from 'axios';

const getSchedUrl = 'https://qemn8c6rx9.execute-api.us-east-2.amazonaws.com/test/returnscheduleforrating';

const useStyles = makeStyles((theme) => ({
  contents: {
    display: 'flex',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    flexShrink: 0,
    height: '100%',
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: pink[300],
      dark: '#ba2d65',
      light: '#ff94c2',
    },
    secondary: {
      main: blue[500],
      light: '#6ec6ff',
      dark: '#0069c0',
    },
  },
});

/*
0   terrible
20  bad
40  below average
60  above average
80  good
100 excellent
*/

function SchedulePage() {
  const classes = useStyles();

  // UI states
  const [instrModalOpen, setInstrModalOpen] = useState(true);
  const [selectedSchedIndex, setSelectedSchedIndex] = useState(0);

  // Data states
  const [schedules, setSchedules] = useState([]);

  useEffect(
    () => {
      const loadSchedules = async () => {
        try {
          const response = await axios.get(getSchedUrl, { timeout: 5000 });
          setSchedules(response.data);
        } catch (error) {
          console.log(error.message);
        }
      };
      // loadSchedules(); // TODO: uncomment this
    },
    [],
  );

  const closeInstrModal = () => setInstrModalOpen(false);

  const handelTabChange = (_event, newValue) => setSelectedSchedIndex(newValue);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="primary" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6">
            Schedule Planner Data Collection
          </Typography>
        </Toolbar>
      </AppBar>

      <div className={classes.contents}>
        <Hidden xsDown>
          {/* TODO: make horizontal Tabs in AppBar for xs */}
          <Tabs
            value={selectedSchedIndex}
            onChange={handelTabChange}
            indicatorColor="primary"
            textColor="primary"
            orientation="vertical"
            className={classes.tabs}
          >
            {schedules.map((_value, index) => (
              <Tab label={`Schedule ${index + 1}`} />
            ))}
          </Tabs>
        </Hidden>
        <Typography variant="body1">{JSON.stringify(schedules)}</Typography>
      </div>

      <Modal
        open={instrModalOpen}
        onClose={closeInstrModal}
        BackdropProps={{ timeout: 500 }}
        closeAfterTransition
        disableBackdropClick
        disableEscapeKeyDown
      >
        <Fade in={instrModalOpen}>
          <Paper>
            Welcome
            <Button onClick={closeInstrModal}>Get started</Button>
          </Paper>
        </Fade>
      </Modal>
    </ThemeProvider>
  );
}

export default SchedulePage;
