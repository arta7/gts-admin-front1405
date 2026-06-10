import { Box, styled, Typography } from '@mui/material';
import { sejamAccountTypes } from '../staticData/StaticData';

const SejamSuggestAccount = ({ suggestedAccount, riskLevel }: { suggestedAccount: any, riskLevel: string }) => {
  let suggestAccountMessage;
  if (suggestedAccount == 4 && suggestedAccount[0] == sejamAccountTypes[4]) {

  }
  if (suggestedAccount.length == 2) {
    suggestAccountMessage = <Typography>{`با توجه به آزمون سنجش ریسک، در اولویت اول حساب سرمایه گذاری ${<Typography fontWeight={600} color={'black'}>{suggestedAccount[0].title}</Typography>} و در اولویت دوم حساب سرمایه گذاری ${<b>{suggestedAccount[1].title}</b>} به شما پیشنهاد می شود.`}</Typography>
  }
  else {
    let suggestedAccountTitle = suggestedAccount.map((account: any) => account.title).join('-')
    suggestAccountMessage = <Typography> {`با توجه به سیستم سنجش ریسک، مناسب ترین حساب برای شما حساب ( `}<b>{suggestedAccountTitle}</b>{`  ) در نظر گرفته شده است.`}</Typography>
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <AcceptRiskLevel riskLevel={riskLevel} />
      {suggestAccountMessage}
      <Typography>
        در این مرحله با توجه پیشنهاد مطرح شده در آزمون سنجش ریسک و یا پیشنهادهای مشاورین، شما حساب سرمایه گذاری اختصاصی یا مشترک را که از نظر خودتان مناسب است، انتخاب می نمایید. انتخاب هر حساب سرمایه گذاری به منزله اطلاع شما از ریسک و میزان کارمزدهای آن حساب تلقی می گردد.
      </Typography>
    </Box>
  )
}

export const AcceptRiskLevel = ({ riskLevel }: { riskLevel: string }) => {
  return (
    <AcceptRiskLevelBanner>
      <Typography fontWeight={600} fontSize={'1.2rem'}>{`نتیجه آزمون سنجش ریسک :  ${riskLevel} `}</Typography>
    </AcceptRiskLevelBanner>
  )
}

export default SejamSuggestAccount;

const AcceptRiskLevelBanner = styled(Box)(({ theme: any }) => ({
  backgroundColor: '#ffe3ae',
  '&:hover': { backgroundColor: '#ffe3ae' },
  borderRadius: '3rem',
  padding: '1rem',
  textAlign: 'center'
}));


