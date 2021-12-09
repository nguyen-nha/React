import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import styled from 'styled-components'
import { useTable, usePagination } from 'react-table'


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

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 2 },
    },
    usePagination
  )

  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

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
          axios.get('http://api.marketstack.com/v1/eod?access_key=66d4f58c4f5a4dadd3c9ab7413861306&symbols=AAPL,FLC.XSTC,PVC.XSTC&limit=1000', {
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
