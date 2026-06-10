import { styled } from '@mui/material';
import { StepIconProps } from '@mui/material/StepIcon';

const StepIcon = (props: StepIconProps & {icon:any}) => {
  const { active, completed, className,icon } = props;

  return (
    <StepIconRoot ownerState={{ completed, active }} className={className}>
      <img src={icon} style={{ width: '100%', height: '100%' }} />
    </StepIconRoot>
  );
}

export default StepIcon

const StepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 65,
  height: 65,
  padding: '12px',
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundColor:
      '#ffe3ae',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundColor:
      '#ffe3ae',
  }),
}));