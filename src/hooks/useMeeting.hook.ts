import {
  addDoc,
  and,
  collection,
  deleteDoc,
  getDocs,
  or,
  query,
  where,
} from '@firebase/firestore';
import { db } from '@config/firebase.ts';
import { Meeting, State } from '@/types/Meeting.ts';
import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';

const meetingsOf = (uid: string) =>
  query(
    collection(db, 'meeting'),
    or(where('puid', '==', uid), where('buid', '==', uid))
  );

const meetingsBetweenTwo = (puid: string, buid: string) =>
  query(
    collection(db, 'meeting'),
    and(where('puid', '==', puid), where('buid', '==', buid))
  );

const meetingsBetweenTwoPlanned = (puid: string, buid: string) =>
  query(
    collection(db, 'meeting'),
    and(
      where('puid', '==', puid),
      where('buid', '==', buid),
      where('state', '==', State.PLANNED)
    )
  );

const _getMeetingsOf = (uid: string) => {
  return getDocs(meetingsOf(uid));
};

const _getMeetingsBetweenTwo = (puid: string, buid: string) => {
  return getDocs(meetingsBetweenTwo(puid, buid));
};

const _getActiveMeetingsBetweenTwo = (puid: string, buid: string) => {
  return getDocs(meetingsBetweenTwoPlanned(puid, buid));
};

const _setMeeting = (meeting: Meeting) => {
  return addDoc(collection(db, 'meeting'), { ...meeting });
};

const _updateMeeting = (meetingId: string, meeting: Meeting) => {
  return updateDoc(doc(db, 'meeting', meetingId), { ...meeting });
};

const _deleteMeeting = (meetingId: string) => {
  return deleteDoc(doc(db, 'meeting', meetingId));
};

export const useMeeting = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getMeetingsOf = async (uid: string) => {
    setIsLoading(true);

    let data: Meeting[] | undefined;

    try {
      data = (await _getMeetingsOf(uid)).docs.map(doc => {
        const meeting = doc.data() as Meeting;
        meeting.meetingId = doc.id;

        return meeting;
      });
    } catch {
      throw new Error();
    } finally {
      setIsLoading(false);
    }

    return data;
  };

  const getMeetingsBetweenTwo = async (puid: string, buid: string) => {
    setIsLoading(true);

    let data: Meeting[] | undefined;

    try {
      data = (await _getMeetingsBetweenTwo(puid, buid)).docs.map(doc => {
        const meeting = doc.data() as Meeting;
        meeting.meetingId = doc.id;

        return meeting;
      });
    } catch {
      throw new Error();
    } finally {
      setIsLoading(false);
    }

    return data;
  };

  const getActiveMeetingsBetweenTwo = async (puid: string, buid: string) => {
    setIsLoading(true);

    let data: Meeting[] | undefined;

    try {
      data = (await _getActiveMeetingsBetweenTwo(puid, buid)).docs.map(doc => {
        const meeting = doc.data() as Meeting;
        meeting.meetingId = doc.id;

        return meeting;
      });
    } catch (err) {
      console.log(err);
      throw new Error();
    } finally {
      setIsLoading(false);
    }

    return data;
  };

  const setMeeting = async (puid: string, buid: string, meeting: Meeting) => {
    if (!(meeting.puid === puid && meeting.buid === buid)) {
      throw new Error('uids not set');
    }

    meeting.creation = new Date();
    meeting.state = State.PLANNED;

    setIsLoading(true);

    try {
      await _setMeeting(meeting);
    } catch {
      throw new Error('set error');
    } finally {
      setIsLoading(false);
    }
  };

  const updateMeeting = async (meetingId: string, meeting: Meeting) => {
    setIsLoading(true);

    try {
      await _updateMeeting(meetingId, meeting);
    } catch (err) {
      console.log(err);
      throw new Error();
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMeeting = async (meetingId: string) => {
    setIsLoading(true);

    try {
      await _deleteMeeting(meetingId);
    } catch {
      throw new Error();
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    getMeetingsOf,
    getMeetingsBetweenTwo,
    getActiveMeetingsBetweenTwo,
    setMeeting,
    deleteMeeting,
    updateMeeting,
  };
};
