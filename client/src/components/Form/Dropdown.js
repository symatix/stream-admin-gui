import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
   textField: {
     marginLeft: theme.spacing.unit,
     marginRight: theme.spacing.unit,
   },
   menu: {
     width: 200,
   }
});

class Dropdown extends Component {

   state = {
      station: '',
    };

   handleChange = name => event => {
      this.setState({
         [name]: event.target.value,
      });
      this.props.action(event.target.value);
   };

   render() {
      const { data, classes } = this.props;
      return (
            <TextField
               id="filled-select-station"
               select
               label="Select"
               className={classes.textField}
               value={this.state.station}
               onChange={this.handleChange('station')}
               SelectProps={{
                  MenuProps: {
                     className: classes.menu,
                  },
               }}
               helperText="Select station"
               margin="normal"
               variant="filled"
            >
               {data.map(d => (
                  <MenuItem key={d} value={d}>
                     {d}
                  </MenuItem>
               ))}
            </TextField>
      );
   }
}

Dropdown.propTypes = {
   classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Dropdown);