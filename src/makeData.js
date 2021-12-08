/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from 'react';
import moment from "moment";


function MakeData() {
    const [costs, setCost] = useState([]);
  
    useEffect(() => {
        axios.get('http://api.marketstack.com/v1/eod?access_key=841f58161ddf378599e879af309e9a06&symbols=AAPL,FLC.XSTC,PVC.XSTC&limit=1000', {
          responseType: 'json'
        })
        .then((res) => {
            const cost = res.data.data.map((item) => ({ ...item, date: moment(item.date).format('YYYY-MM-DD') }));
          
          setCost(cost);
        //   setFilterCost(cost);
        })
    }, []);
    return costs;
}

export default MakeData