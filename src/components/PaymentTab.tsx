import { Card, CardActions, CardHeader, IconButton } from '@mui/material';
import { KeyboardArrowRight } from '@mui/icons-material';
import { Payment } from '@/types/Payment.ts';
import { firestoreTimestampToDate } from '@util/util.ts';
import { format } from 'date-fns';
import PaymentIcon from '@mui/icons-material/Payment';
import { useNavigate } from 'react-router-dom';
import { localeTextMap } from '@config/i18n.ts';
import { useTranslation } from 'react-i18next';

interface PaymentTabProps {
  payment: Payment;
}

export const PaymentTab = ({ payment }: PaymentTabProps) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  return (
    <Card
      sx={{
        borderRadius: '15px',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <CardHeader
        title={
          payment.time
            ? format(firestoreTimestampToDate(payment.time), 'PP p', {
                locale: localeTextMap.get(i18n.language),
              })
            : ''
        }
        avatar={<PaymentIcon />}
      />
      <CardActions>
        <IconButton
          onClick={() =>
            navigate(
              `/collaboration/${payment?.collaboration?.collaborationId}`
            )
          }
          size="large"
        >
          <KeyboardArrowRight />
        </IconButton>
      </CardActions>
    </Card>
  );
};
