import React from "react";
import { View, StyleSheet, ScrollView, Image, Text, Dimensions } from "react-native";

const UpcomingCourses = () => {
  const upcomingCourses = [
    { id: 1, image: require("@/assets/images/upcoming1.png") },
    { id: 2, image: require("@/assets/images/upcoming2.png") },
  ];

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <Text style={styles.header}>Explore Our Upcoming Courses</Text>

      <ScrollView 
        style={styles.courseList} 
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {upcomingCourses.map((course) => (
          <View key={course.id} style={styles.courseCard}>
            <Image
              source={course.image}
              style={styles.courseImage}
              resizeMode="cover"
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default UpcomingCourses;

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 20,
    fontStyle:"italic",
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 25,
    marginVertical: 15,
    color: "#023E8A",
  },
  courseList: {
    marginTop: 5,
  },
  courseCard: {
    padding: 10,
    marginBottom: 15,
    borderWidth: 0.5,
    borderColor: "#DDD",
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  courseImage: {
    width: width - 25, // Responsive width
    height: 500, // Adjusted height
    borderRadius: 10,
    alignSelf: "center",
  },
});