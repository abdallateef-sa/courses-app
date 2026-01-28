import Storage from "./storage";

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profileImage?: string;
  educationLevel: "primary" | "middle" | "high";
  grade: number;
}

const USER_DATA_KEY = "userData";
const IS_LOGGED_IN_KEY = "isLoggedIn";

export const saveUserData = async (userData: UserData): Promise<void> => {
  try {
    await Storage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    await Storage.setItem(IS_LOGGED_IN_KEY, "true");
  } catch (error) {
    console.error("Error saving user data:", error);
    throw error;
  }
};

export const getUserData = async (): Promise<UserData | null> => {
  try {
    const userData = await Storage.getItem(USER_DATA_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
};

export const isUserLoggedIn = async (): Promise<boolean> => {
  try {
    const isLoggedIn = await Storage.getItem(IS_LOGGED_IN_KEY);
    return isLoggedIn === "true";
  } catch (error) {
    console.error("Error checking login status:", error);
    return false;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await Storage.removeItem(USER_DATA_KEY);
    await Storage.removeItem(IS_LOGGED_IN_KEY);
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

export const getEducationLevelLabel = (level: string): string => {
  const labels: Record<string, string> = {
    primary: "ابتدائي",
    middle: "إعدادي",
    high: "ثانوي",
  };
  return labels[level] || level;
};
