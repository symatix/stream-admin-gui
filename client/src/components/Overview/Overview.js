import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Color from 'color';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Loading from '../Loading/Loading';
import Table from '../Table/Table';
import BarChart from '../Charts/BarChart';
import HorizontalBarChart from '../Charts/HorizontalBarChart';
import PieChart from '../Charts/PieChart';
import { getCurrentStreamState } from '../../actions';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    alert: {
        color: "darkred"
    },
    notification: {
        color: "darkgreen"
    }
});






const generateData = (array, label1, key1, label2, key2) => {
    array.sort(function(a, b){
        if(a[key1] < b[key1]) return 1;
        if(a[key1] > b[key1]) return -1;
        return 0;
    })

    let data = {
        labels: [],
        datasets: [{
            label: label1,
            data: [],
            backgroundColor: []
        }]
    };

    if (label2) data.datasets.push({
        label: label2,
        data: [],
        backgroundColor: []
    })

    var shading = 0;
    array.forEach(station => {
        data.labels.push(station.station)
        data.datasets[0].data.push(station[key1])
        data.datasets[0].backgroundColor.push(Color("#a6a6a6").darken(shading))
        
        if (label2){
            data.datasets[1].data.push(station[key2])
            data.datasets[1].backgroundColor.push(Color("#a6a6a6").darken(shading))
        }
        shading = shading + 0.05;
    })
    return data;
}


class Overview extends Component {

    componentDidMount() {
        this.props.getCurrentStreamState();
    }

    renderTable() {
        const { currentState } = this.props;

        const headings = [
            "Station",
            "Status",
            "Song"
        ]

        const data = currentState.map(({
            station, current_song, stream_status
        }) => {
            const status = stream_status === 1 ? "OK" : "DOWN";
            return [station, status, current_song]
        })

        if (Array.isArray(currentState) && currentState.length > 0) {
            return <Table headings={headings} data={data} />
        }
        return null
    }

    renderBarChart() {
        const { currentState, classes } = this.props;
        if (Array.isArray(currentState) && currentState.length > 0) {
            return (
                <Paper className={classes.root}>
                    <BarChart data={generateData(
                        currentState, 
                        "Current listeners",
                        "current_listeners",
                        "Unique listeners",
                        "unique_listeners" )
                    } />
                </Paper>
            )
        }
        return null
    }
    renderPieChart() {
        const { currentState, classes } = this.props;
        if (Array.isArray(currentState) && currentState.length > 0) {
            return (
                <Paper className={classes.root}>
                    <PieChart data={generateData(
                        currentState,  
                        "Current listeners",
                        "current_listeners")
                    } />
                </Paper>
            )
        }
        return null
    }

    renderHorizontalChart() {
        const { currentState, classes } = this.props;
        if (Array.isArray(currentState) && currentState.length > 0) {
            return (
                <Paper className={classes.root}>
                    <HorizontalBarChart data={generateData(
                        currentState,  
                        "BitRate",
                        "bitrate")
                    } />
                </Paper>
            )
        }
        return null
    }

    renderLoading(){
        if(this.props.currentState < 1){
            return(
                <Grid item xs={12}>
                    <Loading />
                </Grid>
            )
        }
    }

    render() {
        return (
            <Grid 
                container
                justify="center"
                spacing={24}>
                <Grid item xs={12} sm={12} md={7}>
                    {this.renderBarChart()}
                </Grid>
                <Grid item xs={12} md={5}>
                    {this.renderTable()}
                </Grid>
                {this.renderLoading()}
                <Grid item xs={12} md={7}>
                    {this.renderPieChart()}
                </Grid>
                <Grid item xs={12} sm={6} md={5}>
                    {this.renderHorizontalChart()}
                </Grid>
            </Grid>
        );
    }
}

Overview.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps({ currentState }) {
    return { currentState }
}

export default connect(mapStateToProps, { getCurrentStreamState })(withStyles(styles)(Overview));