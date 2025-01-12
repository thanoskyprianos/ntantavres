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
    or(where('uida', '==', uid), where('uidb', '==', uid))
  );

const meetingsBetweenTwo = (uida: string, uidb: string) =>
  query(
    collection(db, 'meeting'),
    or(
      and(where('uida', '==', uida), where('uidb', '==', uidb)),
      and(where('uida', '==', uidb), where('uidb', '==', uida))
    )
  );

const meetingsBetweenTwoPlanned = (uida: string, uidb: string) =>
  query(
    collection(db, 'meeting'),
    and(
      or(
        and(where('uida', '==', uida), where('uidb', '==', uidb)),
        and(where('uida', '==', uidb), where('uidb', '==', uida))
      ),
      where('state', '==', State.PLANNED)
    )
  );

const _getMeetingsOf = (uid: string) => {
  return getDocs(meetingsOf(uid));
};

const _getMeetingsBetweenTwo = (uida: string, uidb: string) => {
  return getDocs(meetingsBetweenTwo(uida, uidb));
};

const _getActiveMeetingsBetweenTwo = (uida: string, uidb: string) => {
  return getDocs(meetingsBetweenTwoPlanned(uida, uidb));
};

const _setMeeting = (meeting: Meeting) => {
  return addDoc(collection(db, 'meeting'), { ...meeting });
};

const _deleteMeeting = (meetingId: string) => {
  return deleteDoc(doc(db, 'meeting', meetingId));
};

const _setInactive = (meetingId: string) => {
  return updateDoc(doc(db, 'meeting', meetingId), { active: false });
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

  const getMeetingsBetweenTwo = async (uida: string, uidb: string) => {
    setIsLoading(true);

    let data: Meeting[] | undefined;

    try {
      data = (await _getMeetingsBetweenTwo(uida, uidb)).docs.map(doc => {
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

  const getActiveMeetingsBetweenTwo = async (uida: string, uidb: string) => {
    setIsLoading(true);

    let data: Meeting[] | undefined;

    try {
      data = (await _getActiveMeetingsBetweenTwo(uida, uidb)).docs.map(doc => {
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

  const setMeeting = async (uida: string, uidb: string, meeting: Meeting) => {
    if (
      !(
        (meeting.uida === uida && meeting.uidb === uidb) ||
        (meeting.uida === uidb && meeting.uidb === uida)
      )
    ) {
      throw new Error('uids not set');
    }

    meeting.creation = new Date();
    meeting.state = State.PLANNED;

    setIsLoading(true);

    try {
      await _setMeeting(meeting);
    } catch (err) {
      console.log(err);
      throw new Error('set error');
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

  const setInactive = async (meetingId: string) => {
    setIsLoading(true);

    try {
      await _setInactive(meetingId);
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
    setInactive,
  };
};
