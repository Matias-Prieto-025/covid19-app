import React, { useReducer, useEffect } from 'react';
import { summaryReducer, initialSummaryState, Action, State} from './state/summary/reducer';
import Covid19Api from './services/Covid19Api';
import { Container } from './layout-components'; 
import Header from './components/Header/Header';
import Home from './pages/Home/Home';

export const SummaryContexState = React.createContext<State>(initialSummaryState);
export const SummaryContexDispatch = React.createContext<React.Dispatch<Action>>(() => initialSummaryState);

function App() {

  const [summaryState, summaryDispatch] = useReducer(summaryReducer, initialSummaryState)
  
  useEffect(() => {
    Covid19Api.summary()
      .then( result => summaryDispatch({ type: 'SET_SUMMARY', summary: result}))
      .catch(error => summaryDispatch({ type: 'SET_ERROR', error: 'An error occurred while fetching summary' }));
    
  }, []);
  
  return (
    <div className="App">
      <SummaryContexState.Provider value={summaryState}>
        <SummaryContexDispatch.Provider value={summaryDispatch}>
          <Header />
          <Container>
            <Home />
          </Container>
        </SummaryContexDispatch.Provider>
      </SummaryContexState.Provider>
    </div>
  );
}

export default App;
