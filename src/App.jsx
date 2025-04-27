
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './Components/Header'
import HomePage from './Pages/HomePage'
import CoinPage from './Pages/CoinPage'
import { makeStyles } from '@mui/styles';
import { ThemeProvider, createTheme } from '@mui/material'
const useStyles = makeStyles(() => ({
	App: {
		backgroundColor: "#14161a",
		color: "white",
		minHeight: "100vh",
	},
}));
function App() {
	const theme = createTheme({
		breakpoints: {
			values: {
				xs: 0,
				sm: 600,
				md: 900,
				lg: 1200,
				xl: 1536,
			},
		},
	});
	
	const classes = useStyles();
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<div className={classes.App}>
					<Header />
					<Routes>
						<Route path='/' Component={HomePage} exact />
						<Route path='/coins/:id' Component={CoinPage} exact />

					</Routes>
				</div>
			</BrowserRouter>
		</ThemeProvider>



	)
}

export default App
