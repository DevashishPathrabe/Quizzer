import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	button: {
		marginTop: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
	actionsContainer: {
		marginBottom: theme.spacing(2),
	},
	resetContainer: {
		padding: theme.spacing(3),
	},
}));

export default function StepperPanel({ totalSteps, activeStep }) {
	const classes = useStyles();
	const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

	return (
		<div className={classes.root}>
			<Stepper activeStep={activeStep}>
				{steps.map((label) => (
					<Step key={label}>
						<StepLabel></StepLabel>
					</Step>
				))}
			</Stepper>
		</div>
	);
}
