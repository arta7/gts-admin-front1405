import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/system/Unstable_Grid';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import { ExcelMediaType } from '../../utils/Util';
import { Option } from '../AsyncCombo';
import useConfirmDialog from '../ConfirmDialog/UseConfirmDialog';
import Grid from '../grid/Grid';
import PrimaryCombo from './PrimaryCombo';
import ReportModal, { Report } from './ReportModal';
import { deleteReport, exportToExcel, getAllReportColumns, getChildGridColumns, getMasterGridData, getReportDetailsById } from './ReportServices';
import SecondaryCombo from './SecondaryCombo';

const getReportDataApi = '/report/v1/api/get-report-data';

const msterGridColumns = [
  {
    accessorKey: 'title',
    header: 'عنوان گزارش'
  }
];

const ReportGrid = ({ info, systemId }: any) => {
  const [primaryPart, setPrimaryPart] = useState<Option | null>();
  const [secondaryPart, setSecondaryPart] = useState<Option | null>();
  const [reportList, setReportList] = useState<any>([]);
  const [reportColumns, setReportColumns] = useState<any>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>();
  const [openReportModal, setOpenReportModal] = React.useState(false);
  const [allReportColumns, setAllReportColumns] = useState<Array<{ id: number, caption: string }>>([]);
  const [editableReportInfo, setEditableReportInfo] = useState<any>();


  const { confirm } = useConfirmDialog();
  const { user }: any = useAuth()



  const loadMasterGridData = (reportTypeId: number) => {
    console.log('reportTypeId',reportTypeId)
    return getMasterGridData(reportTypeId).then((res) => {
      let data = res.data.result;
      data = data.map((item: any) => ({ ...item, createDate: '2010/10/10', user: "Parastoo" }));
      setReportList(data);
    }, (error) => {
      toast.error('خطا در دریافت لیست گزارش ها!');
    })
  }

  const getReportColumns = (reportId: number) => {
    console.log('reportId',reportId)
    getChildGridColumns(reportId).then((data) => {
      setReportColumns(data);
    }).catch((error: any) => {
      toast.error('خطا در دریافت ستون گرید گزارش ها!')
    });
  };

  const handlePrimaryPartChange = (_subSystem: Option | null) => {
    setPrimaryPart(_subSystem);
    setSecondaryPart(null);
    reset(null);
  }

  const handleSecondaryPartChange = (value: Option | null) => {
    setSecondaryPart(value);
    reset(value);
  }

  const reset = (_secondaryPartValue: Option | null) => {
    setSelectedReport(null);
    setReportColumns([]);
    setAllReportColumns([]);
    if (_secondaryPartValue != null) {
      loadMasterGridData(_secondaryPartValue.id);
    }
    else {
      setReportList([]);
    }
  }

  const handleMasterGridRowClicked = (row: any, index: number): void => {
     setSelectedReport(row);
     getReportColumns(row?.id)
  }

  const handleCloseReportModal = (success: boolean, reportId?: number) => {
    setOpenReportModal(false);
    setEditableReportInfo(null);
    if (success) {
      loadMasterGridData(secondaryPart!.id);
      if (selectedReport && selectedReport.id == reportId) {
        getReportColumns(selectedReport.id)
      }
    }
  }

  const onAdd = () => {
    loadAllReportColumns().then(() => {
      setOpenReportModal(true);
    })
  }

  const onEdit = (row: any) => {
    loadAllReportColumns().then(() => {
      return getReportDetailsById(row.id);
    }).then(data => {
      setEditableReportInfo(data);
      setOpenReportModal(true);
    })
  }

  const loadAllReportColumns = () => {
    return new Promise((res) => {
      if (allReportColumns.length == 0) {
        getAllReportColumns(secondaryPart!.id).then((columns) => {
          setAllReportColumns(columns);
          res(true)
        }).catch(() => {
          toast.error('خطا در دریافت ستون گزارش ها!');
        })
      }
      else {
        res(true);
      }
    })
  }

  const onDelete = (row: any) => {
    confirm(`آیا میخواهید گزارش '${row.title}' را حذف کنید؟`).then((isConfirmed) => {
      if (isConfirmed) {
        deleteReport(row.id).then(() => {
          toast.success('گزارش با موفقیت حذف شد');
          if (selectedReport && selectedReport!.id == row.id) {
            setSelectedReport(null);
            setReportColumns([]);
          }
          loadMasterGridData(secondaryPart!.id);
        }).catch((error) => {
          toast.error('خطا در حذف گزارش');
        })
      }
    })
  }

  const getGridDataParams = () => {
    console.log('tets params',selectedReport)
    //const workgroup = user?.workgroups[0];
    return {
      exclusiveReportId: selectedReport!.id,
      userId: user?.id,
      workgroupId: null,//workgroup.workgroupId,
      organizationId: null,//  workgroup.organizations[0].organizationId,
      isManager: true /*workgroup.isManager*/
    }
  };

  const getExcelOutput = (PageNumber: number, PageSize: number) => {
    // exportToExcel({...getGridDataParams(), PageNumber, PageSize })
    //   .then((data) => {
    //     let alink = document.createElement('a');
    //     alink.href = ExcelMediaType + data;
    //     alink.download = `${selectedReport?.title}.xlsx`;
    //     alink.click();
    //   })
    //   .catch((err: any) => {
    //     toast.error('خطا در گزارش اکسل');
    //   })
  }

  return (
    <ReportRoot padding={2}>
      <MuiGrid container spacing={2}>
        <MuiGrid xs={12} xl={5}>
          <PrimaryCombo value={primaryPart} onChange={handlePrimaryPartChange} systemId={systemId} />
        </MuiGrid>
        <MuiGrid xs={12} xl={5}>
          <SecondaryCombo value={secondaryPart} onChange={handleSecondaryPartChange} systemId={systemId} subSystemId={primaryPart?.id} />
        </MuiGrid>
        <MuiGrid xs={12}>
          {
            secondaryPart && <Grid id='masterGrid' pageSize={5} paging={true} rows={reportList} columns={msterGridColumns} addRowNumber={true}
              onRowClick={handleMasterGridRowClicked} onAdd={onAdd} onEdit={onEdit} onDelete={onDelete}
              exportToExcel={getExcelOutput} exportable={true} />
          }
          {
            selectedReport && <Grid addRowNumber={true} key={selectedReport?.id} id={'childGrid'}
              columns={reportColumns} url={`${getReportDataApi}`}
              getDataParams={getGridDataParams()} exportToExcel={getExcelOutput} pageSize={5} />
          }
        </MuiGrid>
      </MuiGrid>
      {
        openReportModal && <ReportModal open={openReportModal} onClose={handleCloseReportModal} gridColumns={allReportColumns} report={editableReportInfo} reportType={secondaryPart as Option} />
      }
    </ReportRoot>
  )
}

export default ReportGrid

const ReportRoot = styled(Box)(({ theme }) => ({
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    width: '0.6em',
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
  height: 'calc(100vh - 64px)'
}));