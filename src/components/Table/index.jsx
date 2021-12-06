import React, { useState } from "react";

import useTable from "../../hooks/useTable";
import styles from "./Table.module.css";
import TableFooter from "./TableFooter";

const Table = ({ data, rowsPerPage }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  return (
    <>
      <table className={styles.table}>
        <thead className={styles.tableRowHeader}>
          <tr>
            <th className={styles.tableHeader}>Symbol</th>
            <th className={styles.tableHeader}>Date</th>
            <th className={styles.tableHeader}>Open</th>
            <th className={styles.tableHeader}>Close</th>
            <th className={styles.tableHeader}>High</th>
            <th className={styles.tableHeader}>Low</th>
            <th className={styles.tableHeader}>Volume</th>
          </tr>
        </thead>
        <tbody>
          {slice.map((el) => (
            <tr className={styles.tableRowItems} key={el.date}>
              <td className={styles.tableCell}>{el.symbol}</td>
              <td className={styles.tableCell}>{el.date}</td>
              <td className={styles.tableCell}>{el.open}</td>
              <td className={styles.tableCell}>{el.close}</td>
              <td className={styles.tableCell}>{el.high}</td>
              <td className={styles.tableCell}>{el.low}</td>
              <td className={styles.tableCell}>{el.volume}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default Table;
