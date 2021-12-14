import React, { useEffect, useState } from "react";
// import history from 'react';
import { Line, Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";
import axios from "axios";
import momment from "moment";

const styles = {
  list: {
    fontSize: 20,
    color: '#ede6e6',
    backgroundColor: '#9fb3d4',
    display: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 40,
  }
}
const BarChart = (props) => {
  const [chartState, setChartState] = useState({ label: [], data: [] });
  const [barState, setBarState] = useState({ label: [], data: [] });
  const [keyword, setKeyword] = useState('AAPL')
  const [detail, setDetail] = useState([{
    "company_name": "Apple INC",
    "type": "Điện tử",
    "symbol": "AAPL",
    "description": "Công ty điện thoại hàng đầu thế giới"
  }])

  useEffect(() => {
    axios.get('http://localhost:8000/api/detail/detail/?keyword=' + keyword, {
      responseType: 'json'
    })
    .then((res) => {
      
      setDetail(res.data);
    })
}, [keyword]);

  const fetchChartData = async () => {
    const cloneChartState = { ...chartState };
    const cloneBarState = { ...barState };
  
    const response = await axios.get(
      "http://api.marketstack.com/v1/eod?access_key=9a59b0433afbaa3f0adfe7a26c239129&symbols=" + keyword
    );
    // console.log("response: ", response);
    if (response?.data?.data?.length > 5) {
      const chartData = response?.data?.data;
      chartData.slice(0, 10).forEach((item) => {
        cloneChartState.label.push(momment(item.date).format("YYYY-MM-DD"));
        cloneChartState.data.push(item.close);
        cloneBarState.label.push(momment(item.date).format("YYYY-MM-DD"));
        cloneBarState.data.push(item.volume);
      });
    }
    setChartState(cloneChartState);
    setBarState(cloneBarState);
  };
  useEffect(() => {
    fetchChartData();
  }, [keyword]);
  const onChange = (event) => {
    setKeyword(
      [event.target.name]= event.target.value
    )
    
  }
  console.log(keyword);
  return (
    <>
    <div>
     <div>
        <select className="browser-default" name="code" onChange={ onChange }>
          <option value="" disabled selected>Choose Symbol</option> 
          <option value="AAPL">AAPL</option>
          <option value='FLC.XSTC'>FLC</option>
          <option value="PVC.XSTC">PVC</option>
        </select>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/history">
          <Line
						width={1000}
						height={400}
            data={{
              labels: chartState?.label,
              datasets: [
                {
                  label: "Rainfall",
                  fill: false,
                  lineTension: 0.5,
                  backgroundColor: "rgba(75,192,192,1)",
                  borderColor: "rgba(0,0,0,1)",
                  borderWidth: 2,
                  data: chartState?.data,
                },
              ],
            }}
            options={{
              title: {
                display: true,
                text: "Average Rainfall per month",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        </Link>
        <div>
          <ul style={ styles.list }>
            <b>Thông tin công ty:</b>
            {detail.map(el => (
              <>
              <li>Tên công ty: {el.company_name}</li>
              <li>Ngành: {el.type}</li>
              <li>Mã cổ phiếu: {el.symbol}</li>
              <li>Mô tả: {el.description}</li>
              </>
            ))}
          </ul>
        </div>
      </div>
      {/* <div style={{textAlign: 'center'}}>hello</div> */}
      </div>
      <div style={{ display: 'flex', marginTop: 40, alignItems: 'center' }}>
        <Link to="/history">
          <Bar
						width={1000}
						height={400}
            data={{
              labels: barState?.label,
              datasets: [
                {
                  label: "Rainfall",
                  backgroundColor: "rgba(75,192,192,1)",
                  borderColor: "rgba(0,0,0,1)",
                  borderWidth: 2,
                  data: barState?.data,
                },
              ],
            }}
            options={{
              title: {
                display: true,
                text: "Average Rainfall per month",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        </Link>
				{/* <div style={{marginLeft: 50}}>hello</div> */}
      </div>
    </>
  );
};

export default BarChart;
