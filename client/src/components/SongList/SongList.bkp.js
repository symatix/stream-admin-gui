import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Loading from '../Loading/Loading';
import Dropdown from '../Form/Dropdown';
import Table from '../Table/Table';
import DateTime from '../Form/DateTime';
import {setActiveStation, setSecondaryStation} from '../../actions';

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
   loading: {
     height: 0
   }
});

class SongList extends Component {
  constructor(props){
    super(props);
    this.state = { loading: false };
    this.handleChange = this.handleChange.bind(this);
  }
  
  componentWillUpdate(nextProps){
    const activeSL = this.props.activeStation.song_list;
    const activeNSL = nextProps.activeStation.song_list;
    const secondarySL = this.props.secondaryStation.song_list;
    const secondaryNSL = nextProps.secondaryStation.song_list;
    if (activeSL !== activeNSL || secondarySL !== secondaryNSL){
      this.setState({ loading: false })
    }
  }

   handleChange() {
      this.setState({loading: true});
   };

   renderSelect(){
      const data = this.props.stations.map(({ station }) => station);
      const action = this.props.setActiveStation;
      return <Dropdown data={data} action={action} triggerChange={this.handleChange} />
   }
   renderSecondarySelect(){
      const data = this.props.stations.map(({ station }) => station);
      const action = this.props.setSecondaryStation;
      return <Dropdown data={data} action={action} triggerChange={this.handleChange} />
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
    const { activeStation, secondaryStation } = this.props;
    return (
      <Grid container justify="center" spacing={24}>
        <Grid item xs={12}>
          {this.renderSelect()}
          {this.renderSecondarySelect()}
        </Grid>
        {this.renderLoading()}
        <Grid item xs={12} sm={6}>
        
        {activeStation.song_list
            ? <DateTime />
            : null}
          {this.renderSongList(activeStation.song_list)}
        </Grid>
        <Grid item xs={12} sm={6}>
          {secondaryStation.song_list
            ? <DateTime />
            : null}
          {this.renderSongList(secondaryStation.song_list)}
        </Grid>
      </Grid>
    );
  }
}

SongList.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps({ stations, activeStation, secondaryStation }) {
  return { stations, activeStation, secondaryStation }
}

export default connect(mapStateToProps, { setActiveStation, setSecondaryStation })(withStyles(styles)(SongList));