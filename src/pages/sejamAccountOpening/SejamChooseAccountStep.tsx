import { styled, Typography } from '@mui/material';
import Box from '@mui/system/Box';
import React from 'react'
import Fieldset from '../../components/Fieldset';
import SejamSuggestAccount from '../../components/SejamSuggestAccount'
import { SejamAccountType } from '../sejamConfirmation/Types';
import AccountTypesCombo from './AccountTypesCombo';

const SejamChooseAccountStep = ({ suggestedAccount, riskLevel, selectedAccount, onSelectedAccountChange }: { suggestedAccount: Array<SejamAccountType>, selectedAccount: SejamAccountType | null, onSelectedAccountChange: (selectedAccount: SejamAccountType | null) => any, riskLevel: string }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Fieldset title='انتخاب حساب مبتنی بر سنجش ریسک'>
        <SejamSuggestAccount suggestedAccount={suggestedAccount} riskLevel={riskLevel} />
      </Fieldset>
      <Fieldset title='انتخاب حساب توسط مشتری'>
        <Typography sx={{ mb: '2rem' }}>
          در این روش با توجه به نظر خود می توانید حساب سرمایه گذاری را انتخاب کنید. انتخاب هر حساب سرمایه گذاری به منزله اطلاع شما از ریسک و میزان کارمزدهای آن حساب می باشد.
        </Typography>
        <AccountTypesCombo value={selectedAccount} onChange={onSelectedAccountChange} />
      </Fieldset>
    </Box>
  )
}

export default SejamChooseAccountStep;

