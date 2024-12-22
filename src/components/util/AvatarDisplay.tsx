import { Avatar, SxProps } from '@mui/material';
import { ReactNode, SyntheticEvent } from 'react';
import { Base64String } from '@/types/Avatar.ts';

interface AvatarDisplayProps {
  sx?: SxProps;
  avatar?: Base64String;
  children?: ReactNode;
}

export const AvatarDisplay = ({ sx, avatar, children }: AvatarDisplayProps) => {
  return (
    <Avatar
      src={avatar}
      sx={sx}
      onLoad={(e: SyntheticEvent<HTMLImageElement, Event>) =>
        URL.revokeObjectURL((e.target as HTMLImageElement).src)
      }
    >
      {children}
    </Avatar>
  );
};
