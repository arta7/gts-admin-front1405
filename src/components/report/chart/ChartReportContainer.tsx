import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import ColumnChart from './ColumnChart';
import PieChart from './PieChart';


export default function ChartReport({chartsData}:any) {
  const [chartType, setChartType] = React.useState('pieChart');
    return (
       <>   
      <FormControl>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          نمودار 
        </InputLabel>
        <NativeSelect
         defaultValue={chartType}
         onChange={(e:any)=>setChartType(e.target.value)}
         inputProps={{
            name: 'chartType',
            id: 'uncontrolled-native',
          }}
        >
          <option value={'pieChart'}>نمودار دایره ای </option>
          <option value={'columnChart'}>نمودار میله ای</option>
          {/* <option value={'lineChart'}>نمودار خطی </option> */}
        </NativeSelect>
          </FormControl>
            {chartType == 'columnChart' ? <ColumnChart title={'نمودار میله ای '} data={chartsData ? chartsData : []} />
                : <PieChart title={'نمودار دایره ای'} data={chartsData ? chartsData : []} />}
    </>
  );
}
