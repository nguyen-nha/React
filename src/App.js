import React, { useState } from "react";
import axios from "axios";
import { useEffect } from 'react';

import styles from "./App.css";
import Table from "./components/Table";
import moment from "moment";


const App = () => {
  const [costs, setCost] = useState([]);
  const [filterCost, setFilterCost] = useState([]);
  const [keyWord, setKeyWord] = useState('');

  useEffect(async () => {
    const listApi = [
      axios.get('http://api.marketstack.com/v1/eod?access_key=841f58161ddf378599e879af309e9a06&symbols=AAPL', {
        responseType: 'json',
      }),
      axios.get('http://api.marketstack.com/v1/eod?access_key=841f58161ddf378599e879af309e9a06&symbols=AAPL', {
        responseType: 'json',
      }),
      axios.get('http://api.marketstack.com/v1/eod?access_key=841f58161ddf378599e879af309e9a06&symbols=AAPL', {
        responseType: 'json',
      })
    ]
    await axios.all(listApi)
      .then(([res1, res2, res3]) => {
        const res1Format = res1?.data?.data.map((item) => ({ ...item, date: moment(item.date).format('YYYY-MM-DD') }));
        const res2Format = res2?.data?.data.map((item) => ({ ...item, date: moment(item.date).format('YYYY-MM-DD') }));
        const res3Format = res3?.data?.data.map((item) => ({ ...item, date: moment(item.date).format('YYYY-MM-DD') }));
        const cost = [...res1Format, ...res2Format, ...res3Format];
        
        setCost(cost);
        setFilterCost(cost);
      })
  }, []);

  const handleSearch = () => {
    let cloneFilterConst = [];
    if (keyWord) {
      console.log('keyWord: ', keyWord);
      cloneFilterConst = costs.filter((cost) => {
        const filterValue = Object.values(cost).find((value) => value == keyWord);
        if (filterValue) {
          return cost;
        }
      });
      setFilterCost(cloneFilterConst);
    } else {
      setFilterCost(costs);
    }
  }

  return (
    <main className={styles.container}>
      <div className={styles.searchContainer}>
        <input onChange={(event) => setKeyWord(event.target.value)} />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className={styles.wrapper}>
        <Table data={filterCost} rowsPerPage={10} />
      </div>
    </main>
  );
};

export default App;
