/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import axios from "axios";
import { useEffect } from 'react';

import styles from "./App.css";
import Table from "./components/Table";
import moment from "moment";


const App = () => {
  const [costs, setCost] = useState([]);
  const [filterCost, setFilterCost] = useState([]);
  const [keyWord, setKeyWord] = useState('AAPL,PVC.XSTC,FLC.XSTC');
  const [btn , setBtn] = useState(0)

  useEffect(() => {
    axios.get('http://api.marketstack.com/v1/eod?access_key=c4b2cf555fca7235468c503f63711377&symbols=' + keyWord, {
      responseType: 'json'
    })
    .then((res) => {
        const cost = res.data.data.map((item) => ({ ...item, date: moment(item.date).format('YYYY-MM-DD') }));
      
      setCost(cost);
      setFilterCost(cost);
    })
}, [btn]);
  
  const handleSearch = () => {
    if (keyWord) {
      console.log('keyWord: ', keyWord);
      setKeyWord(keyWord)
      setBtn(btn + 1)
    } else {
      setFilterCost(costs);
    }
  }

  return (
    <main className={styles.container} >
      <div className= 'searchContainer' >
        <input onChange={(event) => setKeyWord(event.target.value)} />
        <button onClick={handleSearch} className={styles.btn}>Search</button>
      </div>
      <div className={styles.wrapper}>
        <Table data={filterCost} rowsPerPage={10} />
      </div>
    </main>
  );
};

export default App;
