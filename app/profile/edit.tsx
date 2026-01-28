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
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft, User, Mail, Phone, Camera } from "lucide-react-native";
import { useState, useEffect } from "react";
import * as ImagePicker from 'expo-image-picker';
import { getUserData, saveUserData, UserData } from "../../utils/userData";
import { Colors } from "../../constants/Colors";
import { useLanguage } from "../../utils/LanguageContext";

export default function EditProfileScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const { t, language } = useLanguage();

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const textAlign = language === 'ar' ? 'right' : 'left';
  const flexDirection = language === 'ar' ? 'row-reverse' : 'row';

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const data = await getUserData();
    if (data) {
      setUserData(data);
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email);
      setPhone(data.phone);
      if (data.profileImage) {
        setImage(data.profileImage);
      }
    }
    setLoading(false);
  };

  const pickImage = async () => {
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

  const handleSave = async () => {
    if (!userData) return;

    if (!firstName || !lastName || !email || !phone) {
      Alert.alert(t('error'), t('fillAllFields'));
      return;
    }

    try {
      const updatedData: UserData = {
        ...userData,
        firstName,
        lastName,
        email,
        phone,
        profileImage: image || undefined,
      };

      await saveUserData(updatedData);

      Alert.alert(t('success'), t('saveChangesSuccess') || "Profile updated successfully", [
        {
          text: t('ok'),
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert(t('error'), "Error updating profile");
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.tint} />
      </View>
    );
  }

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
            <Text style={[styles.title, { color: colors.text, textAlign }]}>{t('editProfile')}</Text>
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
            <Text style={[styles.uploadText, { color: colors.tint }]}>{t('changePhoto')}</Text>
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

            {/* Save Button */}
            <TouchableOpacity
              style={[styles.saveButton, { backgroundColor: colors.tint }]}
              onPress={handleSave}
              activeOpacity={0.8}
            >
              <Text style={styles.saveButtonText}>{t('saveChanges') || "Save Changes"}</Text>
            </TouchableOpacity>
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
  center: {
    justifyContent: 'center',
    alignItems: 'center',
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
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "System",
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
    marginBottom: 0,
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
  saveButton: {
    borderRadius: 15,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "System",
  },
});
