import React, { useReducer, useEffect } from 'react';
import { summaryReducer, initialSummaryState, ActionSummary, StateSummary} from './state/summary/reducer';
import { appReducer, initialAppState, ActionApp} from './state/app/reducer';
import Covid19Api from './services/Covid19Api';
import { Container } from './layout-components';
import LoadingScreen from './components/LoadingScreen/LoadingScreen'; 
import Header from './components/Header/Header';
import Home from './pages/Home/Home';

//export const AppContextState = React.createContext<StateApp>(initialAppState);
export const AppContextDispatch = React.createContext<React.Dispatch<ActionApp>>(() => initialAppState);

export const SummaryContexState = React.createContext<StateSummary>(initialSummaryState);
export const SummaryContexDispatch = React.createContext<React.Dispatch<ActionSummary>>(() => initialSummaryState);

function App() {

  const [appState, appDispatch] = useReducer(appReducer, initialAppState);
  const [summaryState, summaryDispatch] = useReducer(summaryReducer, initialSummaryState)
  
  useEffect(() => {
    Covid19Api.summary()
      .then( result => summaryDispatch({ type: 'SET_SUMMARY', summary: result}))
      .catch(error => appDispatch({ type: 'SET_ERROR', error: {
          hasError: true,
          errorMessage: error 
        }}))
      .finally(() => appDispatch({ type: 'SET_LOADING', isLoading: false}));
    
  }, []);
  
  return (
    <div className="App">

      { appState.isLoading && <LoadingScreen />} 
      
        <AppContextDispatch.Provider value={appDispatch}>
          <SummaryContexState.Provider value={summaryState}>
            <SummaryContexDispatch.Provider value={summaryDispatch}>

              <Header />
              <Container>
                <Home />
              </Container>

            </SummaryContexDispatch.Provider>
          </SummaryContexState.Provider>
        </AppContextDispatch.Provider>

    </div>
  );
}

export default App;
