import { useState, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SnackbarHandlerContext } from './contexts/SnackbarHandlerContext';
import { SnackbarContext } from './contexts/SnackbarContext';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { OnDemand } from './pages/onDemand';
import { Test } from './pages/test';

const theme = createTheme({
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h2',
          h2: 'h2',
          h3: 'h2',
          h4: 'h2',
          h5: 'h2',
          h6: 'h2',
          subtitle1: 'span',
          subtitle2: 'h2',
          body1: 'span',
          body2: 'span',
        },
      },
    },
  },
  palette: {
    primary: {
      light: '#AA00FF',
      main: '#9300DD',
      dark: '#AA00FF',
      contrastText: '#fff',
    },
    white: {
      main: '#fff',
    },
    secondary: {
      main: '#7c4dff',
    },
    warn: {
      main: '#4fc3f7',
    },
    cubee: {
      main: '#FDDB00',
      // main: '#ffeb3b',
    },
    black: {
      main: '#212121',
    },
    grey: {
      main: '#f2f2f2',
    },
    red: {
      main: '#E74C3C',
    },
    blue: {
      main: '#007CFF',
    },
    extraLightCubee: {
      main: '#FFF3B8',
    },
  },
});

function App() {
  const [snack, setSnack] = useState({});
  const notificationHandler = {
    success: message => showNotification('success', message),
    error: message => showNotification('error', message),
    info: message => showNotification('info', message),
    warning: message => showNotification('warning', message),
  };
  const showNotification = (severity, message) => {
    const snackObj = { severity, message, open: true };
    if (snack.open) {
      setSnack(prevSnack => {
        return { ...prevSnack, open: false };
      });
      return setTimeout(() => {
        setSnack(snackObj);
      }, 100);
    } else setSnack(snackObj);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnack(prevSnack => {
      return { ...prevSnack, open: false };
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <SnackbarHandlerContext.Provider
        value={notificationHandler}
      >
        <SnackbarContext.Provider value={{ snack, setSnack }}>
          {
            <Snackbar
              TransitionComponent={Slide}
              onClose={handleClose}
              autoHideDuration={3000}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              dir="ltr"
              open={snack.open}
            >
              <Alert
                onClose={handleClose}
                severity={snack.severity}
                sx={{ width: '100%' }}
              >
                {snack.message}
                {/* <Button onClick={handleClose}>Share</Button> */}
              </Alert>
            </Snackbar>
          }
          <Router>
            <div className={'content'}>
              <Switch>
                <Route
                  path="/"
                  exact
                  component={OnDemand}
                />
              </Switch>
            </div>
          </Router>
        </SnackbarContext.Provider>
      </SnackbarHandlerContext.Provider>
    </ThemeProvider>
  );
}

export default App;
