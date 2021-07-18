import React, { Component } from 'react';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

import AppBar from '@material-ui/core/AppBar';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import HomePage from './components/homePage';
import StepperPanel from './components/stepperPanel';
import QuestionCard from './components/questionCard';
import ScoreCard from './components/scoreCard';

import questionBank from './data/QuestionBank.json';
import {
	TOTAL_QUESTIONS,
	DIFF_TIME_MILLISECONDS,
	QUESTION_TIME_MILLISECONDS,
} from './utils/appConstants';
import darkTheme from './themes/darkTheme';
import lightTheme from './themes/lightTheme';

const styles = (theme) => ({
	root: {
		flexGrow: 1,
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
	},
	logo: {
		maxWidth: '160px',
	},
	title: {
		flexGrow: 1,
		textAlign: 'center',
		padding: '0.5rem 0 0 3rem',
	},
	timerWrapper: {
		display: 'flex',
		justifyContent: 'center',
		marginTop: '1rem',
	},
	timer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	timerValue: {
		fontSize: '40px',
	},
});

class App extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			questions: questionBank
				.sort(() => 0.5 - Math.random())
				.slice(0, TOTAL_QUESTIONS)
				.map((questionObject) => ({
					...questionObject,
					options: questionObject.options.sort(() => 0.5 - Math.random()),
				})),
			currentQuestionIndex: 0,
			showResult: false,
			score: 0,
			showHomePage: true,
			darkThemeSelected: localStorage.getItem('quizzer-theme') === 'dark',
		};
		this.timerId = null;
	}

	componentWillUnmount() {
		this.clearTimer();
	}

	setTimer = () => {
		this.timerId = setTimeout(() => {
			this.setState((prevState) => ({
				...prevState,
				showResult: true,
			}));
		}, QUESTION_TIME_MILLISECONDS);
	};

	clearTimer = () => {
		if (this.timerId) {
			clearTimeout(this.timerId);
		}
	};

	handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			this.setState((prevState) => ({
				...prevState,
				score: prevState.score + 1,
			}));
			this.clearTimer();
			this.setTimer();
		} else {
			this.setState((prevState) => ({
				...prevState,
				showResult: true,
			}));
			this.clearTimer();
		}
		const { currentQuestionIndex, questions } = this.state;
		const nextQuestion = currentQuestionIndex + 1;
		if (nextQuestion < questions.length) {
			this.setState((prevState) => ({
				...prevState,
				currentQuestionIndex: prevState.currentQuestionIndex + 1,
			}));
		} else {
			this.setState((prevState) => ({
				...prevState,
				showResult: true,
			}));
			this.clearTimer();
		}
	};

	startQuiz = () => {
		this.setTimer();
		this.setState((prevState) => ({
			...prevState,
			showHomePage: false,
		}));
	};

	resetQuiz = () => {
		this.setState((prevState) => ({
			...prevState,
			questions: questionBank
				.sort(() => 0.5 - Math.random())
				.slice(0, TOTAL_QUESTIONS),
			currentQuestionIndex: 0,
			showResult: false,
			score: 0,
		}));
		this.setTimer();
	};

	renderTime = ({ remainingTime }) => {
		const { classes } = this.props;
		if (remainingTime === 0) {
			return <div className={classes.timer}>Too late...</div>;
		} else if (remainingTime < 4) {
			return (
				<div className={classes.timer}>
					<div>Hurry up</div>
					<div className={classes.timerValue}>{remainingTime}</div>
					<div>seconds</div>
				</div>
			);
		} else {
			return (
				<div className={classes.timer}>
					<div>Remaining</div>
					<div className={classes.timerValue}>{remainingTime}</div>
					<div>seconds</div>
				</div>
			);
		}
	};

	handleThemeChange = () => {
		this.setState((prevState) => ({
			...prevState,
			darkThemeSelected: !prevState.darkThemeSelected,
		}), () => {
			localStorage.setItem('quizzer-theme', this.state.darkThemeSelected ? 'dark' : 'light');
		});
	};

	render() {
		const {
			score,
			questions,
			showResult,
			currentQuestionIndex,
			showHomePage,
			darkThemeSelected,
		} = this.state;
		const { classes } = this.props;
		const questionTimeDuration =
			(QUESTION_TIME_MILLISECONDS - DIFF_TIME_MILLISECONDS) / 1000;
		return (
			<React.Fragment>
				<ThemeProvider
					theme={darkThemeSelected ? { ...darkTheme } : { ...lightTheme }}
				>
					<CssBaseline />
					<div className={classes.root}>
						<AppBar position='static' color='transparent'>
							<Toolbar>
								<Typography variant='h4' className={classes.title}>
									<img
										alt='Quizzer Logo'
										src={require('./images/Quizzer_Logo_01.png')}
										className={classes.logo}
									/>
								</Typography>
								<IconButton
									onClick={this.handleThemeChange}
									aria-label='toggle light / dark theme'
								>
									{darkThemeSelected ? (
										<Brightness7Icon />
									) : (
										<Brightness4Icon />
									)}
								</IconButton>
							</Toolbar>
						</AppBar>
						{showHomePage ? (
							<HomePage
								questionsCount={TOTAL_QUESTIONS}
								questionTime={questionTimeDuration}
								startQuiz={this.startQuiz}
							/>
						) : showResult ? (
							<ScoreCard
								score={score}
								questionsCount={questions.length}
								resetQuiz={this.resetQuiz}
							/>
						) : (
							<React.Fragment>
								<StepperPanel
									totalSteps={TOTAL_QUESTIONS}
									activeStep={currentQuestionIndex}
								/>
								<div className={classes.timerWrapper}>
									<CountdownCircleTimer
										key={currentQuestionIndex}
										isPlaying
										duration={questionTimeDuration}
										colors={[['#007777', 0.33], ['#F7B801', 0.33], ['#A30000']]}
									>
										{this.renderTime}
									</CountdownCircleTimer>
								</div>
								<QuestionCard
									questionObject={questions[currentQuestionIndex]}
									handleButtonClick={this.handleAnswerOptionClick}
								/>
							</React.Fragment>
						)}
					</div>
				</ThemeProvider>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(App);
