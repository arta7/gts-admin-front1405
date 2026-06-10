import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import Captcha from '../../components/Captcha';

import LoadingButton from '../../components/LoadingButton';
import { useAsync } from '../../hooks/useAsync';
import useCountdown from '../../hooks/useCountDown';
import { sejamErrors, sejamUnknownError } from '../../utils/Messages';
import OtpModal from './OtpModal';
import { sendOtp, getSejamStatus, getSejamProfile } from './SejamServices';
import SejamProfileView from './SejamProfileView';
import { useSejamCountDownContext } from '../../contexts/CountDownContext';
import { useAuth } from '../../contexts/AuthContext';

const SejamConfirmationStep = ({ user, onSuccess }: { user: any, onSuccess: (user: any) => void }) => {
  const { run, isLoading } = useAsync(null);
  // const { user: {nationalCode} } = useAuth();
  const [openOtpModal, setOpenOtpModal] = useState<boolean>(false);
  const [sejami, setSejami] = useState(false);
  const captchaRef = useRef<any>();
  const nationalCode = "2150232537";
  const onReset = () => {
    startResendOtp();
    startValidOtpCode();
  }

  const { resendOtpMinutes, ResendOtpSeconds, startResendOtp,
    validOtpCodeMinutes, validOtpCodeSeconds, startValidOtpCode } = useSejamCountDownContext();

  const timer = `${resendOtpMinutes}:${ResendOtpSeconds}`;
  const valiCodeTimer = `${validOtpCodeMinutes}:${validOtpCodeSeconds}`;
  const enableGetProfileButton = timer == "00:00" || timer == "02:00";

  const getSejamConfirmationCode = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): any => {
    const isValidCaptcha = captchaRef.current.handleSubmit(e);
    if (isValidCaptcha) {
      if (!enableGetProfileButton) {
        setOpenOtpModal(true);
        return;
      }
      run(validateUserInSejam()).then((isValid) => {
        if (isValid) {
          setOpenOtpModal(true);
          startResendOtp();
          startValidOtpCode();
        }
      }).catch(error => {
        toast.error(sejamUnknownError);
        captchaRef.current.refresh();
      });
    }
  };

  const isSejami = () => {
    return new Promise(resolve => {
      if (sejami) {
        resolve(true);
      }
      else {
        return getSejamStatus(nationalCode).then((data: any) => {
          console.log('data response : ',data)
          const { status, providerError, errorCode } = data;
          if (providerError == "socket hang up") {
            handleError(sejamUnknownError);
            resolve(false);
          }
          else if (errorCode) {
            //@ts-ignore
            const errorMessage = sejamErrors[errorCode];
            handleError(errorMessage || sejamUnknownError)
            resolve(false);
          }
          else {
            const valid = status === "Sejami";
            resolve(valid);
          }
        })
      }
    })
  }

  const validateUserInSejam = () => {
    return isSejami().then((isSejami) => {
      if (isSejami) {
        setSejami(true);
        return sendOtp(nationalCode)
          .then(() => true);
      }
      return false;
    })
  }

  const handleCloseOtpModal = (code?: string) => {
    if (code) {
      getSejamProfile(nationalCode, code).then((data) => {
        const { errorCode } = data;
        if (errorCode) {
          //@ts-ignore
          const errorMessage = sejamErrors[errorCode];
          handleError(errorMessage || sejamUnknownError)
        }
        else {
          onSuccess(data);
        }
      })
    }
    setOpenOtpModal(false)
  }

  function handleError(error: string) {
    toast.error(error);
    captchaRef.current.refresh();
  }

  return (
    <div>
      <ul>
        <li>
          <Typography>
            استعلام تاییدیه سجام بر اساس کد ملی که در هنگام ثبت نام وارد نموده اید صورت میگیرد.
            (کد ملی:  <span>{nationalCode}</span>)

          </Typography>
        </li>
        <li>
          <Typography>
            بعد از ثبت نام سجام، جهت دریافت کد اختصاصی سبدگردانی،  احراز هویت سجام از طریق دفاتر پیشخوان، کارگزاری، بانک و یا بصورت الکترونیکی الزامی می باشد.

          </Typography>
        </li>
        <li>
          <Typography>
            در صورتی که قبلا تاییدیه سجام را دریافت نموده و اطلاعات شخصی خود را مشاهده می نمایید، می توانید جهت بروز رسانی اطلاعات شخصی خود از سامانه سجام، مجددا اقدام نمایید.

          </Typography>
        </li>
      </ul>
      <Typography component={'span'} variant={'h6'} sx={{ ml: '30px' }}>کدملی:<Typography component={'span'} color={'#C86222'} fontSize={'1.2rem'}>{nationalCode}</Typography></Typography>
      <Box sx={{ display: 'flex', flexDirection: "column", gap: '1rem', alignItems: 'start', mt: '2rem' }}>
        <div>
          <Captcha onSuccess={() => { }} ref={captchaRef} />
        </div>
        <LoadingButton loading={isLoading} sx={{ margin: '.5rem' }} variant='contained' onClick={getSejamConfirmationCode}>دریافت کد تایید سجام</LoadingButton>
        {user &&
          <SejamProfileView profile={user} />
        }
      </Box>
      <OtpModal open={openOtpModal} onClose={handleCloseOtpModal} timer={timer} resetTimer={onReset}
        disableResetTimer={!enableGetProfileButton} validCodeTimer={valiCodeTimer} />
    </div>
  )
}

export default SejamConfirmationStep;
