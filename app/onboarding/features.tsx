import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import { useRouter } from "expo-router";
import { Shield, BookOpen, Users, Award } from "lucide-react-native";
import Storage from "../../utils/storage";
import { Colors } from "../../constants/Colors";
import { useLanguage } from "../../utils/LanguageContext";

export default function FeaturesScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const { t } = useLanguage();

  const handleContinue = async () => {
    await Storage.setItem("hasSeenOnboarding", "true");
    router.push("/onboarding/auth-choice");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        {/* Title */}
        <Text style={[styles.title, { color: colors.text }]}>{t('whyChooseUs')}</Text>

        {/* Features Grid */}
        <View style={styles.featuresGrid}>
          {/* Feature 1 */}
          <View style={[styles.featureCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.featureIconContainer, { backgroundColor: colors.tint + "20" }]}>
              <Shield size={40} color={colors.tint} strokeWidth={2} />
            </View>
            <Text style={[styles.featureTitle, { color: colors.text }]}>{t('protectedContent')}</Text>
            <Text style={[styles.featureDescription, { color: colors.icon }]}>
              {t('protectedContentDesc')}
            </Text>
          </View>

          {/* Feature 2 */}
          <View style={[styles.featureCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.featureIconContainer, { backgroundColor: colors.tint + "20" }]}>
              <BookOpen size={40} color={colors.tint} strokeWidth={2} />
            </View>
            <Text style={[styles.featureTitle, { color: colors.text }]}>{t('diverseCourses')}</Text>
            <Text style={[styles.featureDescription, { color: colors.icon }]}>
              {t('diverseCoursesDesc')}
            </Text>
          </View>

          {/* Feature 3 */}
          <View style={[styles.featureCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.featureIconContainer, { backgroundColor: colors.tint + "20" }]}>
              <Users size={40} color={colors.tint} strokeWidth={2} />
            </View>
            <Text style={[styles.featureTitle, { color: colors.text }]}>{t('forAllLevels')}</Text>
            <Text style={[styles.featureDescription, { color: colors.icon }]}>
              {t('forAllLevelsDesc')}
            </Text>
          </View>

          {/* Feature 4 */}
          <View style={[styles.featureCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.featureIconContainer, { backgroundColor: colors.tint + "20" }]}>
              <Award size={40} color={colors.tint} strokeWidth={2} />
            </View>
            <Text style={[styles.featureTitle, { color: colors.text }]}>{t('certifiedCourses')}</Text>
            <Text style={[styles.featureDescription, { color: colors.icon }]}>
              {t('certifiedCoursesDesc')}
            </Text>
          </View>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={[styles.continueButton, { backgroundColor: colors.tint }]}
          onPress={handleContinue}
          activeOpacity={0.8}
        >
          <Text style={styles.continueButtonText}>{t('startNow')}</Text>
        </TouchableOpacity>

        {/* Pagination Dots */}
        <View style={styles.pagination}>
          <View style={[styles.dot, { backgroundColor: colors.border }]} />
          <View style={[styles.dot, styles.dotActive, { backgroundColor: colors.tint }]} />
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
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
    fontFamily: "System",
  },
  featuresGrid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  featureCard: {
    width: "48%",
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
  },
  featureIconContainer: {
    borderRadius: 50,
    padding: 15,
    marginBottom: 15,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    fontFamily: "System",
  },
  featureDescription: {
    fontSize: 13,
    textAlign: "center",
    lineHeight: 20,
    fontFamily: "System",
  },
  continueButton: {
    paddingVertical: 18,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    fontFamily: "System",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
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
