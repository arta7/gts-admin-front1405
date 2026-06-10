import { useEffect } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import { useAsync } from '../../hooks/useAsync';
import { getReportTypeList } from './ReportServices';
import StaticCombo from './StaticCombo';

const SecondaryCombo = ({ value, onChange, subSystemId, systemId }: any) => {
    const { run, data: secondaryPartItems = [], isLoading, isIdle, isError, isSuccess } = useAsync(null);
    useEffect(() => {
        if (subSystemId) {
            run(getReportTypeList(systemId, subSystemId));
        }
    }, [subSystemId]);

    if (subSystemId == null) {
        return null;
    }
    if (isLoading) {
        return <BeatLoader color="#36d7b7" />
    }
    else if (isError) {
        return null;
    }

    return (
        <StaticCombo options={secondaryPartItems} label='بخش فرعی' onChange={onChange} value={value} />
    )
}


export default SecondaryCombo;