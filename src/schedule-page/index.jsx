import React, { useEffect, useState } from 'react';
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
import PreferenceSlider from 'components/PreferenceSlider';

const awsUrl = 'https://qemn8c6rx9.execute-api.us-east-2.amazonaws.com/test';
const getSchedUrl = `${awsUrl}/returnscheduleforrating`;
const submitUrl = `${awsUrl}/handleuserrating`;

const apiKey = '4ad350333dc3859b91bcf443d14e4bf0';
const uwapi = new UWAPI(apiKey, null);

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
    maxHeight: '100%',
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
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
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(2),
    },
    flexGrow: 0,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  timetableBox: {
    // TODO: change the size
    // width: '100%',
    display: 'inline-block',
    maxWidth: '100%',
    // maxHeight: '80%',
    alignSelf: 'flex-start',
    overflow: 'auto',
    border: `2px solid ${theme.palette.divider}`,
  },
  mobileStepper: {
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  verticalStepper: {
    alignSelf: 'flex-start',
  },
  verticalStepperButton: {
    marginRight: theme.spacing(1),
  },
  verticalStepperBox: {
    display: 'flex',
    backgroundColor: theme.palette.common.white,
    width: '25%',
    overflowY: 'auto',
  },
  welcomeLogo: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    width: 128,
  },
  sliderBox: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1),
    },
  },
  thankText: {
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
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
  const [firstClassSliderValues, setFirstClassSliderValues] = useState(Array(5).fill(50));
  const [evenDistSliderValues, setEvenDistSliderValues] = useState(Array(5).fill(50));
  const [clusterClassSliderValues, setClusterClassSliderValues] = useState(Array(5).fill(50));
  const [submitting, setSubmitting] = useState(false);

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
          console.log(data);
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

  const handleNextClick = (finish) => {
    if (finish) {
      setSubmitting(true);
      const data = schedules.map((value, index) => ({
        id: value.id,
        early_class: firstClassSliderValues[index] / 100,
        even_dist: evenDistSliderValues[index] / 100,
        together_class: clusterClassSliderValues[index] / 100,
      }));
      console.log(data);
      axios.post(submitUrl, data).then((value) => {
        setSelectedSchedIndex((prevSelected) => prevSelected + 1);
        setSubmitting(false);
      }).catch((error) => {
        console.log(error.message);
      });
    } else {
      setSelectedSchedIndex((prevSelected) => prevSelected + 1);
    }
  };

  const createArrayChangeHandler = (update) => ((event, value) => {
    update((prevValue) => {
      const newValue = prevValue.slice();
      newValue[selectedSchedIndex] = value;
      return newValue;
    });
  });

  const handleFirstClassSliderChange = createArrayChangeHandler(setFirstClassSliderValues);

  const handleEvenDistSliderChange = createArrayChangeHandler(setEvenDistSliderValues);

  const handleClusterClassSliderChange = createArrayChangeHandler(setClusterClassSliderValues);

  const createStep = (key, label, instr) => (
    <Step key={key}>
      <StepLabel>{label}</StepLabel>
      <StepContent>
        <Typography>{instr}</Typography>
        <Box my={2}>
          <Button
            className={classes.verticalStepperButton}
            onClick={handleBackClick}
            disabled={selectedSchedIndex === 0 || selectedSchedIndex === schedules.length}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.verticalStepperButton}
            onClick={() => handleNextClick(selectedSchedIndex + 1 >= schedules.length)}
          >
            {selectedSchedIndex + 1 >= schedules.length ? 'Finish' : 'Next'}
          </Button>
        </Box>
      </StepContent>
    </Step>
  );

  const sliderGroup = selectedSchedIndex < schedules.length && (
    <Box className={classes.sliderBox}>
      <PreferenceSlider
        label="First class"
        helpMsg="In general, do the days start early or late?"
        leftLabel="Early"
        rightLabel="Late"
        sliderValue={firstClassSliderValues[selectedSchedIndex]}
        onSliderValueChange={handleFirstClassSliderChange}
      />
      <PreferenceSlider
        label="Even Distribution"
        helpMsg="Does the schedule has approximately the same number of classes every day?"
        leftLabel="Even"
        rightLabel="Uneven"
        sliderValue={evenDistSliderValues[selectedSchedIndex]}
        onSliderValueChange={handleEvenDistSliderChange}
      />
      <PreferenceSlider
        label="Cluster Classes"
        helpMsg="Are the classes back to back or more separated from each other?"
        leftLabel="Together"
        rightLabel="Separate"
        sliderValue={clusterClassSliderValues[selectedSchedIndex]}
        onSliderValueChange={handleClusterClassSliderChange}
      />
    </Box>
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

        <Backdrop
          open={(
            submitting
            || (selectedSchedIndex < schedules.length && !classesInfo[selectedSchedIndex])
          )}
          className={classes.loadingFullPage}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Container maxWidth="xl" className={classes.contents}>
          <Hidden smDown>
            <Box className={classes.verticalStepperBox}>
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
              </Stepper>
            </Box>
            <Divider orientation="vertical" />
          </Hidden>

          {selectedSchedIndex < schedules.length ? (
            <Box className={classes.mainContents}>
              {/* TODO: fix padding on phones */}
              <Box className={classes.timetableBox}>
                <Timetable schedule={classesInfo[selectedSchedIndex]} />
              </Box>
              {sliderGroup}
            </Box>
          ) : (
            <Box className={classes.mainContents}>
              <Typography className={classes.thankText}>
                Thank you! Your ratings have been submitted.
              </Typography>
            </Box>
          )}
        </Container>

        <Hidden mdUp>
          {selectedSchedIndex < schedules.length && (
            <MobileStepper
              variant="dots"
              steps={schedules.length}
              position="static"
              className={classes.mobileStepper}
              activeStep={selectedSchedIndex}
              nextButton={(
                <Button
                  size="medium"
                  onClick={() => handleNextClick(selectedSchedIndex + 1 >= schedules.length)}
                >
                  {selectedSchedIndex + 1 === schedules.length ? 'Finish' : 'Next'}
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
          )}
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
              <Button variant="outlined" color="primary" onClick={closeInstrModal}>
                Get started
              </Button>
            </Box>
          </Paper>
        </Fade>
      </Modal>
    </ThemeProvider>
  );
}

export default SchedulePage;
