import { useAuthContext } from '@/context/AuthProvider.tsx';
import { useEffect, useState } from 'react';
import { Meeting } from '@/types/Meeting.ts';
import { useMeeting } from '@hooks/useMeeting.hook.ts';
import { LoadingSpinner } from '@components/LoadingSpinner.tsx';
import { MeetingTab } from '@components/MeetingTab.tsx';
import { Grid2 } from '@mui/material';
import { useProfileContext } from '@/context/ProfileProvider.tsx';

export const Meetings = () => {
  const { user, details } = useAuthContext();
  const { uid } = useProfileContext();
  const { getMeetingsOf, getMeetingsBetweenTwo } = useMeeting();
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    if (!user || !details) {
      return;
    }

    const fetch = async () => {
      try {
        let data: Meeting[];

        if (user.uid === uid) {
          data = await getMeetingsOf(user.uid);
        } else {
          const puid = details.role === 'PARENT' ? user.uid : uid;
          const buid = details.role === 'BABYSITTER' ? user.uid : uid;

          data = await getMeetingsBetweenTwo(puid, buid);
        }

        setMeetings(data);
      } catch {
        setMeetings([]);
      }
    };

    fetch().then();
  }, [user, details]);

  return !meetings ? (
    <LoadingSpinner />
  ) : (
    <Grid2 container spacing={1} columns={{ sm: 1, md: 2, lg: 3 }}>
      {meetings.map(meeting => (
        <Grid2
          key={meeting.meetingId}
          size={{ sm: 1, md: 1, lg: 1 }}
          sx={{ width: '100%' }}
        >
          <MeetingTab meeting={meeting} />
        </Grid2>
      ))}
    </Grid2>
  );
};
