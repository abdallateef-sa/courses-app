import { View, Text, StyleSheet, Dimensions, TouchableOpacity, useColorScheme } from "react-native";
import { useRouter } from "expo-router";
import { GraduationCap } from "lucide-react-native";
import { Colors } from "../../constants/Colors";
import { useLanguage } from "../../utils/LanguageContext";

const { width, height } = Dimensions.get("window");

export default function WelcomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const { t } = useLanguage();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        {/* Icon */}
        <View style={[styles.iconContainer, { backgroundColor: colors.tint + "20" }]}>
          <GraduationCap size={120} color={colors.tint} strokeWidth={1.5} />
        </View>

        {/* Title */}
        <Text style={[styles.title, { color: colors.text }]}>{t('welcome')}</Text>

        {/* Subtitle */}
        <Text style={[styles.subtitle, { color: colors.icon }]}>
          {t('welcomeSubtitle')}
        </Text>

        {/* Features */}
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <View style={[styles.featureDot, { backgroundColor: colors.tint }]} />
            <Text style={[styles.featureText, { color: colors.text }]}>{t('premiumContent')}</Text>
          </View>
          <View style={styles.featureItem}>
            <View style={[styles.featureDot, { backgroundColor: colors.tint }]} />
            <Text style={[styles.featureText, { color: colors.text }]}>{t('allLevels')}</Text>
          </View>
          <View style={styles.featureItem}>
            <View style={[styles.featureDot, { backgroundColor: colors.tint }]} />
            <Text style={[styles.featureText, { color: colors.text }]}>{t('learnAnywhere')}</Text>
          </View>
        </View>

        {/* Next Button */}
        <TouchableOpacity
          style={[styles.nextButton, { backgroundColor: colors.tint }]}
          onPress={() => router.push("/onboarding/features")}
          activeOpacity={0.8}
        >
          <Text style={styles.nextButtonText}>{t('next')}</Text>
        </TouchableOpacity>

        {/* Pagination Dots */}
        <View style={styles.pagination}>
          <View style={[styles.dot, styles.dotActive, { backgroundColor: colors.tint }]} />
          <View style={[styles.dot, { backgroundColor: colors.border }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  iconContainer: {
    marginBottom: 40,
    borderRadius: 100,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    fontFamily: "System",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 50,
    lineHeight: 26,
  },
  featuresContainer: {
    width: "100%",
    marginBottom: 50,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  featureDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 15,
  },
  featureText: {
    fontSize: 16,
    fontFamily: "System",
  },
  nextButton: {
    paddingVertical: 18,
    paddingHorizontal: 80,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 30,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "System",
  },
  pagination: {
    flexDirection: "row",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    width: 24,
  },
});
