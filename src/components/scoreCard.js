import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ReplayIcon from '@material-ui/icons/Replay';
import Typography from '@material-ui/core/Typography';
import Confetti from 'react-confetti';

const useStyles = makeStyles({
	root: {
		margin: '2rem 1rem',
		textAlign: 'center',
		padding: '0 0 1rem 0',
	},
	cardActions: {
		display: 'inline-block',
	},
	emojiStyle: {
		fontSize: '13rem',
	},
});

export default function ScoreCard({ score, questionsCount, resetQuiz }) {
	const classes = useStyles();
	let message;
	let color;
	let confetti;
	if (score === questionsCount) {
		message = 'Congratulations! You won.';
		color = 'primary';
		confetti = (
			<Confetti width={window.innerWidth} height={window.innerHeight} />
		);
	} else {
		message = 'You lost. Better luck next time!';
		color = 'error';
		confetti = <React.Fragment />;
	}
	return (
		<React.Fragment>
			{confetti}
			<Card className={classes.root}>
				<CardContent>
					<img
						alt='Quizzer Logo'
						src={require('../images/Quizzer_Logo_02.png')}
					/>
					<Typography variant='h5' component='h2' color={color}>
						{message}
					</Typography>
				</CardContent>
				<CardActions className={classes.cardActions}>
					<Button
						size='medium'
						variant='contained'
						onClick={resetQuiz}
						startIcon={<ReplayIcon />}
					>
						Try Again
					</Button>
				</CardActions>
			</Card>
		</React.Fragment>
	);
}
