import { useEffect, useState } from 'react';
import { useCollaboration } from '@hooks/useCollaboration.hook.ts';
import { useAuthContext } from '@/context/AuthProvider.tsx';
import { Collaboration } from '@/types/Collaboration.ts';
import { LoadingSpinner } from '@components/LoadingSpinner.tsx';
import { CollaborationTab } from '@components/CollaborationTab.tsx';
import { useProfileContext } from '@/context/ProfileProvider.tsx';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const Collaborations = () => {
  const { t } = useTranslation();
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
  const { isLoading, getCollaborationsOf, getCollaborationsBetweenTwo } =
    useCollaboration();
  const { user, details } = useAuthContext();
  const { uid } = useProfileContext();

  useEffect(() => {
    if (!user || !uid || !details) {
      return;
    }

    const fetch = async () => {
      let data: Collaboration[] | undefined;

      if (user.uid === uid) {
        data = await getCollaborationsOf(uid);
      } else {
        const puid = details?.role === 'PARENT' ? user.uid : uid;
        const buid = details?.role === 'BABYSITTER' ? user.uid : uid;
        data = await getCollaborationsBetweenTwo(puid, buid);
      }

      setCollaborations(data || []);
    };

    fetch().then();
  }, [user, uid, details]);

  return isLoading ? (
    <LoadingSpinner />
  ) : collaborations.length > 0 ? (
    collaborations
      .sort((a, b) => (a?.state || 0) - (b?.state || 0))
      .map((collab: Collaboration) => (
        <CollaborationTab key={collab.collaborationId} collaboration={collab} />
      ))
  ) : (
    <Typography variant="h5">{t('collaboration.notFound')}</Typography>
  );
};
