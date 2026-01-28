// This is a helper file for development
// You can use this to reset onboarding state

import Storage from "./storage";

export const resetOnboarding = async () => {
  try {
    await Storage.removeItem("hasSeenOnboarding");
    console.log("Onboarding reset successfully");
  } catch (error) {
    console.error("Error resetting onboarding:", error);
  }
};

export const setOnboardingComplete = async () => {
  try {
    await Storage.setItem("hasSeenOnboarding", "true");
    console.log("Onboarding marked as complete");
  } catch (error) {
    console.error("Error setting onboarding:", error);
  }
};
