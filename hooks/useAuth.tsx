import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { authService } from "../api";
import { User, AuthResponse } from "../types";
import Storage from "../utils/storage";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = await Storage.getItem("accessToken");
        if (token) {
          // In a real app, we would validate the token and fetch user data
          // For now, we'll just check if token exists
          // const response = await authService.getProfile();
          // setUser(response.data);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      const { user: userData, accessToken, refreshToken } = response.data;

      setUser(userData);
      await Storage.setItem("accessToken", accessToken);
      await Storage.setItem("refreshToken", refreshToken);
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData: any) => {
    try {
      const response = await authService.register(userData);
      const { user: newUser, accessToken, refreshToken } = response.data;

      setUser(newUser);
      await Storage.setItem("accessToken", accessToken);
      await Storage.setItem("refreshToken", refreshToken);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      await Storage.removeItem("accessToken");
      await Storage.removeItem("refreshToken");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    try {
      // Update user in the API
      const response = await authService.updateProfile(userData);
      const updatedUser = response.data;

      // Update local state
      setUser(updatedUser);

      // Optionally update in storage as well
      await Storage.setItem("userData", JSON.stringify(updatedUser));
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
