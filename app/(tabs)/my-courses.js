import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from 'react-native';
import { COURSES } from '../../constants/Data';

export default function MyCoursesScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text }]}>My Learning</Text>
      <FlatList 
        data={COURSES.slice(0, 2)}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
            <View style={[styles.card, { backgroundColor: colors.card }]}>
                <Text style={{ color: colors.text }}>{item.title}</Text>
            </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
});
