import { createTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const lightTheme = createTheme({
	palette: {
		type: 'light',
		primary: blue,
	},
});

export default lightTheme;
