import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from 'react-native';
import { User, Settings, LogOut, ChevronRight } from 'lucide-react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useLanguage } from '../../utils/LanguageContext';
import { getUserData, logout } from '../../utils/userData';

export default function ProfileScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { t } = useLanguage();
  const [userData, setUserData] = useState(null);

  useFocusEffect(
    useCallback(() => {
      loadUserData();
    }, [])
  );

  const loadUserData = async () => {
    const data = await getUserData();
    setUserData(data);
  };

  const handleLogout = () => {
    Alert.alert(t('logout'), t('logoutConfirm') || "Are you sure you want to logout?", [
      { text: t('cancel'), style: "cancel" },
      { 
        text: t('logout'), 
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace('/onboarding/auth-choice');
        }
      }
    ]);
  };

  const menuItems = [
    { 
      title: t('editProfile'),
      icon: User, 
      color: colors.text,
      onPress: () => router.push('/profile/edit')
    },
    { 
      title: t('settings'),
      icon: Settings, 
      color: colors.text,
      onPress: () => router.push('/settings')
    },
    { 
      title: t('logout'),
      icon: LogOut, 
      color: colors.error,
      onPress: handleLogout
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'left', 'right']}>
      {/* Profile Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <View style={[styles.avatarContainer, { borderColor: colors.tint }]}>
          <Image 
            source={userData?.profileImage ? { uri: userData.profileImage } : { uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop&q=60' }} 
            style={styles.avatar}
          />
        </View>
        <Text style={[styles.name, { color: colors.text }]}>
          {userData ? `${userData.firstName} ${userData.lastName}` : t('studentName')}
        </Text>
        <Text style={[styles.email, { color: colors.icon }]}>
          {userData?.email || 'student@example.com'}
        </Text>
      </View>
      
      {/* Menu Items */}
      <View style={styles.section}>
        {menuItems.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.button, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={item.onPress}
            activeOpacity={0.7}
          >
            <View style={styles.buttonContent}>
              <item.icon size={22} color={item.color} style={styles.buttonIcon} />
              <Text style={[styles.buttonText, { color: item.color }]}>{item.title}</Text>
            </View>
            <ChevronRight size={20} color={colors.icon} />
          </TouchableOpacity>
        ))}
      </View>

      {/* App Version */}
      <View style={styles.footer}>
        <Text style={[styles.version, { color: colors.icon }]}>{t('version')} 1.0.0</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 4,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    marginTop: 4,
  },
  section: {
    padding: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIcon: {
    marginRight: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  version: {
    fontSize: 14,
  },
});
