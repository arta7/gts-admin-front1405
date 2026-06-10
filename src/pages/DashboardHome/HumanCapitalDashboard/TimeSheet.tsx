import React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Header from '../Header';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

const rows=[
  {state:'حاضر',count:30},
  {state:'غایب',count:15},
  {state:'مامور',count:2},
  {state:'مرخصی',count:6}
]

const TimeSheet = () => {
  return (
    <Root>
      <Header title={'حضور و غیاب پرسنل'} />
      <Table aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              وضعیت

            </TableCell>
            <TableCell>
              تعداد
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            rows.map(row=>{
              return  <TableRow>
              <TableCell>
                  {row.state}
              </TableCell>
              <TableCell>
                  {row.count}
              </TableCell>
            </TableRow>
            })
          }
        </TableBody>
      </Table>
    </Root>
  )
}

export default TimeSheet;

const Root = styled(Paper)(({ theme }) => ({
  gridArea: 'timesheet'
}));
