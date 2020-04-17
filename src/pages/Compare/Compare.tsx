import React, { useState, useContext } from 'react';
import { CountriesContextState } from '../../App';
import { CountrySummary, Country } from '../../types';
import PageTitle from '../../components/PageTitle/PageTitle';
import { Row, Col, Form, Select as AntSelect } from 'antd';
import CompareTable from './CompareTable';

// TODO: Refactor this component and CompareTable component

const { Option } = AntSelect;

const formInputsLayout = {
    labelCol: {
        xs: { span: 24},
        sm: { span: 6},
    },
    wrapperCol: {
        xs: { span: 24},
        sm: { span: 16},
    },
};

interface SelectProps {
    countries: Array<Country>,
    selectMethod: (iso3: string) => void

}
const Select: React.FC<SelectProps> = ({countries, selectMethod}) => (
    <AntSelect 
        id="country-one"
        showSearch 
        placeholder="Select country"
        onChange={selectMethod} >
        { countries.map( country => <Option key={country.iso3} value={country.iso3}>{country.name}</Option>) }
    </AntSelect>
);

const findSummary = (summaries: Array<CountrySummary>, iso3: string) => {
    const summary = summaries.find( summary => summary.iso3 === iso3);
    return summary;
} 

const Compare = () => {
    
    const [selectedOne, setSelectedOne] = useState<CountrySummary | undefined>(undefined);
    const [selectedTwo, setSelectedTwo] = useState<CountrySummary | undefined>(undefined);
    const [selectedThree, setSelectedThree] = useState<CountrySummary | undefined>(undefined);

    const countriesContextState = useContext(CountriesContextState);
    const { countries, countriesSummaries } = countriesContextState;
    
    const selectedOneChange = (iso3: string) => {
        const countrySummary = findSummary(countriesSummaries, iso3)
        countrySummary &&  setSelectedOne(countrySummary);
    }

    const selectedTwoChange = (iso3: string) => {
        const countrySummary = findSummary(countriesSummaries, iso3)
        countrySummary &&  setSelectedTwo(countrySummary);
    }

    const selectedThreeChange = (iso3: string) => {
        const countrySummary = findSummary(countriesSummaries, iso3)
        countrySummary &&  setSelectedThree(countrySummary);
    }

    return(
        <div>
            <Row gutter={[16, 32]}>
                <Col span={24}>
                    <PageTitle title="Compare countries" />
                </Col>
            </Row>
            <Row gutter={42}>
                <Col span={24}>
                    <Form {...formInputsLayout}>
                        <Form.Item
                            label="Country One"
                            name="country-one">
                            <Select countries={countries} selectMethod={selectedOneChange} />
                        </Form.Item>
                        <Form.Item
                            label="Country Two"
                            name="country-two">
                            <Select countries={countries} selectMethod={selectedTwoChange} />
                        </Form.Item>
                        <Form.Item
                            label="Country Three"
                            name="country-three">
                            <Select countries={countries} selectMethod={selectedThreeChange} />
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            <Row style={{ marginTop: 30}}>
                <Col span={24}>
                    <CompareTable summaryOne={selectedOne} summaryTwo={selectedTwo} summaryThree={selectedThree} />
                </Col> 
            </Row>
        </div>
    );
}

export default Compare;