import { Accordion, AccordionDetails, AccordionSummary, Box, Tab, Tabs, Typography } from "@mui/material";
import * as React from 'react';
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import Grid from "../../components/grid/Grid";
import { getFromObject } from "../../utils/helpers";
import ReportFilters from "../../components/report/filters/ReportFilters";
import ChartReport from "../../components/report/chart/ChartReportContainer";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
 export function getFromArray(arr: any, key: any, field = "id") {
  function getValue(el:any, fields:any) {
    for (const _f of fields) {
      if (el.hasOwnProperty(_f)) el = el[_f];
      else return null;
    }
    return el;
  }

  let fields = field.split(".");
  for (const el of arr) if (getValue(el, fields) == key) return el;

  return null;
}
const StatisticsReport = ({ systemId,title }: any) => {
  const [value, setValue] = React.useState(1);
  const { user} = useAuth()
  let url = '/report/v1/api/get-specific-report-data'
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [chartsData, setChartsData]:any = React.useState([]);
  const [expanded, setExpanded] = React.useState(true);

  
  let getChartData = (data: any) => {
    let chartsData: { value: number | null; category: string; }[]=[]
 let key =Object.keys(data[0]);
    for (const x of key) {
      let j = 0;
      for (const i of data) {
        let result = getFromObject(i, x);
        if (typeof result === 'number') {
          j = (result + j)
        }
      }
      if (x != 'واحد') {
       chartsData.push({ value: j != 0 ? j : null, category: x })
      }
    }
    return chartsData;
  }
  let getColumns = (data:any) => {
    let key =Object.keys(data);
    let column = key?.map((k: any) => ({
      accessorKey: k,
      header: k,
    }));
    return column;
  }
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  

  const loaderReportData = (values:any) => {
    // console.log('test value =>',{
    //   subSystemId: values.subSystemId,
    //   statisticsReportId: values.specificReportId,
    //     //@ts-ignore 
    //   userId: user && user?.id,
    //     //@ts-ignore 
    //   workgroupId: user && user?.workgroups[0]?.workgroupId,
    //     //@ts-ignore 
    //   organizationId: user && user?.workgroups[0]?.organizations[0]?.organizationId,
    //     //@ts-ignore 
    // isManager: user && user?.workgroups[0]?.isManager,
    //   json:`[{"componentId":${values.componentId?values.componentId:1},"year":${Number(values.year) ? Number(values.year) : -1},"organizationId":${Number(values.organizationId) ? Number(values.organizationId) : -1}}]`,
    // })
    console.log('values',values)
    axios.post(url, {
      subSystemId: values.subSystemId,
      statisticsReportId: values.specificReportId,
        //@ts-ignore 
       userId: user && user?.id,
    //     //@ts-ignore 
       workgroupId: null,
    //     //@ts-ignore 
       organizationId: values.organizationId ? Number(values.organizationId) : -1,
    //     //@ts-ignore 
    // isManager: user && user?.workgroups[0].isManager,
      json:`[{"componentId":${values.componentId?values.componentId:1},"year":${Number(values.year) ? Number(values.year) : -1}
      ,"organizationId":${Number(values.organizationId) ? Number(values.organizationId) : -1}}]`,
    }).then((res) => {
      setRows(res.data.result)
      let _columns: any = getColumns(res.data.result[0])
     let _chartData:any= getChartData(res.data.result)
      setColumns(_columns)
      setChartsData(_chartData)  
    }).catch((error)=>{
      console.log('error',error)
    })
    
  }
  const onSubmit = (values: any) => { 
    setColumns([])
      setChartsData([])
    loaderReportData(values)
    
  }
  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
  return (
       <Box
        sx={{
        display: 'flex',
          justifyContent: 'flex-start',
        flexDirection: 'column',
          m: 2,
         
        }}
    >
       <Accordion expanded={expanded} onChange={() => { setExpanded(!expanded) }}>
                  <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
          </AccordionSummary>
           <AccordionDetails>
            <ReportFilters onSubmit={onSubmit} systemId={systemId} />
            </AccordionDetails>
   </Accordion>
        <Box
        sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        width: '100%',
        borderRadius: '3px',
        height: `calc(72vh)`,
        overflowY: 'auto',
         backgroundColor: '#fff',
          p: 1,
        mt: 2,
        }}
        > 
         
       
    <Box sx={{ bgcolor: 'background.paper', width:'100%',}}>
        <Tabs
        value={value}
         onChange={handleChange}    
         textColor='primary'
        indicatorColor='primary'
        aria-label="secondary tabs example"
          variant="fullWidth"
        >
                    <Tab value={1} label={"نمایش نمودار گزارش"} />
                      <Tab value={2} label={"نمایش لیست گزارش"} />
        </Tabs>
                <TabPanel value={value} index={1} >
                    {chartsData && chartsData.length !== 0 && <ChartReport chartsData={chartsData} />}           
                </TabPanel>
                <TabPanel value={value} index={2} >
                    {rows && rows.length !== 0 && <Grid columns={columns} rows={rows} />}
                </TabPanel>
    </Box>
      </Box>
      </Box>)
}
export default StatisticsReport;