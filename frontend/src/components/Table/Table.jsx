import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Title/Title';
import { Button, TableContainer, TableFooter } from '@mui/material';

export default function MTable({ rowsData = [], columns = [], totalColumnId = null, footerButton = { message: '', onClick: () => {}}  }) {
  return (
    <TableContainer>
      <Title>Productos en el Carro</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            {
              columns.map(({ name }) => <TableCell key={name}>{name}</TableCell>)
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsData.map((rowData) => (
            <TableRow key={rowData.id}>
              {
                Object.entries(rowData).map(([key, value]) => {
                  return key !== 'id' ? <TableCell>{value}</TableCell> : null;
                })
              }
            </TableRow>
          ))}
        </TableBody>
        {
          totalColumnId ?
            <TableFooter>
              <TableRow>
                <TableCell align="right" colSpan={5}>
                  {
                    `Total = ${rowsData.reduce((accum, rowData) => {
                      accum += rowData[totalColumnId] ?? 0;
                      return accum;
                    }, 0)}`
                  }
                </TableCell>
              </TableRow>
              {
                footerButton ?
                  <TableRow>
                    <TableCell align="right" colSpan={columns.length}><Button onClick={footerButton.onClick}>{footerButton.message}</Button></TableCell>
                  </TableRow>
                  : null
              }
            </TableFooter>
            : null
        }
      </Table>
    </TableContainer>

  );
}