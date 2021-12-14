import React, { useState, useEffect } from 'react'
import moment from 'moment'
import Table from './table/table'
import axios from 'axios'


function History() {
    const columns = React.useMemo(
      () => [
        {
          Header: 'Symbol',
          accessor: 'symbol',
        },
        {
          Header: 'Date',
          accessor: 'date',
        },
        {
          Header: 'Open',
          accessor: 'open',
        },
        {
          Header: 'Close',
          accessor: 'close',
        },
        {
          Header: 'High',
          accessor: 'high',
        },
        {
          Header: 'Low',
          accessor: 'low',
        },
        {
          Header: 'Volume',
          accessor: 'volume',
        },
      ],
      []);

      const [costs, setCost] = useState([]);
      const [filterCost, setFilterCost] = useState([]);
      const [keyWord, setKeyWord] = useState('AAPL');
      const [btn, setBtn] = useState(0)
    
      useEffect(() => {
          axios.get('http://api.marketstack.com/v1/eod?access_key=9a59b0433afbaa3f0adfe7a26c239129&limit=1000&symbols=' + keyWord, {
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
      <>
        <div>
          <input onChange={(event) => setKeyWord(event.target.value)} />
          <button onClick={handleSearch}>Search</button>
        </div>
        <Table columns={columns} data={filterCost} />
      </>
    )
}

export default History
