import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

const CustomTable = props => {
   const { classes, headings, data } = props;

   const renderHeadings = () => {
      return (
         <TableHead>
            <TableRow>
               {headings.map(heading => <TableCell key={heading}>{heading}</TableCell>)}
            </TableRow>
         </TableHead>
      )
   }

   const renderData = () => {
      return (
         <TableBody>
            {data.map((d, i) => {
               return (
                  <TableRow key={i}>
                     {headings.map((h, j) => <TableCell key={h+j}>{d[j]}</TableCell>)}
                  </TableRow>
               )
            }
         )}
         </TableBody>
      )
   }

   return(
         <Paper className = { classes.root } >
            <Table className={classes.table}>
               {renderHeadings()}
               {renderData()}
            </Table>
         </Paper>
     )
}

CustomTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomTable);