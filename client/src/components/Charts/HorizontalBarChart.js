import React from 'react';
import {HorizontalBar} from 'react-chartjs-2';

const HorizontalBarChart = (props) => {
    return <HorizontalBar data={props.data} />
}

export default HorizontalBarChart;