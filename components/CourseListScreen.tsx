import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import { useCourses } from "../hooks";
import { LoadingComponent, ErrorComponent } from "./LoadingErrorComponents";
import { Course } from "../types";

interface CourseListScreenProps {
  // Props for the course list screen
}

const CourseListScreen: React.FC<CourseListScreenProps> = () => {
  const { courses, loading, error } = useCourses();

  const onRefresh = () => {
    // In a real implementation, this would refetch data
    // For now, we'll just use the hook's internal refetch mechanism if available
  };

  if (loading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <ErrorComponent message={error} onRetry={onRefresh} />;
  }

  const renderItem = ({ item }: { item: Course }) => (
    <View style={styles.courseCard}>
      <Text style={styles.courseTitle}>{item.title}</Text>
      <Text style={styles.instructor}>Instructor: {item.instructor}</Text>
      <Text style={styles.category}>Category: {item.category}</Text>
      <Text style={styles.price}>{item.price}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Courses</Text>
      <FlatList
        data={courses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 20,
    textAlign: "center",
  },
  courseCard: {
    backgroundColor: "white",
    margin: 10,
    padding: 15,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  instructor: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  category: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
    marginTop: 5,
  },
});

export default CourseListScreen;
