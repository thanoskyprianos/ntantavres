import { Avatar, Badge, Box, Stack, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dispatch, ReactNode, SyntheticEvent, useRef, useState } from 'react';
import { TFunction } from 'i18next';
import { Base64String } from '../types/Avatar.ts';
import {
  base64Size,
  ONE_MB,
  toBase64,
} from '../util/imageManipulation.util.ts';
import { useSnackbarContext } from '@/context/SnackbarProvider.tsx';

const badgeStyle = {
  bgcolor: 'primary.light',
  padding: '5px',
  borderRadius: '50%',
  display: 'flex',
  placeItems: 'center',
  cursor: 'pointer',
  '&:hover': {
    bgcolor: 'primary.main',
  },
};

interface AvatarInputProps {
  t: TFunction;
  setAvatarExt: Dispatch<Base64String>;
  children?: ReactNode;
}

export const AvatarInput = ({
  t,
  setAvatarExt,
  children,
}: AvatarInputProps) => {
  const dispatch = useSnackbarContext();

  const [avatar, setAvatar] = useState('');

  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (image?: File) => {
    if (!image) {
      return;
    }

    const b64 = await toBase64(image);
    if (base64Size(b64) >= ONE_MB) {
      dispatch!({
        type: 'warning',
        payload: { message: t('auth.avatarSizeExt') },
      });

      // clear file input
      if (imageInputRef.current) {
        imageInputRef.current.type = 'text';
        imageInputRef.current.type = 'file';
      }

      return;
    }

    setAvatar(b64);
    setAvatarExt(b64);
  };

  return (
    <Stack sx={{ alignItems: 'center' }} spacing={0.5}>
      <Box>
        <input
          type="file"
          accept="image/*"
          onChange={e =>
            e.target.files ? handleImageChange(e.target.files[0]) : {}
          }
          ref={imageInputRef}
          style={{ display: 'none' }}
        />
        <Badge
          badgeContent={
            <Box
              sx={badgeStyle}
              onClick={() =>
                imageInputRef.current && imageInputRef.current.click()
              }
            >
              <EditIcon sx={{ color: 'primary.contrastText' }} />
            </Box>
          }
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          overlap="circular"
        >
          <Badge
            badgeContent={
              avatar && (
                <Box sx={badgeStyle}>
                  <DeleteIcon sx={{ color: 'primary.contrastText' }} />
                </Box>
              )
            }
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            overlap="circular"
            onClick={() => setAvatar('')}
          >
            <Avatar
              src={avatar}
              sx={{
                height: '100px',
                width: '100px',
                border: '3px solid',
                borderColor: 'primary.light',
              }}
              onLoad={(e: SyntheticEvent<HTMLImageElement, Event>) =>
                URL.revokeObjectURL((e.target as HTMLImageElement).src)
              }
            >
              {children}
            </Avatar>
          </Badge>
        </Badge>
      </Box>
      {!avatar && (
        <Typography variant="caption" sx={{ color: 'primary.light' }}>
          {t('auth.avatarSize')}
        </Typography>
      )}
    </Stack>
  );
};
