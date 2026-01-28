import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";
import { useColorScheme } from "react-native";
import { COURSES } from "../../constants/Data";
import { useRouter } from "expo-router";
import { Star } from "lucide-react-native";
import { useLanguage } from "../../utils/LanguageContext";

export default function MyCoursesScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const router = useRouter();
  const { t } = useLanguage();

  const renderCourse = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.courseCard,
        { backgroundColor: colors.card, shadowColor: colors.text },
      ]}
      onPress={() => router.push(`/course/${item.id}`)}
    >
      <Image source={{ uri: item.image }} style={styles.courseImage} />
      <View style={styles.courseContent}>
        <Text style={[styles.courseCategory, { color: colors.tint }]}>
          {item.category}
        </Text>
        <Text
          style={[styles.courseTitle, { color: colors.text }]}
          numberOfLines={2}
        >
          {item.title}
        </Text>
        <View style={styles.ratingContainer}>
          <Star size={16} color="#FBBF24" fill="#FBBF24" />
          <Text style={[styles.ratingText, { color: colors.icon }]}>
            {item.rating} ({item.reviews})
          </Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={[styles.price, { color: colors.text }]}>
            {item.price}
          </Text>
          <Text style={[styles.oldPrice, { color: colors.icon }]}>
            {item.oldPrice}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top', 'left', 'right']}
    >
      <Text style={[styles.header, { color: colors.text }]}>{t('myCourses')}</Text>
      <FlatList
        data={COURSES.slice(0, 2)}
        keyExtractor={(item) => item.id}
        renderItem={renderCourse}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
  },
  courseCard: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  courseImage: {
    width: "100%",
    height: 180,
  },
  courseContent: {
    padding: 16,
  },
  courseCategory: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    lineHeight: 24,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  ratingText: {
    marginLeft: 6,
    fontSize: 14,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
  },
  oldPrice: {
    fontSize: 14,
    textDecorationLine: "line-through",
    marginLeft: 8,
  },
});
