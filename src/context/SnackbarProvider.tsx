import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from 'react';
import { Alert, Snackbar } from '@mui/material';

interface SnackbarStateType {
  open?: boolean;
  message?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  timeout?: number;
}

const initialState: SnackbarStateType = {
  open: false,
  message: '',
  type: 'success',
  timeout: 2,
};

interface ActionType {
  type: 'success' | 'info' | 'warning' | 'error' | 'close';
  payload?: { message: string; timeout?: number };
}

const reducer = (
  state: SnackbarStateType,
  action: ActionType
): SnackbarStateType => {
  switch (action.type) {
    case 'success':
      return {
        open: true,
        message: action.payload?.message,
        timeout: action.payload?.timeout || 2,
        type: 'success',
      };
    case 'info':
      return {
        open: true,
        message: action.payload?.message,
        timeout: action.payload?.timeout || 2,
        type: 'info',
      };
    case 'warning':
      return {
        open: true,
        message: action.payload?.message,
        timeout: action.payload?.timeout || 2,
        type: 'warning',
      };
    case 'error':
      return {
        open: true,
        message: action.payload?.message,
        timeout: action.payload?.timeout || 2,
        type: 'error',
      };
    case 'close':
      return { ...state, open: false };
    default:
      throw new Error('Action not supported');
  }
};

const SnackbarContext = createContext<Dispatch<ActionType> | null>(null);
export const useSnackbarContext = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [snackbarState, snackbarDispatch] = useReducer(reducer, initialState);

  return (
    <SnackbarContext.Provider value={snackbarDispatch}>
      {children}
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={(snackbarState.timeout || 2) * 1000}
        onClose={() => snackbarDispatch({ type: 'close' })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{
          '&.MuiSnackbar-root': { bottom: '75px' },
        }}
      >
        <Alert variant="filled" severity={snackbarState.type}>
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
