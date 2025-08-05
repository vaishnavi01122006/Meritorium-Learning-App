import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Modal, 
  Linking 
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface Course {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  notesUrl?: string;
  rating: number; // Store course rating
}

const Courses: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courses, setCourses] = useState<Course[]>([
    { 
      id: 1, 
      title: "Master Concepts of Power BI(Part 1)", 
      description: "By the end of this course, you'll be able to leverage Power BI to make data-driven decisions and present complex data in a meaningful way.", 
      videoUrl: "https://drive.google.com/file/d/1In9QhkqVZtcWibJP6Lqig8yhyH0UAK8R/view?usp=drive_link",
      notesUrl: "https://drive.google.com/file/d/1F1_qrgckuOHkmOCc7AtnEfYgDlqbyLmT/view?usp=drive_link",
      rating: 0,
    },
    { 
      id: 2, 
      title: "Master Concepts of Power BI(Part 2)", 
      description: "By the end of this course, you’ll be equipped with the skills to leverage data for better decision-making, efficiency, and strategic growth",
      videoUrl: "",
      notesUrl: "",
      rating: 0,
    },
    { 
      id: 3, 
      title: "Master Business Intelligence(Part 1)", 
      description: "Learn the fundamentals of Business Intelligence, including data analysis, visualization, and reporting, to drive informed business decisions.",
      videoUrl: "https://drive.google.com/file/d/1CFUAL2dU71MDBTa7kfiblQUyjn2K6kX0/view?usp=sharing",
      notesUrl: "https://drive.google.com/file/d/18wFEtZhwQrPcAik950qnjOgtry-sARtV/view?usp=sharing",
      rating: 0,
    },
    { 
      id: 4, 
      title: "Master Business Intelligence(Part 2)", 
      description: "Master the essentials of Business Intelligence with data analysis, visualization, and strategic insights for smarter decision-making.",
      videoUrl: "",
      notesUrl: "",
      rating: 0,
    },
    { 
      id: 5, 
      title: "Meritorium", 
      description: "Abc",
      videoUrl: "",
      notesUrl: "",
      rating: 0,
    },
  ]);

  const handleCoursePress = (course: Course) => {
    setSelectedCourse(course);
    setIsModalVisible(true);
  };

  const handleViewVideo = () => {
    if (selectedCourse?.videoUrl) {
      Linking.openURL(selectedCourse.videoUrl);
    }
  };

  const handleViewNotes = () => {
    if (selectedCourse?.notesUrl) {
      Linking.openURL(selectedCourse.notesUrl);
    }
  };

  const handleRating = (courseId: number, rating: number) => {
    setCourses(prevCourses => prevCourses.map(course => 
      course.id === courseId ? { ...course, rating } : course
    ));
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.courseList}>
        {courses.map((course) => (
          <TouchableOpacity 
            key={course.id} 
            style={styles.courseCard} 
            onPress={() => handleCoursePress(course)}
          >
            <Text style={styles.courseTitle}>{course.title}</Text>
            <Text style={styles.courseDescription}>{course.description}</Text>
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => handleRating(course.id, star)}>
                  <FontAwesome 
                    name={star <= course.rating ? "star" : "star-o"} 
                    size={24} 
                    color={star <= course.rating ? "#FFD700" : "#CCCCCC"} 
                  />
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedCourse?.title}</Text>

            <TouchableOpacity style={styles.button} onPress={handleViewVideo}>
              <Text style={styles.buttonText}>View Video</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleViewNotes}>
              <Text style={styles.buttonText}>View Notes</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, styles.closeButton]} 
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Courses;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  courseList: { marginTop: 20, padding: 15 },
  courseCard: { padding: 20, marginBottom: 15, borderWidth: 1, borderColor: "#DDD", borderRadius: 15, backgroundColor: "#FFF", shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 4, marginTop: 15 },
  courseTitle: { fontSize: 22, fontWeight: "700", color: "#2C3E50" },
  courseDescription: { fontSize: 16, color: "#7F8C8D", marginTop: 8 },
  ratingContainer: { flexDirection: "row", marginTop: 10 },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" },
  modalContent: { width: 300, padding: 20, backgroundColor: "#FFF", borderRadius: 15, alignItems: "center" },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 15, color: "#333" },
  button: { width: "100%", padding: 12, marginVertical: 5, backgroundColor: "#3498DB", borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
  closeButton: { backgroundColor: "#E74C3C" }
});
