import { View, Text, ScrollView, Image, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from 'react-native';
import { COURSES, CATEGORIES } from '../../constants/Data';
import { Star, Bell, Search } from 'lucide-react-native';
import { useState } from 'react';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredCourses = activeCategory === 'All' 
    ? COURSES 
    : COURSES.filter(c => c.category === activeCategory);

  const renderHeader = () => (
    <View style={styles.header}>
        <View>
            <Text style={[styles.greeting, { color: colors.text }]}>Hello, Student 👋</Text>
            <Text style={[styles.subtitle, { color: colors.icon }]}>Let's start learning</Text>
        </View>
        <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.card }]}>
            <Bell size={24} color={colors.text} />
        </TouchableOpacity>
    </View>
  );

  const renderBanner = () => (
    <LinearGradient
        colors={['#8B5CF6', '#6D28D9']} // Violet gradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.banner}
    >
        <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Summer Sale!</Text>
            <Text style={styles.bannerText}>Get 50% off on all courses</Text>
            <TouchableOpacity style={styles.bannerButton}>
                <Text style={styles.bannerButtonText}>Browse Now</Text>
            </TouchableOpacity>
        </View>
        <Image 
            source={{ uri: 'https://cdn3d.iconscout.com/3d/premium/thumb/online-learning-4140026-3438075.png' }} 
            style={styles.bannerImage}
        />
    </LinearGradient>
  );

  const renderCategories = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer} contentContainerStyle={{ paddingHorizontal: 20 }}>
        {CATEGORIES.map((cat, index) => (
            <TouchableOpacity 
                key={index} 
                onPress={() => setActiveCategory(cat)}
                style={[
                    styles.categoryChip, 
                    { 
                        backgroundColor: activeCategory === cat ? colors.tint : colors.card,
                        marginRight: 10 
                    }
                ]}
            >
                <Text style={[
                    styles.categoryText, 
                    { color: activeCategory === cat ? '#FFF' : colors.text }
                ]}>
                    {cat}
                </Text>
            </TouchableOpacity>
        ))}
    </ScrollView>
  );

  const renderCourse = ({ item }) => (
    <TouchableOpacity 
        style={[styles.courseCard, { backgroundColor: colors.card }]}
        onPress={() => router.push(`/course/${item.id}`)}
    >
        <Image source={{ uri: item.image }} style={styles.courseImage} />
        <View style={styles.courseContent}>
            <Text style={[styles.courseCategory, { color: colors.tint }]}>{item.category}</Text>
            <Text style={[styles.courseTitle, { color: colors.text }]} numberOfLines={2}>{item.title}</Text>
            <View style={styles.ratingContainer}>
                <Star size={14} color="#FBBF24" fill="#FBBF24" />
                <Text style={[styles.ratingText, { color: colors.icon }]}>{item.rating} ({item.reviews})</Text>
            </View>
            <View style={styles.priceContainer}>
                <Text style={[styles.price, { color: colors.text }]}>{item.price}</Text>
                <Text style={[styles.oldPrice, { color: colors.icon }]}>{item.oldPrice}</Text>
            </View>
        </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        ListHeaderComponent={
            <>
                {renderHeader()}
                {renderBanner()}
                {renderCategories()}
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Featured Courses</Text>
            </>
        }
        data={filteredCourses}
        renderItem={renderCourse}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  iconButton: {
    padding: 10,
    borderRadius: 50,
  },
  banner: {
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 20,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 160,
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  bannerText: {
    color: '#E0E7FF',
    fontSize: 14,
    marginBottom: 16,
  },
  bannerButton: {
    backgroundColor: '#FFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    color: '#7C3AED',
    fontWeight: 'bold',
    fontSize: 12,
  },
  bannerImage: {
    width: 100,
    height: 100,
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  categoryChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  categoryText: {
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 16,
  },
  courseCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  courseImage: {
    width: '100%',
    height: 180,
  },
  courseContent: {
    padding: 16,
  },
  courseCategory: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  oldPrice: {
    fontSize: 14,
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
});
