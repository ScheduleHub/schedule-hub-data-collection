import React from 'react';
import {
  Button, TextField, Typography, Grid, Link,
  Card, CardContent, CardHeader, CardMedia,
  CssBaseline, Snackbar, InputAdornment, Backdrop, createMuiTheme,
  ThemeProvider, Box, CircularProgress, Dialog, DialogActions,
  DialogContent, DialogTitle, DialogContentText,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { pink } from '@material-ui/core/colors';
import axios from 'axios';
import _ from 'lodash';
import './index.css';
import { getCourseCode } from '../utils/courses';
import logo from '../res/icon.svg';
import step1 from '../res/calendar-step-1.png';
import step2 from '../res/calendar-step-2.png';

const apiKey = 'e11fd522920fbd64cb49ecd93464e8a3';

const snackbarWarningText = 'Your course info cannot be read. Please try again and make sure the text is not modified.';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: pink[300],
      dark: '#ba2d65',
      light: '#ff94c2',
    },
  },
});

class WelcomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rawCourses: '',
      snackbarOpen: false,
      fullPageOverlayOpen: false,
      dialogOpen: false,
      questId: '',
      courseCodes: '',
      snackbarTheme: '',
      snackbarText: '',
    };
  }

  validate = (nameFromCode, originalName) => {
    const sortedUniqueNameFromCode = _.uniq(nameFromCode).sort();
    const sortedOriginalCode = originalName.sort();
    if (_.isEqual(sortedUniqueNameFromCode, sortedOriginalCode)) {
      this.setState({ dialogOpen: true });
    } else {
      console.log('original courses and courses from course code do not match');
      this.showSnackbar('warning', snackbarWarningText);
    }
  }

  loadCourseInfo = (courseCodes, courseNames) => {
    const timeout = 10000;
    this.setState({ fullPageOverlayOpen: true });
    const instance = axios.create({
      baseURL: 'https://api.uwaterloo.ca/v2/courses',
      timeout,
    });
    const promises = courseCodes.map((code) => instance.get(`/${code}/schedule.json`, {
      params: {
        key: apiKey,
      },
    }));
    axios.all(promises).then((values) => {
      const courseInfo = values.map((value) => value.data.data);
      const subjectNamsFromCourseCodes = courseInfo.map((info) => {
        const subjectName = getCourseCode(info[0]);
        return subjectName;
      });
      this.setState({ fullPageOverlayOpen: false });
      if (subjectNamsFromCourseCodes.includes(null)) {
        console.log('course not found with 4-digit course number');
        this.showSnackbar('warning', snackbarWarningText);
      } else {
        this.validate(subjectNamsFromCourseCodes, courseNames);
      }
    }).catch((error) => {
      if (error.message === `timeout of ${timeout}ms exceeded`) {
        this.showSnackbar('error', 'Network Timeout. Could be the problem of the server. Please try again later.');
      } else {
        this.showSnackbar('error', error.message);
      }
      console.log(error);
      this.setState({ fullPageOverlayOpen: false });
    });
  }

  parseCourses = (rawCourses) => {
    const classNumbers = rawCourses.match(/^\d{4}$/gm);
    const courseNames = rawCourses.match(/[A-Z]{2,6} \d{1,3}[A-Z]? - /g).map((x) => x.substring(0, x.length - 3));
    if (rawCourses.match(/^\d{3}$/gm).length !== classNumbers.length) {
      console.log("number of course numbers and catlog numbers doesn't match");
      this.showSnackbar('warning', snackbarWarningText);
      return;
    }
    this.setState({ courseCodes: classNumbers.map((x) => parseInt(x, 10)) });
    this.loadCourseInfo(classNumbers, courseNames);
  }

  showSnackbar = (snackbarTheme, snackbarText) => {
    this.setState({ snackbarTheme, snackbarText, snackbarOpen: true });
  }

  hideSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ snackbarOpen: false });
  }

  handleDialogClose = () => {
    this.hideSnackbar();
    this.setState({ dialogOpen: false, rawCourses: '' });
  }

  handleRawCoursesInputChange = (rawCourses) => {
    this.setState({ rawCourses });
  }

  handleEmailAddressChange = (val) => {
    this.setState({ questId: val });
  }

  handleSubmitClick = () => {
    const timeout = 8000;
    const { questId, courseCodes } = this.state;
    if (!questId) {
      this.showSnackbar('warning', 'Email address cannot be empty!');
      return;
    }
    this.setState({ fullPageOverlayOpen: true });
    const url = 'https://qemn8c6rx9.execute-api.us-east-2.amazonaws.com/test/handlescheduleinput';
    axios.post(
      url,
      {
        id: questId,
        sections: courseCodes,
      },
      {
        timeout,
      },
    ).then((response) => {
      console.log(response);
      this.showSnackbar('success', 'Thank you! We will notify you by email if you win the prize.');
      this.setState({ fullPageOverlayOpen: false });
    }).catch((error) => {
      if (error.message === `timeout of ${timeout}ms exceeded`) {
        this.showSnackbar('error', 'Network Timeout. Please check your internet connection.');
      } else {
        this.showSnackbar('error', error.message);
      }
      console.log(error);
      this.setState({ fullPageOverlayOpen: false });
    });
    this.handleDialogClose();
  }

  handlePaste = (rawCourses) => {
    this.hideSnackbar();
    console.log(rawCourses);
    this.setState({ rawCourses });
    try {
      this.parseCourses(rawCourses);
    } catch (error) {
      console.log(error);
      this.showSnackbar('warning', snackbarWarningText);
    }
  }

  render() {
    const {
      snackbarOpen, fullPageOverlayOpen, dialogOpen, snackbarTheme, snackbarText, rawCourses,
    } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <Box p={2} style={{ paddingRight: '55px' }}>
          <CssBaseline />
          <Snackbar
            open={snackbarOpen}
            onClose={this.hideSnackbar}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert severity={snackbarTheme} onClose={this.hideSnackbar}>
              {snackbarText}
            </Alert>
          </Snackbar>
          <img src={logo} alt="Logo" className="logo" />
          <Grid container justify="center" spacing={5} style={{ maxWidth: '1500px', margin: 'auto' }}>
            <Grid item xs={12} md={4} lg>
              <Card className="card" raised>
                <CardHeader title="Step 1" className="header" />
                <CardContent>
                  <Typography variant="body1">
                    Go to&nbsp;
                    <Link href="https://quest.pecs.uwaterloo.ca/psp/SS/ACADEMIC/SA/?cmd=login&languageCd=ENG" target="_blank">Quest</Link>
                    &nbsp;, click &quot;Class Schedule&quot;.
                  </Typography>
                </CardContent>
                <CardMedia
                  image={step1}
                  title="Go to Class Schedule"
                  className="step-img"
                />
              </Card>
            </Grid>
            <Grid item xs={12} md={4} lg>
              <Card className="card" raised style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardHeader title="Step 2" className="header" />
                <CardContent>
                  <Typography variant="body1">Choose your term, select all and copy.</Typography>
                </CardContent>
                <CardMedia
                  image={step2}
                  title="Select All and Copy"
                  className="step-img stick-bottom"
                />
              </Card>
            </Grid>
            <Grid item xs={12} md={4} lg>

              <Card className="card" raised style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardHeader title="Step 3" className="header" />
                <CardContent style={{
                  display: 'flex', flexDirection: 'column', flexGrow: 1, paddingBottom: '16px',
                }}
                >
                  <Box mb={2}>
                    <Typography variant="body1">Paste into the box below.</Typography>
                  </Box>

                  <TextField
                    style={{ flexGrow: 1 }}
                    value={rawCourses}
                    onPaste={(e) => this.handlePaste(e.clipboardData.getData('text/plain'))}
                    multiline
                    required
                    variant="outlined"
                    fullWidth
                    rows={12}
                    onChange={(e) => this.handleRawCoursesInputChange(e.target.value)}
                    InputProps={{
                      style: {
                        height: '100%',
                      },
                    }}
                    inputProps={{
                      style: {
                        height: '100%',
                      },
                    }}
                  />

                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
        <Backdrop
          style={{
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
          }}
          open={fullPageOverlayOpen}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Dialog open={dialogOpen} onClose={this.handleDialogClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Submit</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter your UWaterloo ID for a chance win a prize!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              fullWidth
              InputProps={{ endAdornment: <InputAdornment position="end">@uwaterloo.ca</InputAdornment> }}
              onChange={(e) => this.handleEmailAddressChange(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmitClick} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    );
  }
}

export default WelcomePage;
