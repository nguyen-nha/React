import React, { useEffect, useState } from 'react';
// import history from 'react';
import { Line, Bar } from 'react-chartjs-2'
import { Link } from 'react-router-dom';
import axios from 'axios';
import momment from 'moment';

const HistoryPage = (props) => {
	const [chartState, setChartState] = useState({ label: [], data: [] });
	const [barState, setBarState] = useState({ label: [], data: [] });
	const fetchChartData = async () => {
		const cloneChartState = { ...chartState };
		const cloneBarState = { ...barState };
		const response = await axios.get('http://api.marketstack.com/v1/eod?access_key=9543de3b997f0149c438d866f4b6f474&symbols=FLC');
		console.log('response: ', response);
		if (response?.data?.data?.length > 5) {
			const chartData = response?.data?.data;
			chartData.slice(0, 10).forEach((item) => {
				cloneChartState.label.push(momment(item.date).format('YYYY-MM-DD'));
				cloneChartState.data.push(item.close);
				cloneBarState.label.push(momment(item.date).format('YYYY-MM-DD'));
				cloneBarState.data.push(item.volume);
			})
		}
		setChartState(cloneChartState);
		setBarState(cloneBarState);
	}
	useEffect(() => {
		fetchChartData();
	}, [])

	return (
		<>
			<div style={{ width: 600, height: 600 }}>
				<Link to="/dashboard">
					<Line
						data={{
							labels: chartState?.label,
							datasets: [
								{
									label: 'Rainfall',
									fill: false,
									lineTension: 0.5,
									backgroundColor: 'rgba(75,192,192,1)',
									borderColor: 'rgba(0,0,0,1)',
									borderWidth: 2,
									data: chartState?.data
								}
							]
						}}
						options={{
							title: {
								display: true,
								text: 'Average Rainfall per month',
								fontSize: 20
							},
							legend: {
								display: true,
								position: 'right'
							}
						}}
					/>
				</Link>
			</div><div style={{ width: 600, height: 600 }}>
				<Link to="/dashboard">
					<Bar
						data={{
							labels: barState?.label,
							datasets: [
								{
									label: 'Rainfall',
									backgroundColor: 'rgba(75,192,192,1)',
									borderColor: 'rgba(0,0,0,1)',
									borderWidth: 2,
									data: barState?.data
								}
							]
						}}
						options={{
							title: {
								display: true,
								text: 'Average Rainfall per month',
								fontSize: 20
							},
							legend: {
								display: true,
								position: 'right'
							}
						}}
					/>
				</Link>
			</div>
			hello
		</>
	);
}


export default HistoryPage