import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from 'react-native';
import { User, Settings, LogOut } from 'lucide-react-native';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const menuItems = [
    { title: 'Edit Profile', icon: User, color: colors.text },
    { title: 'Settings', icon: Settings, color: colors.text },
    { title: 'Log Out', icon: LogOut, color: colors.error },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
            <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop&q=60' }} 
                style={styles.avatar}
            />
        </View>
        <Text style={[styles.name, { color: colors.text }]}>Student Name</Text>
        <Text style={[styles.email, { color: colors.icon }]}>student@example.com</Text>
      </View>
      
      <View style={styles.section}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={[styles.button, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
            <item.icon size={20} color={item.color} style={styles.buttonIcon} />
            <Text style={[styles.buttonText, { color: item.color }]}>{item.title}</Text>
          </TouchableOpacity>
        ))}
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
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 12,
  },
  buttonIcon: {
    marginRight: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
