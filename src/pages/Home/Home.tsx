import React, { useState, useEffect } from 'react';
import CardData from '../../components/CardData/CardData'; 
import Covid19Api from '../../services/Covid19Api';
import { SummaryResponse } from '../../types';

const covid19Api = new Covid19Api();

const Home: React.FC = () => {

    const [ summaryData, setSummaryData] = useState<any>(undefined);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        covid19Api.summary()
            .then( result => {
                console.log(result)
                setSummaryData(result);
            })
            .catch(error => setError('An error occurred while fetching data'));
    }, [])

    if (error) {
        return <p>{ error }</p>
    }

    if (!summaryData) {
        return null;
    }

    return (
        <div className="flex flex-space-around">
            {
                summaryData && Object.keys(summaryData).map( (summaryDataKey) => <CardData 
                        detail={summaryData[summaryDataKey].detail} 
                        value={summaryData[summaryDataKey].value} 
                        title={summaryDataKey}/>
                )
            }
        </div>
    );
} 

export default Home;