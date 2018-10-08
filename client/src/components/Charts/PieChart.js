import React from 'react';
import {Pie} from 'react-chartjs-2';

const PieChart = (props) => {
    return <Pie data={props.data} />
}

export default PieChart;