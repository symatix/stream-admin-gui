import { createMuiTheme } from '@material-ui/core/styles';
import {
	grey300,
	blueGrey,
	teal,
	white,
	darkBlack,
	fullBlack
} from '@material-ui/core/colors';
import { fade } from '@material-ui/core/styles/colorManipulator';
import spacing from '@material-ui/core/styles/spacing';

const theme = createMuiTheme({
	spacing: spacing,
	fontFamily: 'Roboto, sans-serif',
	palette: {
		primary: blueGrey,
		secondary:white,
		accent:teal,
		textColor: darkBlack,
		alternateTextColor: white,
		canvasColor: white,
		borderColor: grey300,
		disabledColor: fade('#461308', 0.3),
		pickerHeaderColor: '#461308',
		clockCircleColor: fade('#461308', 0.07),
		shadowColor: fullBlack,
	},
	ripple: {
    color: 'green',
  },
});


export default theme;
