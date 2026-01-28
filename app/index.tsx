import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import Storage from "../utils/storage";

export default function Index() {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    checkOnboarding();
  }, []);

  const checkOnboarding = async () => {
    try {
      const value = await Storage.getItem("hasSeenOnboarding");
      setHasSeenOnboarding(value === "true");
    } catch (error) {
      setHasSeenOnboarding(false);
    }
  };

  if (hasSeenOnboarding === null) {
    return null; // Loading
  }

  if (!hasSeenOnboarding) {
    return <Redirect href="/onboarding/welcome" />;
  }

  return <Redirect href="/(tabs)" />;
}
