import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from 'react-native';
import { Search } from 'lucide-react-native';
import { useLanguage } from '../../utils/LanguageContext';

const RECENT_SEARCHES = [
  'React Native',
  'Python',
  'UI/UX Design',
  'Digital Marketing',
  'Data Science',
];

export default function SearchScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { t } = useLanguage();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>{t('searchCourses')}</Text>
      </View>
      <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
        <Search size={20} color={colors.icon} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder={t('searchPlaceholder')}
          placeholderTextColor={colors.icon}
        />
      </View>

      <View style={styles.recentSearchesContainer}>
        <Text style={[styles.recentSearchesTitle, { color: colors.text }]}>{t('recentSearches')}</Text>
        <FlatList
          data={RECENT_SEARCHES}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.recentSearchItem}>
              <Text style={[styles.recentSearchText, { color: colors.text }]}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    height: 50,
    fontSize: 16,
  },
  recentSearchesContainer: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  recentSearchesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  recentSearchItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  recentSearchText: {
    fontSize: 16,
  },
});
