import React, { useReducer, useEffect } from 'react';
import { countriesReducer, initialCountriesState, StateCountries } from './state/countries/reducer';
import { summaryReducer, initialSummaryState, StateSummary} from './state/summary/reducer';
import { appReducer, initialAppState, ActionApp} from './state/app/reducer';
import { Summary, Country, CountrySummary } from './types';
import covid19Api from './services/Covid19Api';
import { generateCountriesArray } from './utils/generateCountriesArray';
import { Container } from './layout-components';
import LoadingScreen from './components/LoadingScreen/LoadingScreen'; 
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';

//export const AppContextState = React.createContext<StateApp>(initialAppState);
export const AppContextDispatch = React.createContext<React.Dispatch<ActionApp>>(() => initialAppState);
export const CountriesContextState = React.createContext<StateCountries>(initialCountriesState);
export const SummaryContexState = React.createContext<StateSummary>(initialSummaryState);

interface ResponseInitialData {
  worldSummary: Summary,
  countries: Array<Country>,
  countriesSummary: Array<CountrySummary>
}

const loadInitialData = async (): Promise<ResponseInitialData> => {
  
   try {
    const worldSummary = await covid19Api.getGlobalSummary();
    const countriesSummary = await covid19Api.getCountriesSummary();
    const countries = generateCountriesArray(countriesSummary);
    return { worldSummary, countries, countriesSummary };
     
   } catch (error) {
     throw new Error ('Error on load initial data');
   }
}

function App() {

  const [countriesState, countriesDispatch] = useReducer(countriesReducer, initialCountriesState);
  const [appState, appDispatch] = useReducer(appReducer, initialAppState);
  const [summaryState, summaryDispatch] = useReducer(summaryReducer, initialSummaryState)
  
  useEffect(() => {

    loadInitialData()
      .then( response => {
        const { worldSummary, countries, countriesSummary} = response;
        summaryDispatch({ type: 'SET_SUMMARY', summary: worldSummary});
        countriesDispatch({ type: 'SET_SUMMARIES', countriesSummary});
        countriesDispatch({ type: 'SET_COUNTRIES', countries})
      })
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
              <CountriesContextState.Provider value={countriesState}>

                <Header />
                <Container>
                  <Home />
                </Container>
                <Footer />

              </CountriesContextState.Provider>
          </SummaryContexState.Provider>
        </AppContextDispatch.Provider>

    </div>
  );
}

export default App;
