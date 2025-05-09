/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext';
import { HistoricalChart } from '../Config/api';
import axios from 'axios';
import { ThemeProvider, makeStyles } from '@mui/styles';
import { CircularProgress, createTheme } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
} from 'chart.js';
import { chartDays } from '../Config/dara';
import SelectButton from './SelectButton';

// Register the necessary components
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const useStyles = makeStyles((theme) => ({
	container: {
		width: "75%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 25,
		padding: 40,
		[theme.breakpoints.down("md")]: {
			width: "100%",
			marginTop: 0,
			padding: 20,
			paddingTop: 0,
		},
	},
}));
const CoinInfo = ({ coin }) => {

	const [historicalData, setHistoricalData] = useState();
	const [days, setDays] = useState(1);
	const { currency, symbol } = CryptoState();
	const [flag, setflag] = useState(false);
	const api = "CG-Vc1Ygp3Bumn6UqvcJNQiWKvK";
	console.log(coin)
	const fetchHistoricData = async () => {
		const { data } = await axios.get(HistoricalChart(coin.id, days, currency), {
			headers: {
				accept: 'application/json', 'x-cg-demo-api-key': 'CG-Vc1Ygp3Bumn6UqvcJNQiWKvK'
			},
		});

		setHistoricalData(data.prices);
	}
	console.log(historicalData);
	useEffect(() => {
		fetchHistoricData()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currency, days])
	const classes = useStyles();
	const darkTheme = createTheme({
		palette: {
			mode: "dark",
			primary: {
				main: "#fff",
			},

		},
	});
	return (
		<ThemeProvider theme={darkTheme}>
			<div className={classes.container} >
				{
					!historicalData ? (
						<CircularProgress
							style={{ color: "gold" }}
							size={250}
							thickness={1}
						/>
					) : (
						<>
							<Line
								data={{
									labels: historicalData.map((coin) => {
										let date = new Date(coin[0]);
										let time = date.getHours() > 12
											? `${date.getHours() - 12}:${date.getMinutes()} PM`
											: `${date.getHours()}:${date.getMinutes()} AM`;
										return days === 1 ? time : date.toLocaleDateString();
									}),
									datasets: [{
										data: historicalData.map((coin) => coin[1]),
										label: `Price (Past ${days} Days) in ${currency}`,
										borderColor: '#EEBC1D'
									}]
								}}
								options={{
									elements: {
										point: {
											radius: 1,
										},
									},
								}}
							/>
							<div
								style={{
									display: "flex",
									marginTop: 20,
									justifyContent: "space-around",
									width: "100%",
								}}
							>
								{chartDays.map((day) => (
									<SelectButton
										key={day.value}
										onClick={() => {
											setDays(day.value);
											setflag(false);
										}}
										selected={day.value === days}
									>
										{day.label}
									</SelectButton>
								))}
							</div>
						</>
					)
				}
			</div>
		</ThemeProvider>

	)
}

export default CoinInfo


/* 
*/