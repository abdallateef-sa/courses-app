import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from 'react-native';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

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
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.card }]}>
            <Text style={{ color: colors.text }}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.card, marginTop: 10 }]}>
            <Text style={{ color: colors.text }}>Settings</Text>
        </TouchableOpacity>
         <TouchableOpacity style={[styles.button, { backgroundColor: colors.card, marginTop: 10 }]}>
            <Text style={{ color: colors.error }}>Log Out</Text>
        </TouchableOpacity>
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
    padding: 30,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 16,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    marginTop: 4,
  },
  section: {
    padding: 20,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
});
