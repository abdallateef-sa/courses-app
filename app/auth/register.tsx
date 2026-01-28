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
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  User,
  Mail,
  Lock,
  Phone,
  ChevronDown,
  Camera,
} from "lucide-react-native";
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { saveUserData } from "../../utils/userData";
import { Colors } from "../../constants/Colors";
import { useLanguage } from "../../utils/LanguageContext";

type EducationLevel = "primary" | "middle" | "high";

export default function RegisterScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const { t, language } = useLanguage();

  const [image, setImage] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [educationLevel, setEducationLevel] = useState<EducationLevel | null>(null);
  const [grade, setGrade] = useState<number | null>(null);
  const [showLevelPicker, setShowLevelPicker] = useState(false);
  const [showGradePicker, setShowGradePicker] = useState(false);

  const textAlign = language === 'ar' ? 'right' : 'left';
  const flexDirection = language === 'ar' ? 'row-reverse' : 'row';

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const educationLevels = [
    { value: "primary", label: t('primary'), grades: 6 },
    { value: "middle", label: t('middle'), grades: 3 },
    { value: "high", label: t('high'), grades: 3 },
  ];

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
      Alert.alert(t('error'), t('fillAllFields'));
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(t('error'), t('passwordMismatch'));
      return;
    }

    if (!educationLevel || !grade) {
      Alert.alert(t('error'), t('selectEducationAndGrade'));
      return;
    }

    try {
      await saveUserData({
        firstName,
        lastName,
        email,
        phone,
        educationLevel,
        grade,
        profileImage: image || undefined, // Use profileImage matching the interface
      });

      Alert.alert(t('success'), t('accountCreated'), [
        {
          text: t('ok'),
          onPress: () => router.replace("/(tabs)"),
        },
      ]);
    } catch (error) {
      Alert.alert(t('error'), "Error creating account");
    }
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
            <Text style={[styles.title, { color: colors.text, textAlign }]}>{t('createNewAccount')}</Text>
            <Text style={[styles.subtitle, { color: colors.icon, textAlign }]}>{t('joinUs')}</Text>
          </View>

          {/* Image Picker */}
          <View style={styles.imagePickerContainer}>
            <TouchableOpacity onPress={pickImage} style={[styles.imageCircle, { borderColor: colors.tint, backgroundColor: colors.card }]}>
              {image ? (
                <Image source={{ uri: image }} style={styles.image} />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <User size={40} color={colors.icon} />
                  <View style={[styles.cameraIconBadge, { backgroundColor: colors.tint }]}>
                    <Camera size={14} color="#fff" />
                  </View>
                </View>
              )}
            </TouchableOpacity>
            <Text style={[styles.uploadText, { color: colors.tint }]}>{image ? t('changePhoto') : t('uploadPhoto')}</Text>
          </View>

          {/* Form */}
          <View style={[styles.formContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>

            {/* Name Row */}
            <View style={[styles.row, { flexDirection }]}>
              {/* First Name */}
              <View style={[styles.inputContainer, styles.halfInput, { backgroundColor: colors.background, borderColor: colors.border, flexDirection }]}>
                <View style={styles.inputIconContainer}>
                  <User size={20} color={colors.tint} />
                </View>
                <TextInput
                  style={[styles.input, { color: colors.text, textAlign }]}
                  placeholder={t('firstName')}
                  placeholderTextColor={colors.icon}
                  value={firstName}
                  onChangeText={setFirstName}
                />
              </View>

              <View style={{ width: 10 }} />

              {/* Last Name */}
              <View style={[styles.inputContainer, styles.halfInput, { backgroundColor: colors.background, borderColor: colors.border, flexDirection }]}>
                <View style={styles.inputIconContainer}>
                  <User size={20} color={colors.tint} />
                </View>
                <TextInput
                  style={[styles.input, { color: colors.text, textAlign }]}
                  placeholder={t('lastName')}
                  placeholderTextColor={colors.icon}
                  value={lastName}
                  onChangeText={setLastName}
                />
              </View>
            </View>

            {/* Email */}
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

            {/* Phone */}
            <View style={[styles.inputContainer, { backgroundColor: colors.background, borderColor: colors.border, flexDirection }]}>
              <View style={styles.inputIconContainer}>
                <Phone size={20} color={colors.tint} />
              </View>
              <TextInput
                style={[styles.input, { color: colors.text, textAlign }]}
                placeholder={t('phone')}
                placeholderTextColor={colors.icon}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>

            {/* Education Row */}
            <View style={[styles.row, { flexDirection }]}>
              {/* Level Picker */}
              <View style={[styles.halfInput, { zIndex: 2000 }]}>
                <TouchableOpacity
                  style={[styles.pickerContainer, { backgroundColor: colors.background, borderColor: colors.border, flexDirection }]}
                  onPress={() => {
                    setShowLevelPicker(!showLevelPicker);
                    setShowGradePicker(false);
                  }}
                  activeOpacity={0.8}
                >
                  <View style={styles.inputIconContainer}>
                    <ChevronDown size={20} color={colors.tint} />
                  </View>
                  <Text style={[styles.pickerText, { color: educationLevel ? colors.text : colors.icon, textAlign }]} numberOfLines={1}>
                    {educationLevel
                      ? educationLevels.find((l) => l.value === educationLevel)?.label
                      : t('selectEducationLevel')}
                  </Text>
                </TouchableOpacity>

                {showLevelPicker && (
                  <View style={[styles.optionsContainer, { backgroundColor: colors.background, borderColor: colors.border }]}>
                    {educationLevels.map((level) => (
                      <TouchableOpacity
                        key={level.value}
                        style={[styles.option, { borderBottomColor: colors.border }]}
                        onPress={() => {
                          setEducationLevel(level.value as EducationLevel);
                          setGrade(null);
                          setShowLevelPicker(false);
                        }}
                        activeOpacity={0.7}
                      >
                        <Text style={[styles.optionText, { color: colors.text, textAlign }]}>{level.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              <View style={{ width: 10 }} />

              {/* Grade Picker */}
              <View style={[styles.halfInput, { zIndex: 1000 }]}>
                <TouchableOpacity
                  style={[styles.pickerContainer, { backgroundColor: colors.background, borderColor: colors.border, flexDirection, opacity: educationLevel ? 1 : 0.5 }]}
                  onPress={() => {
                    if (educationLevel) {
                      setShowGradePicker(!showGradePicker);
                      setShowLevelPicker(false);
                    }
                  }}
                  activeOpacity={educationLevel ? 0.8 : 1}
                >
                  <View style={styles.inputIconContainer}>
                    <ChevronDown size={20} color={colors.tint} />
                  </View>
                  <Text style={[styles.pickerText, { color: grade ? colors.text : colors.icon, textAlign }]} numberOfLines={1}>
                    {grade ? `${t('grade')} ${grade}` : t('selectGrade')}
                  </Text>
                </TouchableOpacity>

                {showGradePicker && educationLevel && (
                  <View style={[styles.optionsContainer, { backgroundColor: colors.background, borderColor: colors.border }]}>
                    {Array.from(
                      { length: educationLevels.find((l) => l.value === educationLevel)?.grades || 0 },
                      (_, i) => i + 1
                    ).map((gradeNum) => (
                      <TouchableOpacity
                        key={gradeNum}
                        style={[styles.option, { borderBottomColor: colors.border }]}
                        onPress={() => {
                          setGrade(gradeNum);
                          setShowGradePicker(false);
                        }}
                        activeOpacity={0.7}
                      >
                        <Text style={[styles.optionText, { color: colors.text, textAlign }]}>{t('grade')} {gradeNum}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </View>

            {/* Password */}
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

            {/* Confirm Password */}
            <View style={[styles.inputContainer, { backgroundColor: colors.background, borderColor: colors.border, flexDirection }]}>
              <View style={styles.inputIconContainer}>
                <Lock size={20} color={colors.tint} />
              </View>
              <TextInput
                style={[styles.input, { color: colors.text, textAlign }]}
                placeholder={t('confirmPassword')}
                placeholderTextColor={colors.icon}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>

            {/* Register Button */}
            <TouchableOpacity
              style={[styles.registerButton, { backgroundColor: colors.tint }]}
              onPress={handleRegister}
              activeOpacity={0.8}
            >
              <Text style={styles.registerButtonText}>{t('register')}</Text>
            </TouchableOpacity>

            {/* Login Link */}
            <View style={[styles.loginContainer, { flexDirection }]}>
              <Text style={[styles.loginText, { color: colors.icon }]}>{t('haveAccount')} </Text>
              <TouchableOpacity onPress={() => router.push("/auth/login")}>
                <Text style={[styles.loginLink, { color: colors.tint }]}>{t('login')}</Text>
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
    marginBottom: 20,
    elevation: 2,
  },
  header: {
    marginBottom: 20,
  },
  imagePickerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  imageCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIconBadge: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  uploadText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'System',
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
    fontFamily: "System",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "System",
  },
  formContainer: {
    borderRadius: 30,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
  },
  row: {
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  halfInput: {
    flex: 1,
    marginBottom: 0, // Handled by row marginBottom except for inside specific containers
  },
  inputContainer: {
    alignItems: "center",
    borderRadius: 15,
    marginBottom: 15,
    paddingHorizontal: 12,
    borderWidth: 1,
    height: 56,
  },
  inputIconContainer: {
    marginHorizontal: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 15,
    fontFamily: "System",
    height: '100%',
  },
  pickerContainer: {
    alignItems: "center",
    borderRadius: 15,
    paddingHorizontal: 12,
    borderWidth: 1,
    height: 56,
  },
  pickerText: {
    flex: 1,
    fontSize: 14,
    fontFamily: "System",
    marginHorizontal: 8,
  },
  optionsContainer: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    borderRadius: 15,
    borderWidth: 1,
    overflow: "hidden",
    zIndex: 9999,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 14,
    fontFamily: "System",
  },
  registerButton: {
    borderRadius: 15,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  registerButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "System",
  },
  loginContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    fontSize: 14,
    fontFamily: "System",
  },
  loginLink: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "System",
  },
});
