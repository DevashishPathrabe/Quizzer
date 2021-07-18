import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: '2rem 1rem',
		flexGrow: 1,
	},
}));

export default function QuestionCard({ questionObject, handleButtonClick }) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid
				container
				spacing={2}
				direction='row'
				justifyContent='center'
				alignItems='baseline'
			>
				<Grid item xs={12}>
					<Typography variant='h5' component='h2' align='center'>
						{questionObject.question}
					</Typography>
				</Grid>
				{questionObject.options.map((answerOption) => (
					<Grid item xs={12} md={6} key={answerOption.value}>
						<Button
							variant='outlined'
							fullWidth
							onClick={() =>
								handleButtonClick(answerOption.value === questionObject.answer)
							}
						>
							{answerOption.label}
						</Button>
					</Grid>
				))}
			</Grid>
		</div>
	);
}
