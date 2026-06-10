import * as examModule from '../staticData/SejamRiskTestExam.json';
import * as answerKeyModule from '../staticData/sejamRiskTestAnswerKeys.json';
import { SejamAccountType } from '../pages/sejamConfirmation/Types';

//@ts-ignore
export const sejamRiskTestQuestions = examModule.default;
//@ts-ignore
export const sejamAnswerKeys = answerKeyModule.default;

export const raveshAshnai = [
    'بازاریاب',
    'مراجعه به شعبه',
    'تبلیغات فضای مجازی',
    'تبلیغات محیطی /تلویزیون / روزنامه',
    'معرفی توسط دوستان'
];

export const jensiat = ['زن', 'مرد'];

export const vaziatTaahol = ['مجرد', 'متاهل'];

export const noeShoghl = [
    'مشاغل گروه مالی و کسب‌وکار',
    'مشاغل فنی مهندسی',
    'مشاغل گروه آموزش',
    'مشاغل گروه خدمات',
    'مشاغل گروه بهداشت و درمان',
    'مشاغل مدیریتی',
    'مشاغل حقوقی',
    'مشاغل نظامی'
].map((item: string, index: any) => ({ label: item, id: index }));

export const tahsilat = [
    'دیپلم',
    'لیسانس',
    'فوق لیسانس',
    'دکترا',
    'فوق دکترا'
].map((item: string, index: any) => ({ label: item, id: index }))

export const mokhatabVizhe = [
    'افراد نیکوکار و خیرین',
    'جانبازان',
    'خانواده شهدا و ایثارگران',
    'زنان خانه دار و سرپرست خانواده',
    'فرهنگیان',
    'معلولین'
].map((item: string, index: any) => ({ label: item, id: index }));

export const sejamUserTypes = ['محافظه كار ', 'تا حدودي محافظه كار', 'متعادل', 'تا حدودي ريسك پذير', 'ريسك پذير'];
export const sejamAccountTypes: Array<SejamAccountType> = [
    {
        id: 1,
        title: 'مطمئن',
        fixedCommissionPercentage: 2,
        variableCommissionPercentage: 22,
        investmentDuration: 1
    },
    {
        id: 2,
        title: 'اطمینان',
        fixedCommissionPercentage: 1.9,
        variableCommissionPercentage: 21,
        investmentDuration: 1
    },
    {
        id: 3,
        title: 'آرامش',
        fixedCommissionPercentage: 1.8,
        variableCommissionPercentage: 20,
        investmentDuration: 1
    },
    {
        id: 4,
        title: 'ابتکار',
        fixedCommissionPercentage: 1.7,
        variableCommissionPercentage: 19,
        investmentDuration: 1
    },
    {
        id: 5,
        title: 'اهرمی',
        fixedCommissionPercentage: 2,
        variableCommissionPercentage: 22,
        investmentDuration: 1
    },
    {
        id: 6,
        title: 'سه سهم',
        fixedCommissionPercentage: 2,
        variableCommissionPercentage: 22,
        investmentDuration: 1
    },
    {
        id: 7,
        title: 'دو سهم',
        fixedCommissionPercentage: 2,
        variableCommissionPercentage: 22,
        investmentDuration: 1
    },
    {
        id: 8,
        title: 'تک سهم',
        fixedCommissionPercentage: 2,
        variableCommissionPercentage: 22,
        investmentDuration: 1
    }
];

export const paymentTypes = [
    {
        id: 1,
        label: 'درگاه پرداخت'
    },
    {
        id: 2,
        label: 'واریز وجه'
    }
];