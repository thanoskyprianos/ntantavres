import { useEffect, useState } from 'react';
import { useCollaboration } from '@hooks/useCollaboration.hook.ts';
import { useAuthContext } from '@/context/AuthProvider.tsx';
import { Collaboration } from '@/types/Collaboration.ts';
import { LoadingSpinner } from '@components/LoadingSpinner.tsx';
import { CollaborationTab } from '@components/CollaborationTab.tsx';
import { useProfileContext } from '@/context/ProfileProvider.tsx';

export const Collaborations = () => {
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
  const { isLoading, getCollaborationsOf } = useCollaboration();
  const { user } = useAuthContext();
  const { uid } = useProfileContext();

  useEffect(() => {
    if (!user || !uid) {
      return;
    }

    const fetch = async () => {
      const data = await getCollaborationsOf(uid);
      setCollaborations(data || []);
    };

    fetch().then();
  }, [user, uid]);

  return isLoading ? (
    <LoadingSpinner />
  ) : collaborations.length > 0 ? (
    collaborations
      .sort((a, b) => (a?.state || 0) - (b?.state || 0))
      .map((collab: Collaboration) => (
        <CollaborationTab collaboration={collab} />
      ))
  ) : (
    <p>bruh</p>
  );
};
