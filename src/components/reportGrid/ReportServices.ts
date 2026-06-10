import { toast } from "react-toastify";
import axios from "../../utils/axios";
import { formatRequestBody } from "../../utils/Util";
import { Report } from "./ReportModal";

type ReportGridField = {
    id: number,
    caption: string
};

type ChildGridColumn = {
    aliasName: string,
    fieldCaption: string,
    fieldSortOrder: number
};

type SubSystem = {
    id: number,
    caption: string
};

export type exportToExcelReportParams = {
    userId: number,
    exclusiveReportId: number,
    workgroupId: number,
    organizationId: number,
    isManager: boolean,
    PageSize: number,
    PageNumber: number
}

const getAllReportColumnsApi = '/report/v1/api/get-component-field';
const getReportInformationApi = '/report/v1/api/get-component';
const createReportApi = '/report/v1/api/create';
const deleteReportApi = 'report/v1/api/remove';
const getReportListApi = '/report/v1/api/get-report-list';
const getReportGridColumnsApi = '/report/v1/api/get-report-structure';
const getReportDetailsByIdApi = '/report/v1/api/get-report-detail';
const exportReportApi = '/report/v1/api/loadReport';

export const getAllReportColumns = (reportType: number) => {
    console.log('reportType',reportType)
    return axios.get(`${getAllReportColumnsApi}/${reportType}`).then((res) => {
        return JSON.parse(res.data.result[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']);
    });
}

export const getMasterGridData = (subSystemId: number) => {
    return axios.get(`${getReportListApi}/${subSystemId}`);
}

export const getSubSystems = (systemId: number) => {
    return axios.get(`${getReportInformationApi}/${systemId}/-1`).then((res) => {
        const _options = formatOptions(res.data.result);
        return _options;
    }, (error) => {
        toast.error('خطا در دریافت اطلاعات بخش اصلی!!');
        throw error;
    })
}

export const getReportTypeList = (systemId: number, subSystemId: number) => {
    return axios.get(`${getReportInformationApi}/${systemId}/${subSystemId}`).then((res) => {
        const _options = formatOptions(res.data.result);
        return _options;
    }, (error) => {
        toast.error('خطا در دریافت اطلاعات بخش فرعی !');
        throw error;
    })
}

export const createReport = (report: Report, editMode: boolean) => {
    return axios.post(createReportApi, formatRequestBody(report)).then((res) => {
        toast.success(editMode ? 'گزارش با موفقیت ویرایش شد' : 'گزارش با موفقیت ایجاد شد');
        return res;
    });
}

export const deleteReport = (id: number) => {
    return axios.delete(`${deleteReportApi}/${id}`);
}

export const getChildGridColumns = (reportId: number) => {
    console.log('child reportid',reportIdز)
    return axios.get(`${getReportGridColumnsApi}/${reportId}`).then((res) => formatChildGridColumns(res.data.result));
}

const formatOptions = (data: Array<SubSystem>) => {
    return data.map((item: SubSystem) => {
        return {
            id: item.id,
            label: item.caption
        }
    });
}

const formatChildGridColumns = (data: Array<ChildGridColumn>) => {
    return data.sort((a: ChildGridColumn, b: ChildGridColumn) => {
        return a.fieldSortOrder - b.fieldSortOrder
    }).map((item: ChildGridColumn) => {
        return {
            accessorKey: item.aliasName,
            header: item.fieldCaption
        }
    })
}

export const getReportDetailsById = (reportId: number) => {
    return axios.get(`${getReportDetailsByIdApi}/${reportId}`).then((res) => {
        return res.data.result[0];
    })
}

export const exportToExcel = (params: exportToExcelReportParams) => {
    console.log('params')
    return axios.post(exportReportApi, {
        fileType: 'excel',
        ...params
    }).then((res) => {
        return res.data.result.data;
    })
}