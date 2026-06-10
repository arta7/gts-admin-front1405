import Box from '@mui/material/Box';
import { useEffect } from 'react';
import GridLoader from 'react-spinners/GridLoader';
import { useAsync } from '../../hooks/useAsync';
import { getSubSystems } from './ReportServices';
import StaticCombo from './StaticCombo';

const PrimaryCombo = ({ value, onChange, systemId }: any) => {
    const { run, data: subSystems = [], isLoading, isIdle, isError, isSuccess } = useAsync(null);
    useEffect(() => {
        run(getSubSystems(systemId));
    }, [systemId]);

    if (isLoading) {
        return <Box padding={2}>
            <GridLoader color="#36d7b7" />
        </Box>
    }
    else if (isError) {
        return null;
    }

    return (
        <StaticCombo options={subSystems} label='بخش اصلی' onChange={onChange} value={value} />
    )
}


export default PrimaryCombo;