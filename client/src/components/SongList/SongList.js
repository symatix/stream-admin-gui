import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import Loading from '../Loading/Loading';
import Notice from '../Notice/Notice';
import Dropdown from '../Form/Dropdown';
import Table from '../Table/Table';
import DateTime from '../Form/DateTime';
import {getSongListForStation} from '../../actions';

const styles = theme => ({
   root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto'
   },
   textField: {
     marginLeft: theme.spacing.unit,
     marginRight: theme.spacing.unit,
   },
   menu: {
     width: 200,
   },
   button: {
     margin: theme.spacing.unit,
   },
   loading: {
     height: 0
   }
});

class SongList extends Component {
  constructor(props){
    super(props);

    const startDate = moment().startOf('day');
    const endDate = moment().endOf('day');

    this.state = { 
      loading: false,
      alert: false,
      station: null,
      startDate: Date.parse(startDate),
      endDate: Date.parse(endDate)
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleStation = this.handleStation.bind(this);
    this.handleDates = this.handleDates.bind(this);
    this.submitQuery = this.submitQuery.bind(this);
  }
  
  componentWillUpdate(nextProps){
    const thisList = this.props.activeStation.song_list;
    const nextList = nextProps.activeStation.song_list;
    if (thisList !== nextList){
      this.setState({ loading: false })
    }
  }

   handleChange() {
      this.setState({loading: true});
   };
   handleStation(station){
      this.setState({ station })
   }
   handleDates(startDate, endDate){
      this.setState({ startDate, endDate })
   }
   submitQuery(){
     const { station, startDate, endDate } = this.state;
     if(!station){
       return this.setState({alert: true})
     }
     const data = {
      station,
      start: startDate,
      end: endDate
     }
    this.props.getSongListForStation(data)
   }

   renderSelect(){
      const { classes } = this.props;
      const data = this.props.stations.map(({ station }) => station);

      return (
        <div>
          <Dropdown data={data} action={this.handleStation} /><br/>
          <DateTime action={this.handleDates} /><br/>
          <Button className={classes.button} onClick={this.submitQuery}>Submit</Button>
        </div>   
      )
   }

  renderSongList(song_list) {
    if (song_list) {
      const headings = [
        "Artist",
        "Title",
        "Time"
      ]
      const data = song_list.map(({
        artist, title, time
      }) => [artist, title, new Date(time).toLocaleString()])
      return (<Table headings={headings} data={data} />)
    }
    return null;
  }

  renderLoading() {
    const { classes } = this.props;
    if (this.state.loading) {
      return (
        <Grid item xs={12} className={classes.loading}>
          <Loading />
        </Grid>
      )
    }
    return null;
  }

  render() {
    const { activeStation: { song_list } } = this.props;
    return (
      <Grid container justify="center" spacing={24}>
        <Grid item xs={12}>
          {this.renderSelect()}
        <Notice />
        </Grid>
        <Grid item xs={12} sm={10}>
          {this.renderSongList(song_list)}
        </Grid>
        {this.renderLoading()}
      </Grid>
    );
  }
}

SongList.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps({ stations, activeStation }) {
  return { stations, activeStation }
}

export default connect(mapStateToProps, { getSongListForStation })(withStyles(styles)(SongList));