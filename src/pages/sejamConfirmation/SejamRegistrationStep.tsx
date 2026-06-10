import { Link, Paper, Typography } from '@mui/material'
import React from 'react'

const SejamRegistrationStep = () => {
    return (
        <div>
            <Typography>
                کاربر گرامی، در صورتیکه که تا کنون نسبت به دریافت کد بورسی اقدام نکرده اید، از طریق لینک <Link href="https://profilesejam.csdiran.ir/session" target="_blank">https://profilesejam.csdiran.ir/session</Link> جهت ثبت نام در سامانه سجام و دریافت کد بورسی اقدام نمایید.
                <ul>
                    <li>
                        <Link href="/files/register.pdf" target="_blank">فایل راهنمای ثبت نام سجام</Link >
                    </li>
                </ul>
            </Typography>
            <Typography fontSize={'1.25rem'}>
                <p>در صورتی که قبلا در سامانه سجام ثبت نام نموده اید با رفتن به مرحله بعد نسبت به تاییدیه کد سجام خود اقدام نمایید</p>
            </Typography>
        </div>
    )
}

export default SejamRegistrationStep;