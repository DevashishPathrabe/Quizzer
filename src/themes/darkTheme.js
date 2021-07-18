import { createTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const darkTheme = createTheme({
	palette: {
		type: 'dark',
		primary: blue,
	},
});

export default darkTheme;
