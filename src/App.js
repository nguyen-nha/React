import React, { useState } from "react";
import axios from "axios";
import { useEffect } from 'react';

import styles from "./App.css";
import Table from "./components/Table";


function Content() {
  const [costs, setCost] = useState([])

  useEffect(() => {
    axios.get('http://api.marketstack.com/v1/eod?access_key=9543de3b997f0149c438d866f4b6f474&symbols=AAPL', {
      responseType: 'json',
    })
      .then(res => {
        const cost = res.data.data;
        setCost(cost);
    })
  }, [])
  return costs
}

const App = () => {

  return (
    <main className={styles.container}>
      <div className={styles.wrapper}>
        <Table data={Content()} rowsPerPage={10} />
      </div>
    </main>
  );
};

export default App;
