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

const useStyles = makeStyles((theme) => ({
  contents: {
    display: 'flex',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    height: '100%',
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

function SchedulePage() {
  const classes = useStyles();

  const [instrModalOpen, setInstrModalOpen] = useState(true);

  useEffect(
    () => {
      const loadSchedules = async () => {
        const url = 'https://qemn8c6rx9.execute-api.us-east-2.amazonaws.com/test/getrandomschedule';
        try {
          const response = await axios.get(url, { timeout: 5000 });
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      };
      // loadSchedules(); // TODO: uncomment this
    },
    [],
  );

  const closeInstrModal = () => setInstrModalOpen(false);

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
            value={0}
            indicatorColor="primary"
            textColor="primary"
            orientation="vertical"
            className={classes.tabs}
          >
            <Tab label="Schedule 1" />
            <Tab label="Schedule 2" />
            <Tab label="Schedule 3" />
          </Tabs>
        </Hidden>
        <Typography variant="body1">Hello, world!</Typography>
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
