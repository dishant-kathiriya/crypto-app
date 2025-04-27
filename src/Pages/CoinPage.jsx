/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CryptoState } from '../CryptoContext';
import { SingleCoin } from '../Config/api';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import { ThemeProvider, makeStyles } from '@mui/styles';
import { LinearProgress, Typography, createTheme } from '@mui/material';
import CoinInfo from '../Components/coinInfo';

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		[theme.breakpoints.down("md")]: {
			flexDirection: "column",
			alignItems: "center",
		},
	},
	sidebar: {
		width: "30%",
		[theme.breakpoints.down("md")]: {
			width: "100%",
		},
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		marginTop: 25,
		borderRight: "2px solid grey",
	},
	heading: {
		fontWeight: "bold",
		marginBottom: 20,
		fontFamily: "Montserrat",
	},
	description: {
		width: "100%",
		fontFamily: "Montserrat",
		padding: 25,
		paddingBottom: 15,
		paddingTop: 0,
		textAlign: "justify",
	},
	marketData: {
		alignSelf: "start",
		padding: 35,
		paddingTop: 10,
		width: "100%",
		[theme.breakpoints.down("md")]: {
			display: "flex",
			justifyContent: "space-around",
		},
		[theme.breakpoints.down("sm")]: {
			flexDirection: "column",
			alignItems: "center",
		},
		[theme.breakpoints.down("xs")]: {
			alignItems: "start",
		},
	},
}));
const CoinPage = () => {
	const { id } = useParams();
	const [coin, setCoin] = useState()
	const { currency, symbol } = CryptoState();
	const api = "CG-Vc1Ygp3Bumn6UqvcJNQiWKvK";
	const fetchCoin = async () => {
		const { data } = await axios.get(SingleCoin(id), {
			headers: {
				'accept': 'application/json',
				'x-cg-demo-api-key': api,
			},
		});

		setCoin(data);
	}
	console.log(coin);
	useEffect(() => {
		fetchCoin()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
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
	function numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	
	}

	const classes = useStyles();

	if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

	return (
		<ThemeProvider theme={theme} >
			<div className={classes.container}>
				<div className={classes.sidebar}>
					<img
						src={coin?.image.large}
						alt={coin?.name}
						height="200"
						style={{ marginBottom: 20 }}
					/>
					<Typography variant='h3' className={classes.heading}>
						{
							coin?.name
						}
					</Typography>
					<Typography variant='subtitle1' className={classes.description} >
						{
							ReactHtmlParser(coin?.description.en.split(". ")[0])
						}.
					</Typography>
					<div className={classes.marketData}>
						<span style={{ display: "flex" }}>
							<Typography variant="h5" className={classes.heading}>
								Rank:
							</Typography>
							&nbsp; &nbsp;
							<Typography
								variant="h5"
								style={{
									fontFamily: "Montserrat",
								}}
							>
								{numberWithCommas(coin?.market_cap_rank)}
							</Typography>
						</span>

						<span style={{ display: "flex" }}>
							<Typography variant="h5" className={classes.heading}>
								Current Price:
							</Typography>
							&nbsp; &nbsp;
							<Typography
								variant="h5"
								style={{
									fontFamily: "Montserrat",
								}}
							>
								{symbol}{" "}
								{numberWithCommas(
									coin?.market_data.current_price[currency.toLowerCase()]
								)}
							</Typography>
						</span>
						<span style={{ display: "flex" }}>
							<Typography variant="h5" className={classes.heading}>
								Market Cap:
							</Typography>
							&nbsp; &nbsp;
							<Typography
								variant="h5"
								style={{
									fontFamily: "Montserrat",
								}}
							>
								{symbol}{" "}
								{numberWithCommas(
									coin?.market_data.market_cap[currency.toLowerCase()]
										.toString()
										.slice(0, -6)
								)}
								M
							</Typography>
						</span>
					</div>
				</div>
				{/* chart */}
				<CoinInfo coin={coin} />
			</div>
		</ThemeProvider>

	)
}

export default CoinPage