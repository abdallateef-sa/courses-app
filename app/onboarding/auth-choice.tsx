import { View, Text, StyleSheet, TouchableOpacity, Dimensions, useColorScheme } from "react-native";
import { useRouter } from "expo-router";
import { LogIn, UserPlus, Eye } from "lucide-react-native";
import { Colors } from "../../constants/Colors";
import { useLanguage } from "../../utils/LanguageContext";

const { width } = Dimensions.get("window");

export default function AuthChoiceScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const { t } = useLanguage();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        {/* Title */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>{t('startYourJourney')}</Text>
          <Text style={[styles.subtitle, { color: colors.icon }]}>{t('chooseYourWay')}</Text>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {/* Login Button */}
          <TouchableOpacity
            style={[styles.optionCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => router.push("/auth/login")}
            activeOpacity={0.9}
          >
            <View style={[styles.iconCircle, { backgroundColor: colors.tint + "20" }]}>
              <LogIn size={32} color={colors.tint} strokeWidth={2} />
            </View>
            <Text style={[styles.optionTitle, { color: colors.text }]}>{t('login')}</Text>
            <Text style={[styles.optionDescription, { color: colors.icon }]}>
              {t('loginDesc')}
            </Text>
          </TouchableOpacity>

          {/* Register Button */}
          <TouchableOpacity
            style={[styles.optionCard, styles.primaryCard, { backgroundColor: colors.tint }]}
            onPress={() => router.push("/auth/register")}
            activeOpacity={0.9}
          >
            <View style={[styles.iconCircle, styles.iconCircleWhite]}>
              <UserPlus size={32} color={colors.tint} strokeWidth={2} />
            </View>
            <Text style={[styles.optionTitle, styles.textWhite]}>
              {t('register')}
            </Text>
            <Text style={[styles.optionDescription, styles.textWhite]}>
              {t('registerDesc')}
            </Text>
          </TouchableOpacity>

          {/* Guest Mode Button */}
          <TouchableOpacity
            style={[styles.guestButton, { borderColor: colors.border }]}
            onPress={() => router.replace("/(tabs)")}
            activeOpacity={0.8}
          >
            <Eye size={20} color={colors.icon} strokeWidth={2} />
            <Text style={[styles.guestButtonText, { color: colors.icon }]}>
              {t('guest')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <Text style={[styles.footer, { color: colors.icon }]}>
          {t('termsAndConditions')}
        </Text>
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
    paddingHorizontal: 25,
    paddingTop: 80,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "System",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "System",
  },
  optionsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  optionCard: {
    marginBottom: 20,
    borderRadius: 25,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
  },
  primaryCard: {
    shadowOpacity: 0.3,
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  iconCircleWhite: {
    backgroundColor: "#fff",
  },
  optionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    fontFamily: "System",
  },
  optionDescription: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: "System",
  },
  textWhite: {
    color: "#fff",
  },
  guestButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 15,
    borderWidth: 1,
    gap: 10,
  },
  guestButtonText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "System",
  },
  footer: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 20,
    fontFamily: "System",
  },
});
