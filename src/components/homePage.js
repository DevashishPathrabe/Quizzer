import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
	root: {
		margin: '2rem 1rem',
		textAlign: 'center',
		padding: '0 0 1rem 0',
	},
	cardActions: {
		display: 'inline-block',
	},
	bodyStyle: {
		marginTop: '1rem',
	},
});

export default function HomePage({ questionsCount, questionTime, startQuiz }) {
	const classes = useStyles();
	return (
		<Card className={classes.root}>
			<CardContent>
				<img
					alt='Quizzer Logo'
					src={require('../images/Quizzer_Logo_02.png')}
				/>
				<Typography variant='h5' component='h2'>
					Welcome to Quizzer App
				</Typography>
				<Typography variant='body1' className={classes.bodyStyle}>
					There are a total of {questionsCount} questions.
					<br />
					You will get maximum of {questionTime} seconds to answer each
					question.
				</Typography>
			</CardContent>
			<CardActions className={classes.cardActions}>
				<Button
					size='large'
					color='primary'
					variant='contained'
					onClick={startQuiz}
					startIcon={<PlayArrowIcon />}
				>
					Start Quiz
				</Button>
			</CardActions>
		</Card>
	);
}
