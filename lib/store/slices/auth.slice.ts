import { setAuthToken, clearAuthToken, setUserData, getUserData, getAuthToken } from '@/lib/services/mmkv.service';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isSuperadmin: boolean;
}

// Initialize from MMKV
const initialToken = getAuthToken();
const initialUser = getUserData();

const initialState: AuthState = {
  token: initialToken || null,
  user: initialUser || null,
  isAuthenticated: !!initialToken,
  isSuperadmin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      
      // Persist to MMKV
      setAuthToken(action.payload.token);
      setUserData(action.payload.user);
    },
    setSuperadmin: (state, action: PayloadAction<boolean>) => {
      state.isSuperadmin = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.isSuperadmin = false;
      
      // Clear MMKV
      clearAuthToken();
    },
  },
});

export const { setCredentials, setSuperadmin, logout } = authSlice.actions;
export default authSlice.reducer;