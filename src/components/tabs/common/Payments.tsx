import { useEffect, useState } from 'react';
import { Payment } from '@/types/Payment.ts';
import { useCollaboration } from '@hooks/useCollaboration.hook.ts';
import { useAuthContext } from '@/context/AuthProvider.tsx';
import { LoadingSpinner } from '@components/LoadingSpinner.tsx';
import { Typography } from '@mui/material';
import { PaymentTab } from '@components/PaymentTab.tsx';
import { useTranslation } from 'react-i18next';
import { firestoreTimestampToDate } from '@util/util.ts';

export const Payments = () => {
  const { user } = useAuthContext();
  const { t } = useTranslation();
  const [payments, setPayments] = useState<Payment[]>([]);
  const { isLoading, getPayments } = useCollaboration();

  useEffect(() => {
    if (!user || !user.uid) {
      return;
    }

    const fetch = async () => {
      const data = await getPayments(user.uid);
      console.log(data);
      setPayments(data || []);
    };

    fetch().then();
  }, [user]);

  return isLoading ? (
    <LoadingSpinner />
  ) : payments.length <= 0 ? (
    <Typography variant="h5">{t('payments.notFound')}</Typography>
  ) : (
    payments
      .sort(
        (a, b) =>
          firestoreTimestampToDate(a.time || new Date()).getTime() -
          firestoreTimestampToDate(b.time || new Date()).getTime()
      )
      .map(payment => <PaymentTab key={payment.paymentId} payment={payment} />)
  );
};
