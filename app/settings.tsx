import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  useColorScheme,
  Appearance
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/Colors';
import {
  ArrowLeft,
  Globe,
  Moon,
  Sun,
  ChevronRight
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import Storage from '../utils/storage';
import { useLanguage } from '../utils/LanguageContext';

export default function SettingsScreen() {
  const router = useRouter();
  const systemColorScheme = useColorScheme();
  const colors = Colors[systemColorScheme ?? 'light'];
  const { language, setLanguage: setContextLanguage, t } = useLanguage();

  const [isDarkMode, setIsDarkMode] = useState(false); // Default to light
  const [useSystemTheme, setUseSystemTheme] = useState(false); // Default to manual light

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedTheme = await Storage.getItem('theme');
      const savedUseSystem = await Storage.getItem('useSystemTheme');

      if (savedTheme) setIsDarkMode(savedTheme === 'dark');
      if (savedUseSystem) setUseSystemTheme(savedUseSystem === 'true');
      else {
        // Default: manual light mode
        await Storage.setItem('useSystemTheme', 'false');
        await Storage.setItem('theme', 'light');
        Appearance.setColorScheme('light');
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleLanguageChange = async (lang: 'ar' | 'en') => {
    await setContextLanguage(lang);
  };

  const handleThemeToggle = async (value) => {
    setIsDarkMode(value);
    await Storage.setItem('theme', value ? 'dark' : 'light');
    if (!useSystemTheme) {
      Appearance.setColorScheme(value ? 'dark' : 'light');
    }
  };

  const handleSystemThemeToggle = async (value) => {
    setUseSystemTheme(value);
    await Storage.setItem('useSystemTheme', value.toString());
    if (value) {
      Appearance.setColorScheme(null); // Use system theme
    } else {
      Appearance.setColorScheme(isDarkMode ? 'dark' : 'light');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: colors.card }]}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>{t('settingsTitle')}</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Language Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Globe size={20} color={colors.tint} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('language')}</Text>
          </View>

          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <TouchableOpacity
              style={[
                styles.languageOption,
                language === 'ar' && { backgroundColor: colors.tint + '20' }
              ]}
              onPress={() => handleLanguageChange('ar')}
            >
              <Text style={[
                styles.languageText,
                { color: language === 'ar' ? colors.tint : colors.text }
              ]}>
                {t('arabic')}
              </Text>
              {language === 'ar' && (
                <View style={[styles.checkmark, { backgroundColor: colors.tint }]}>
                  <Text style={styles.checkmarkText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            <TouchableOpacity
              style={[
                styles.languageOption,
                language === 'en' && { backgroundColor: colors.tint + '20' }
              ]}
              onPress={() => handleLanguageChange('en')}
            >
              <Text style={[
                styles.languageText,
                { color: language === 'en' ? colors.tint : colors.text }
              ]}>
                {t('english')}
              </Text>
              {language === 'en' && (
                <View style={[styles.checkmark, { backgroundColor: colors.tint }]}>
                  <Text style={styles.checkmarkText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Theme Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            {isDarkMode ? (
              <Moon size={20} color={colors.tint} />
            ) : (
              <Sun size={20} color={colors.tint} />
            )}
            <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('appearance')}</Text>
          </View>

          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {/* Use System Theme */}
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingTitle, { color: colors.text }]}>
                  {t('useSystemTheme')}
                </Text>
                <Text style={[styles.settingDescription, { color: colors.icon }]}>
                  {t('useSystemThemeDesc')}
                </Text>
              </View>
              <Switch
                value={useSystemTheme}
                onValueChange={handleSystemThemeToggle}
                trackColor={{ false: colors.border, true: colors.tint + '80' }}
                thumbColor={useSystemTheme ? colors.tint : '#f4f3f4'}
              />
            </View>

            {!useSystemTheme && (
              <>
                <View style={[styles.divider, { backgroundColor: colors.border }]} />

                {/* Dark Mode Toggle */}
                <View style={styles.settingRow}>
                  <View style={styles.settingInfo}>
                    <Text style={[styles.settingTitle, { color: colors.text }]}>
                      {t('darkMode')}
                    </Text>
                    <Text style={[styles.settingDescription, { color: colors.icon }]}>
                      {isDarkMode ? t('enabled') : t('disabled')}
                    </Text>
                  </View>
                  <Switch
                    value={isDarkMode}
                    onValueChange={handleThemeToggle}
                    trackColor={{ false: colors.border, true: colors.tint + '80' }}
                    thumbColor={isDarkMode ? colors.tint : '#f4f3f4'}
                  />
                </View>
              </>
            )}
          </View>
        </View>

        {/* Info */}
        <View style={styles.infoContainer}>
          <Text style={[styles.infoText, { color: colors.icon }]}>
            {t('version')} 1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  languageText: {
    fontSize: 16,
    fontWeight: '500',
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    marginHorizontal: 20,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
  },
  infoContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  infoText: {
    fontSize: 14,
  },
});
