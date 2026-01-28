import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import { useColorScheme } from "react-native";
import { COURSES, CATEGORIES, INSTRUCTORS } from "../../constants/Data";
import { Star, Bell, Search } from "lucide-react-native";
import { useState } from "react";
import { useLanguage } from "../../utils/LanguageContext";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? "light"];
    const [activeCategory, setActiveCategory] = useState("All");
    const [activeInstructor, setActiveInstructor] = useState("all");
    const { t } = useLanguage();

    const filteredCourses = COURSES.filter((c) => {
        const categoryMatch = activeCategory === "All" || c.category === activeCategory;
        const instructorMatch = activeInstructor === "all" || c.instructor === INSTRUCTORS.find(i => i.id === activeInstructor)?.name;
        return categoryMatch && instructorMatch;
    });

    const renderHeader = () => (
        <View style={styles.header}>
            <View>
                <Text style={[styles.greeting, { color: colors.text }]}>
                    {t('hello')}, Student 👋
                </Text>
                <Text style={[styles.subtitle, { color: colors.icon }]}>
                    {t('letsStartLearning')}
                </Text>
            </View>
            <TouchableOpacity
                style={[styles.iconButton, { backgroundColor: colors.card }]}
            >
                <Bell size={24} color={colors.text} />
            </TouchableOpacity>
        </View>
    );

    const renderBanner = () => (
        <LinearGradient
            colors={[colors.tint, "#0056b3"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.banner}
        >
            <View style={styles.bannerContent}>
                <Text style={styles.bannerTitle}>{t('summerSale')}</Text>
                <Text style={styles.bannerText}>{t('getDiscount')}</Text>
                <TouchableOpacity style={styles.bannerButton}>
                    <Text style={[styles.bannerButtonText, { color: colors.tint }]}>
                        {t('browseNow')}
                    </Text>
                </TouchableOpacity>
            </View>
            <Image
                source={{
                    uri: "https://cdn3d.iconscout.com/3d/premium/thumb/online-learning-4140026-3438075.png",
                }}
                style={styles.bannerImage}
            />
        </LinearGradient>
    );

    const renderCategories = () => (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesContainer}
            contentContainerStyle={{ paddingHorizontal: 20 }}
        >
            {CATEGORIES.map((cat, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => {
                        setActiveCategory(cat);
                        setActiveInstructor("all"); // Reset instructor when category changes
                    }}
                    style={[
                        styles.categoryChip,
                        {
                            backgroundColor:
                                activeCategory === cat ? colors.tint : colors.card,
                            borderColor: activeCategory === cat ? colors.tint : colors.border,
                            marginRight: 10,
                        },
                    ]}
                >
                    <Text
                        style={[
                            styles.categoryText,
                            { color: activeCategory === cat ? "#FFF" : colors.text },
                        ]}
                    >
                        {cat === "All" ? t('all') : cat}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );

    const renderInstructors = () => (
        <View style={styles.instructorsSection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
                {t('instructors')}
            </Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20 }}
            >
                {INSTRUCTORS.map((instructor) => (
                    <TouchableOpacity
                        key={instructor.id}
                        onPress={() => {
                            setActiveInstructor(instructor.id);
                            setActiveCategory("All"); // Reset category when instructor changes
                        }}
                        style={styles.instructorItem}
                    >
                        <View
                            style={[
                                styles.instructorImageContainer,
                                activeInstructor === instructor.id && {
                                    borderColor: colors.tint,
                                    borderWidth: 2,
                                },
                            ]}
                        >
                            <Image
                                source={{ uri: instructor.image }}
                                style={styles.instructorImage}
                            />
                        </View>
                        <Text
                            style={[
                                styles.instructorName,
                                {
                                    color:
                                        activeInstructor === instructor.id
                                            ? colors.tint
                                            : colors.text,
                                    fontWeight:
                                        activeInstructor === instructor.id ? "bold" : "normal",
                                },
                            ]}
                        >
                            {instructor.id === "all" ? t('all') : instructor.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );

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
            <FlatList
                ListHeaderComponent={
                    <>
                        {renderHeader()}
                        {renderBanner()}
                        {renderInstructors()}
                        {renderCategories()}
                        <Text style={[styles.sectionTitle, { color: colors.text }]}>
                            {t('featuredCourses')}
                        </Text>
                    </>
                }
                data={filteredCourses}
                renderItem={renderCourse}
                keyExtractor={(item) => item.id}
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
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 20,
    },
    greeting: {
        fontSize: 24,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 16,
        marginTop: 4,
    },
    iconButton: {
        padding: 12,
        borderRadius: 50,
    },
    banner: {
        marginHorizontal: 20,
        marginBottom: 24,
        padding: 24,
        borderRadius: 24,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    bannerContent: {
        flex: 1,
    },
    bannerTitle: {
        color: "#FFF",
        fontSize: 22,
        fontWeight: "bold",
    },
    bannerText: {
        color: "rgba(255, 255, 255, 0.8)",
        fontSize: 14,
        marginBottom: 16,
        marginTop: 4,
    },
    bannerButton: {
        backgroundColor: "#FFF",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignSelf: "flex-start",
    },
    bannerButtonText: {
        fontWeight: "bold",
        fontSize: 14,
    },
    bannerImage: {
        width: 120,
        height: 120,
        resizeMode: "contain",
    },
    categoriesContainer: {
        marginBottom: 24,
    },
    categoryChip: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 16,
        borderWidth: 1,
    },
    categoryText: {
        fontWeight: "600",
        fontSize: 14,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginLeft: 20,
        marginBottom: 16,
    },
    courseCard: {
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 16,
        overflow: "hidden",
        borderWidth: 1,
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
    instructorsSection: {
        marginBottom: 24,
    },
    instructorItem: {
        alignItems: "center",
        marginRight: 20,
        width: 70,
    },
    instructorImageContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        overflow: "hidden",
        marginBottom: 8,
        backgroundColor: "#f0f0f0",
    },
    instructorImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    instructorName: {
        fontSize: 12,
        textAlign: "center",
        lineHeight: 16,
    },
});
