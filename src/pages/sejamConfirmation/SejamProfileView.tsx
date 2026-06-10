import { styled, Typography } from '@mui/material'
import Grid from '@mui/system/Unstable_Grid'
import { format } from 'date-fns-jalali'
import React from 'react'
import Fieldset from '../../components/Fieldset'
import { jensiat } from '../../staticData/StaticData'
import { Gender, Profile } from './Types'

const SejamProfileView = ({ profile }: { profile: Profile }) => {
    const { privatePerson, jobInfo, accounts, addresses, agent } = profile;
    const address = addresses && addresses.length && addresses[0];
    const account = accounts && accounts.length && accounts[0];
    return (
        <Root>
            <Fieldset title={'مشخصات شخص حقیقی'}>
                <Grid container>
                    <Section title='نام' value={privatePerson.firstName} />
                    <Section title='نام خانوادگی' value={privatePerson.lastName} />
                    <Section title='جنسیت' value={privatePerson.gender == 'مرد' ? jensiat[1] : jensiat[0]} />
                    <Section title='نام پدر' value={privatePerson.fatherName} />
                    <Section title='تاریخ تولد' value={format(new Date(privatePerson.birthDate), 'yyyy/MM/dd')} />
                    <Section title='محل تولد' value={privatePerson.placeOfBirth} />
                    <Section title='شماره شناسنامه' value={privatePerson.shNumber} />
                    <Section title='سریال شناسنامه' value={privatePerson.serial} />
                    <Section title='بخش عددی سری شناسنامه' value={privatePerson.seriSh} />
                    <Section title='بخش حروفی سری شناسنامه' value={privatePerson.seriShChar} />
                    <Section title='محل صدور شناسنامه' value={privatePerson.placeOfIssue} />
                </Grid>
            </Fieldset>
            {
                address && <Fieldset title={'نشانی'}>
                    <Grid container>
                        <Section title='کد پستی' value={address.postalCode} />
                        <Section title='کشور' value={address.country.name} />
                        <Section title='استان' value={address.province.name} />
                        <Section title='شهر' value={address.city.name} />
                        <Section title='بخش' value={address.section.name} />
                        <Section title='خیابان' value={address.remnantAddress} />
                        <Section title='کوچه' value={address.alley} />
                        <Section title='پلاک' value={address.plaque} />
                        <Section title='پیش شماره کشور' value={address.countryPrefix} />
                        <Section title='پیش شماره شهر' value={address.cityPrefix} />
                        <Section title='پیش شماره تلفن ثابت' value={address.emergencyTelCityPrefix} />
                        <Section title='تلفن ثابت' value={address.tel} />
                        <Section title='شماره همراه اضطراری' value={address.mobile} />
                        <Section title='پست الکترونیکی' value={address.email} />
                    </Grid>
                </Fieldset>
            }
            <Fieldset title={'مشخصات شغلی'}>
                <Grid container>
                    <Section title={'نشانی محل کار'} value={jobInfo.companyAddress} />
                    <Section title='پیش شماره شهر' value={jobInfo.companyCityPrefix} />
                    <Section title='پست الکترونیکی محل کار' value={jobInfo.companyEmail} />
                    <Section title='شماره دورنگار محل کار' value={jobInfo.companyFax} />
                    <Section title='پیش شماره دورنگار' value={jobInfo.companyFaxPrefix} />
                    <Section title='نام نهاد/سازمان محل کار' value={jobInfo.companyName} />
                    <Section title='شماره تلفن ثابت محل کار' value={jobInfo.companyPhone} />
                    <Section title='کد پستی محل کار' value={jobInfo.companyPostalCode} />
                    <Section title='تارنمای محل کار' value={jobInfo.companyWebSite} />
                    <Section title='تاریخ اشتغال' value={jobInfo.employmentDate} />
                    <Section title='عنوان شغل' value={jobInfo.job.title} />
                    <Section title='توضیحات شغل' value={jobInfo.jobDescription} />
                    <Section title='سمت' value={jobInfo.position} />
                </Grid>
            </Fieldset>
            {
                account && <Fieldset title={'مشخصات بانکی'}>
                    <Grid container>
                        <Section title='شماره حساب' value={account.accountNumber} />
                        <Section title='نام بانک' value={account.bank.title} />
                        <Section title='شهر شعبه بانک' value={account.branchCity.name} />
                        <Section title='کد شعبه' value={account.branchCode} />
                        <Section title='نام شعبه' value={account.branchName} />
                        <Section title='شماره شبا' value={account.sheba} />
                        <Section title='نوع حساب' value={account.type} />
                        <Section title='شماره حساب پیش فرض' value={account.isDefault} />
                    </Grid>
                </Fieldset>
            }
            {agent && <Fieldset title={'مشخصات نماینده'}>
                <Grid container>
                    <Section title='نوع نماینده' value={agent.type} />
                    <Section title='تاریخ انقضای نمایندگی' value={agent.expirationDate} />
                    <Section title='نام' value={agent.firstName} />
                    <Section title='نام خانوادگی' value={agent.lastName} />
                    <Section title='کد ملی' value={agent.uniqueIdentifier} />
                    <Section title='توضیحات' value={agent.description} />
                </Grid>
            </Fieldset>}
        </Root>
    )
}

export default SejamProfileView;

const Section = ({ title, value }: { title: string, value: any }) =>
    <Grid xs={12} sm={4}><SectionRoot>
        <Typography fontWeight={'bold'} component='div'>{title}</Typography>:<Typography component='div'>{value || 'اطلاعات تست'}</Typography>
    </SectionRoot></Grid>;

const Root = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
}));

const SectionRoot = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    gap: '.5rem'
}));
