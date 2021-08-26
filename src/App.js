import { ThemeProvider } from 'styled-components';
import logo from './logo.svg';
import theme from './theme';
import Home from './pages/Home';
import { Reset } from 'styled-reset';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Reset />
      <Home />
    </ThemeProvider>    
  );
}

export default App;
