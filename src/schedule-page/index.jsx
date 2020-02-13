import React, { useEffect, useState, useMemo } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  Fade,
  Hidden,
  MobileStepper,
  Modal,
  Paper,
  Stepper,
  StepConnector,
  StepContent,
  StepLabel,
  ThemeProvider,
  Toolbar,
  Typography,
  createMuiTheme,
  makeStyles,
  Step,
  Backdrop,
  CircularProgress,
} from '@material-ui/core';
import { blue, pink, green } from '@material-ui/core/colors';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import axios from 'axios';
import UWAPI from 'utils/uwapi';
import logo from 'res/icon.svg';
import Timetable from 'components/Timetable';

const getSchedUrl = 'https://qemn8c6rx9.execute-api.us-east-2.amazonaws.com/test/returnscheduleforrating';

const apiKey = '4ad350333dc3859b91bcf443d14e4bf0';
const uwapi = new UWAPI(apiKey, 20000);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflowY: 'hidden',
  },
  contents: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    overflowX: 'hidden',
  },
  instrModal: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  instrPaper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    outline: 'none',
    padding: theme.spacing(2),
  },
  loadingFullPage: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  mainContents: {
    flexGrow: 1,
    overflow: 'hidden',
  },
  timetableContainer: {
    // TODO: change the size
    // width: '100%',
    display: 'inline-block',
    maxWidth: '100%',
    height: '80%',
    overflow: 'auto',
    border: `2px solid ${theme.palette.divider}`,
  },
  mobileStepper: {
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  verticalStepper: {
    alignSelf: 'flex-start',
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    width: '25%',
  },
  verticalStepperButton: {
    marginRight: theme.spacing(1),
  },
  welcomeLogo: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    width: 128,
  },
}));

const spdcTheme = createMuiTheme({
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
    ternary: {
      main: green[500],
      light: '#80e27e',
      dark: '#087f23',
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
  const [classesInfo, setClassesInfo] = useState(Array(5).fill(undefined));

  useEffect(
    () => {
      const loadApiSchedules = (sched, index) => {
        const start = new Date().getTime();
        const promises = uwapi.getClassScheduleBulk(sched);
        axios.all(promises).then((values) => {
          const info = values.map((item) => item.data.data[0]);
          setClassesInfo((prevClassesInfo) => {
            const newClassesInfo = prevClassesInfo.slice();
            newClassesInfo[index] = info;
            return newClassesInfo;
          });
          console.log(info);
          console.log(new Date().getTime() - start);
        }).catch((error) => {
          console.log(error);
        });
      };

      const loadSchedules = async () => {
        try {
          const response = await axios.get(getSchedUrl, { timeout: 5000 });
          const { data } = response;
          setSchedules(data);
          data.forEach((sched, index) => loadApiSchedules(sched.schedule, index));
        } catch (error) {
          console.log(error.message);
        }
      };
      loadSchedules();
    },
    [],
  );

  const closeInstrModal = () => setInstrModalOpen(false);

  const handleBackClick = () => setSelectedSchedIndex((prevSelected) => prevSelected - 1);

  const handleNextClick = () => setSelectedSchedIndex((prevSelected) => prevSelected + 1);

  const createStep = (key, label, instr) => (
    <Step key={key}>
      <StepLabel>{label}</StepLabel>
      <StepContent>
        <Typography>{instr}</Typography>
        <Box my={2}>
          <Button
            className={classes.verticalStepperButton}
            onClick={handleBackClick}
            disabled={selectedSchedIndex === 0}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.verticalStepperButton}
            onClick={handleNextClick}
          >
            Next
          </Button>
        </Box>
      </StepContent>
    </Step>
  );

  return (
    <ThemeProvider theme={spdcTheme}>
      <CssBaseline />

      <div className={classes.root}>
        <AppBar position="static" color="primary" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6">Schedule Planner Data Collection</Typography>
          </Toolbar>
        </AppBar>

        <Backdrop open={classesInfo.some((item) => !item)} className={classes.loadingFullPage}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <Container maxWidth="xl" className={classes.contents}>
          <Hidden smDown>
            <Stepper
              activeStep={selectedSchedIndex}
              orientation="vertical"
              className={classes.verticalStepper}
              connector={<StepConnector className={classes.verticalStepConnector} />}
            >
              {schedules.map((value, index) => (
                createStep(
                  value.id,
                  `Schedule ${index + 1}`,
                  'Read the schedule and rate its timing.',
                )
              ))}
              {createStep('priceDraw', 'Enter the Price Draw')}
            </Stepper>
            <Divider orientation="vertical" />
          </Hidden>
          <Box className={classes.mainContents} p={2}>
            {/* TODO: fix padding on phones */}
            <Box className={classes.timetableContainer}>
              <Timetable schedule={classesInfo[selectedSchedIndex]} />
            </Box>
          </Box>
        </Container>

        <Hidden mdUp>
          <MobileStepper
            variant="dots"
            steps={schedules.length}
            position="bottom"
            className={classes.mobileStepper}
            activeStep={selectedSchedIndex}
            nextButton={(
              <Button size="medium" onClick={handleNextClick}>
                Next
                <KeyboardArrowRight />
              </Button>
            )}
            backButton={(
              <Button
                size="medium"
                onClick={handleBackClick}
                disabled={selectedSchedIndex === 0}
              >
                <KeyboardArrowLeft />
                Back
              </Button>
            )}
          />
        </Hidden>
      </div>

      <Modal
        open={instrModalOpen}
        onClose={closeInstrModal}
        BackdropProps={{ timeout: 500 }}
        className={classes.instrModal}
        closeAfterTransition
        disableBackdropClick
        disableEscapeKeyDown
      >
        <Fade in={instrModalOpen}>
          <Paper className={classes.instrPaper}>
            <Typography variant="h2" color="primary">Welcome!</Typography>
            <img src={logo} alt="Schedule Planner Data Collection" className={classes.welcomeLogo} />
            <Typography gutterBottom align="center">
              You will be given 5 class schedules.
              Please rate each schedule based on its timing (not the subjects).
              After that, you can enter your UWaterloo email for a chance to win a prize!
            </Typography>
            <Box mt={2} mx="auto">
              <Button variant="outlined" color="primary" onClick={closeInstrModal}>Get started</Button>
            </Box>
          </Paper>
        </Fade>
      </Modal>
    </ThemeProvider>
  );
}

export default SchedulePage;
