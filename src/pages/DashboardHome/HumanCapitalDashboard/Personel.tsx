import React from 'react'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Header from '../Header';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

const rows = [
  { title: 'شرکت دخانيات ايران  ', count: 0 },
  { title: 'سنگ آهن مركزي ايران  ', count: 0 },
  { title: 'شرکت معادن اسفندقه  ', count: 0 },
  { title: 'شرکت زغالسنگ کرمان  ', count: 0 },
  { title: 'خدمات عمومی فولاد ایران  ', count: 0 },
  { title: 'شرکت شسبد  ', count: 0 },
  { title: ' توسعه مرآت كيش', count: 0 },
  { title: 'شرکت صبا ابنیه  ', count: 0 },
  { title: 'شرکت ساختمانی کار  ', count: 0 },
  { title: 'شرکت سرمایه گذاری  ', count: 0 },
]

const Personel = () => {
  return (
    <Root>
      <Header title={'آمار پرسنل شرکتهای تابعه'} />
      <Table aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              عنوان

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
                  {row.title}
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

export default Personel;

const Root = styled(Paper)(({ theme }) => ({
  gridArea: 'personel',
  overflow:'auto',
  '&::-webkit-scrollbar': {
    width: '0.4em',
    height: '50%',
  },
  '&::-webkit-scrollbar-track': {
    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '5px',
    maxHeight: '50%',
    backgroundColor: theme.palette.primary.main,
  },
}));


