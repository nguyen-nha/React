import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import styled from 'styled-components'
import Table from './table'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`

function App() {
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
      const [keyWord, setKeyWord] = useState('');
    
      useEffect(() => {
          axios.get('http://api.marketstack.com/v1/eod?access_key=c4b2cf555fca7235468c503f63711377&symbols=AAPL,FLC.XSTC,PVC.XSTC&limit=1000', {
            responseType: 'json'
          })
          .then((res) => {
              const cost = res.data.data.map((item) => ({ ...item, date: moment(item.date).format('YYYY-MM-DD') }));
            
            setCost(cost);
            setFilterCost(cost);
          })
      }, []);
  
      const handleSearch = () => {
          let cloneFilterConst = [];
          if (keyWord) {
            console.log('keyWord: ', keyWord);
            cloneFilterConst = costs.filter((cost) => {
              const filterValue = Object.values(cost).find((value) => value === keyWord);
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
      <Styles>
        <div>
          <input onChange={(event) => setKeyWord(event.target.value)} />
          <button onClick={handleSearch}>Search</button>
        </div>
        <Table columns={columns} data={filterCost} />
      </Styles>
    )
}

export default App
