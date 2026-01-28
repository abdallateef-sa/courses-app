import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  useColorScheme,
} from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft, Mail, Lock } from "lucide-react-native";
import { useState } from "react";
import { Colors } from "../../constants/Colors";
import { useLanguage } from "../../utils/LanguageContext";

export default function LoginScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const { t, language } = useLanguage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const textAlign = language === 'ar' ? 'right' : 'left';
  const flexDirection = language === 'ar' ? 'row-reverse' : 'row';

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert(t('error'), t('enterEmailAndPassword'));
      return;
    }

    Alert.alert(t('success'), t('loginSuccess'), [
      {
        text: t('ok'),
        onPress: () => router.replace("/(tabs)"),
      },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Back Button */}
          <TouchableOpacity
            style={[
              styles.backButton,
              {
                backgroundColor: colorScheme === 'dark' ? '#333' : '#f0f0f0',
                alignSelf: 'flex-start', // Always Left
                flexDirection: 'row',
                width: 'auto',
                paddingHorizontal: 15,
                gap: 8
              }
            ]}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <ArrowLeft size={20} color={colors.text} />
            <Text style={{ color: colors.text, fontWeight: 'bold' }}>{t('back') || (language === 'ar' ? 'عودة' : 'Back')}</Text>
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text, textAlign }]}>{t('login')}</Text>
            <Text style={[styles.subtitle, { color: colors.icon, textAlign }]}>{t('welcomeBack')}</Text>
          </View>

          {/* Form */}
          <View style={[styles.formContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {/* Email Input */}
            <View style={[styles.inputContainer, { backgroundColor: colors.background, borderColor: colors.border, flexDirection }]}>
              <View style={styles.inputIconContainer}>
                <Mail size={20} color={colors.tint} />
              </View>
              <TextInput
                style={[styles.input, { color: colors.text, textAlign }]}
                placeholder={t('email')}
                placeholderTextColor={colors.icon}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password Input */}
            <View style={[styles.inputContainer, { backgroundColor: colors.background, borderColor: colors.border, flexDirection }]}>
              <View style={styles.inputIconContainer}>
                <Lock size={20} color={colors.tint} />
              </View>
              <TextInput
                style={[styles.input, { color: colors.text, textAlign }]}
                placeholder={t('password')}
                placeholderTextColor={colors.icon}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            {/* Forgot Password */}
            <TouchableOpacity style={[styles.forgotPassword, { alignSelf: language === 'ar' ? 'flex-start' : 'flex-end' }]}>
              <Text style={[styles.forgotPasswordText, { color: colors.tint }]}>{t('forgotPassword')}</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              style={[styles.loginButton, { backgroundColor: colors.tint }]}
              onPress={handleLogin}
              activeOpacity={0.8}
            >
              <Text style={styles.loginButtonText}>{t('login')}</Text>
            </TouchableOpacity>

            {/* Register Link */}
            <View style={[styles.registerContainer, { flexDirection }]}>
              <Text style={[styles.registerText, { color: colors.icon }]}>{t('noAccount')} </Text>
              <TouchableOpacity onPress={() => router.push("/auth/register")}>
                <Text style={[styles.registerLink, { color: colors.tint }]}>{t('createAccount')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingTop: 60,
    paddingBottom: 40,
  },
  backButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "System",
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "System",
  },
  formContainer: {
    borderRadius: 30,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
  },
  inputContainer: {
    alignItems: "center",
    borderRadius: 15,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
  },
  inputIconContainer: {
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    fontFamily: "System",
  },
  forgotPassword: {
    marginBottom: 25,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "System",
  },
  loginButton: {
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "System",
  },
  registerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  registerText: {
    fontSize: 14,
    fontFamily: "System",
  },
  registerLink: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "System",
  },
});
