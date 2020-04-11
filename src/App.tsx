import React, { useReducer, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import { countriesReducer, initialCountriesState, StateCountries } from './state/countries/reducer';
import { summaryReducer, initialSummaryState, StateSummary} from './state/summary/reducer';
import { appReducer, initialAppState, ActionApp} from './state/app/reducer';
import { Summary, Country, CountrySummary } from './types';
import covid19Api from './services/Covid19Api';
import { generateCountriesArray } from './utils/generateCountriesArray';
import LoadingScreen from './components/Loading/LoadingScreen'; 
import Layout from './layout/Layout';
import Home from './pages/Home/Home';
import Historical from './pages/Historical/Historical';

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
      <BrowserRouter>
        <AppContextDispatch.Provider value={appDispatch}>
          <SummaryContexState.Provider value={summaryState}>
              <CountriesContextState.Provider value={countriesState}>
                <Layout>
                  <Switch>
                    <Route path="/historical" component={Historical} />
                    <Route path="/" component={Home} />
                    <Route component={() => <div>Page not found</div>} />
                  </Switch>
                </Layout>
              </CountriesContextState.Provider>
          </SummaryContexState.Provider>
        </AppContextDispatch.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
