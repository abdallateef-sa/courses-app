import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import { useColorScheme } from "react-native";
import { COURSES } from "../../constants/Data";
import { Ionicons } from "@expo/vector-icons";
import {
  PlayCircle,
  Clock,
  Award,
  BookOpen,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
} from "lucide-react-native";
import { useState } from "react";

const { width } = Dimensions.get("window");

export default function CourseDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const [expandedLesson, setExpandedLesson] = useState(null);

  const course = COURSES.find((c) => c.id === id);

  if (!course) {
    return (
      <View
        style={[
          styles.container,
          styles.center,
          { backgroundColor: colors.background },
        ]}
      >
        <Text style={{ color: colors.text }}>Course not found</Text>
      </View>
    );
  }

  const toggleLesson = (lessonId) => {
    if (expandedLesson === lessonId) {
      setExpandedLesson(null);
    } else {
      setExpandedLesson(lessonId);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header / Cover */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: course.image }} style={styles.image} />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ChevronLeft size={24} color={colors.background} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.playButton} activeOpacity={0.8}>
            <PlayCircle
              size={60}
              color={colors.background}
              fill="rgba(0,0,0,0.5)"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text }]}>
            {course.title}
          </Text>

          <View style={styles.metaContainer}>
            <View style={[styles.badge, { backgroundColor: colors.tint }]}>
              <Text style={styles.badgeText}>Best Seller</Text>
            </View>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={16} color="#FBBF24" />
              <Text style={[styles.ratingText, { color: colors.icon }]}>
                {course.rating} ({course.reviews} reviews)
              </Text>
            </View>
          </View>

          <Text style={[styles.instructor, { color: colors.icon }]}>
            Created by {course.instructor}
          </Text>

          <View style={[styles.infoRow, { backgroundColor: colors.card }]}>
            <View style={styles.infoItem}>
              <Clock size={18} color={colors.icon} />
              <Text style={[styles.infoText, { color: colors.icon }]}>
                24h Total
              </Text>
            </View>
            <View style={styles.infoItem}>
              <BookOpen size={18} color={colors.icon} />
              <Text style={[styles.infoText, { color: colors.icon }]}>
                {course.lessons ? course.lessons.length : 0} Lessons
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Award size={18} color={colors.icon} />
              <Text style={[styles.infoText, { color: colors.icon }]}>
                Certificate
              </Text>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <Text style={[styles.sectionHeader, { color: colors.text }]}>
            Description
          </Text>
          <Text style={[styles.description, { color: colors.icon }]}>
            {course.description}
            {"\n\n"}
            By the end of this course you will master the skills needed to build
            professional applications. We cover everything from basics to
            advanced topics.
          </Text>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <Text style={[styles.sectionHeader, { color: colors.text }]}>
            Curriculum
          </Text>
          {(course.lessons || []).map((lesson, index) => {
            const isExpanded = expandedLesson === lesson.id;
            return (
              <TouchableOpacity
                key={lesson.id}
                style={[
                  styles.lessonItem,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
                onPress={() => toggleLesson(lesson.id)}
                activeOpacity={0.7}
              >
                <View style={styles.lessonHeader}>
                  <View style={styles.lessonLeft}>
                    <Text style={[styles.lessonNum, { color: colors.icon }]}>
                      {String(index + 1).padStart(2, "0")}
                    </Text>
                    <View style={styles.lessonInfo}>
                      <Text
                        style={[styles.lessonTitle, { color: colors.text }]}
                        numberOfLines={1}
                      >
                        {lesson.title}
                      </Text>
                      <Text
                        style={[styles.lessonDuration, { color: colors.icon }]}
                      >
                        {lesson.duration}
                      </Text>
                    </View>
                  </View>
                  {isExpanded ? (
                    <ChevronUp size={20} color={colors.icon} />
                  ) : (
                    <ChevronDown size={20} color={colors.icon} />
                  )}
                </View>

                {isExpanded && (
                  <View style={styles.lessonSummaryContainer}>
                    <Text
                      style={[styles.lessonSummary, { color: colors.icon }]}
                    >
                      {lesson.summary}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View
        style={[
          styles.footer,
          { backgroundColor: colors.background, borderTopColor: colors.border },
        ]}
      >
        <View>
          <Text style={[styles.priceLabel, { color: colors.icon }]}>
            Total Price
          </Text>
          <Text style={[styles.footerPrice, { color: colors.text }]}>
            {" "}
            {course.price}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.enrollButton, { backgroundColor: colors.tint }]}
        >
          <Text style={styles.enrollText}>Enroll Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: width,
    height: 250,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    opacity: 0.7,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  playButton: {
    position: "absolute",
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 10,
  },
  badgeText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: "600",
  },
  instructor: {
    fontSize: 14,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  infoText: {
    fontSize: 14,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    marginVertical: 24,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
  },
  lessonItem: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
    overflow: "hidden", // Helps with animation if we added it
  },
  lessonHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lessonLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    flex: 1,
  },
  lessonNum: {
    fontSize: 16,
    fontWeight: "bold",
    width: 20,
  },
  lessonInfo: {
    flex: 1,
    paddingRight: 10,
  },
  lessonTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 2,
  },
  lessonDuration: {
    fontSize: 12,
  },
  lessonSummaryContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.05)",
  },
  lessonSummary: {
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderTopWidth: 1,
    paddingBottom: 30, // Safe area
  },
  priceLabel: {
    fontSize: 12,
  },
  footerPrice: {
    fontSize: 20,
    fontWeight: "bold",
  },
  enrollButton: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 50,
  },
  enrollText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
