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
  Tab,
  Tabs,
  ThemeProvider,
  Toolbar,
  Typography,
  createMuiTheme,
  makeStyles,
  withStyles,
  Step,
} from '@material-ui/core';
import { blue, pink } from '@material-ui/core/colors';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import axios from 'axios';
import logo from 'res/icon.svg';
import Timetable from 'components/Timetable';

const getSchedUrl = 'https://qemn8c6rx9.execute-api.us-east-2.amazonaws.com/test/returnscheduleforrating';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  contents: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    overflowX: 'auto',
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
  mobileStepper: {
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  verticalStepper: {
    alignSelf: 'flex-start',
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    width: '20%',
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
      // loadSchedules(); // TODO: use actual data instead of dummy ones
      setSchedules([
        { id: 'bef6dffb-6970-4176-964c-b3e99aeb9416', schedule: [5831, 6504, 6035, 5839, 5972, 6036, 6261, 6217, 5964, 6950, 7103, 3618] },
        { id: 'cb38c4c7-9067-4279-901f-7b432646db48', schedule: [6116, 6504, 6035, 5838, 5972, 6036, 6343, 6344, 6029, 5924, 6006, 5964, 6999, 7003, 7116] },
        { id: '2b41a5a7-4988-481d-b70c-329ceb2e8a64', schedule: [5834, 6504, 6035, 5841, 6400, 6232, 5914, 6111, 5964, 6950, 7103, 3638] },
        { id: '87786969-605a-468c-801d-400a017bd5f2', schedule: [5831, 6504, 6035, 5971, 5972, 6036, 6214, 6111, 5964, 6950, 7103, 3639] },
        { id: '8c7f1356-d228-436d-a0f2-a25d9efd501d', schedule: [5829, 6504, 6035, 5837, 5972, 6036, 6343, 5760, 6029, 5914, 6005, 5964, 6998, 7000, 7116] },
      ]);
    },
    [],
  );

  const closeInstrModal = () => setInstrModalOpen(false);


  const handelTabChange = (_event, newValue) => setSelectedSchedIndex(newValue);

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
          {/* <Hidden smUp>
            <HorizontalTabs
            value={selectedSchedIndex}
            onChange={handelTabChange}
            variant="scrollable"
            scrollButtons="auto"
            className={classes.horizontalTabs}
            >
            {createSchedTabs()}
            </HorizontalTabs>
          </Hidden> */}
        </AppBar>

        <Container maxWidth="xl" className={classes.contents}>
          <div className={classes.contents}>
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

            <Box p={2}>
              {schedules.map((value, index) => (selectedSchedIndex === index && (
                <Timetable key={value.id} schedule={value.schedule} />
              )))}
            </Box>

          </div>
        </Container>

        <Hidden mdUp>
          <MobileStepper
            variant="dots"
            steps={schedules.length}
            position="bottom"
            className={classes.mobileStepper}
            activeStep={selectedSchedIndex}
            nextButton={(
              <Button size="medium">
                Next
                <KeyboardArrowRight />
              </Button>
            )}
            backButton={(
              <Button size="medium">
                <KeyboardArrowLeft />
                Back
              </Button>
            )}
          />
        </Hidden>
      </div>

      <Modal
        open={instrModalOpen && false}
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
