import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";

const FloatingButton = ({ onPress = () => {} }) => {
  return (
    <View style={styles.fabContainer}>
      <TouchableOpacity style={styles.fab} onPress={onPress}>
        <MaterialIcons name="add" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
};


const Courses = () => {
  const [courses, setCourses] = useState([
    { id: 1, title: "Master Concepts of Power BI(Part 1)", description: "By the end of this course, you'll be able to leverage Power BI to make data-driven decisions and present complex data in a meaningful way." },
    { id: 2, title: "Master Concepts of Power BI(Part 2)", description: "By the end of this course, you’ll be equipped with the skills to leverage data for better decision-making, efficiency, and strategic growth." },
    { id: 3, title: "Master Business Intelligence(Part 1)", description: "Learn the fundamentals of Business Intelligence, including data analysis, visualization, and reporting, to drive informed business decisions." },
    { id: 4, title: "Master Business Intelligence(Part 2)", description: "Master the essentials of Business Intelligence with data analysis, visualization, and strategic insights for smarter decision-making." },
    { id: 5, title: "Master Machine Learning(Part 1)", description: "Master the fundamentals of Machine Learning to build intelligent systems with data-driven insights and predictive models." },
    { id: 6, title: "Master Machine Learning(Part 2)", description: "Advance your Machine Learning expertise with deep learning, optimization techniques, and real-world applications." },
  ]);

  interface Course {
    id: number;
    title: string;
    description: string;
  }

  const [modalVisible, setModalVisible] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);


  const addCourse = () => {
    if (courseName.trim() && courseDescription.trim()) {
      setCourses([
        ...courses,
        {
          id: courses.length + 1,
          title: courseName,
          description: courseDescription,
        },
      ]);
      setCourseName("");
      setCourseDescription("");
      setModalVisible(false);
    }
  };

  const openCourseModal = (course: { id: number; title: string; description: string }) => {

    setSelectedCourse(course);
    setModalVisible(true);
  };



  const handleUpload = async (type: string) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: type === "video" ? "video/*" : "application/pdf",
      });
      if (result.canceled) {
        console.log("User canceled the upload");
      } else {
        console.log("File uploaded:", result);
      }
    } catch (err) {
      console.error("Upload error:", err);
    }
  };
  

  return (
    <View style={styles.container}>
      <ScrollView style={styles.courseList}>
        {courses.map((course) => (
          <TouchableOpacity key={course.id} style={styles.courseCard} onPress={() => openCourseModal(course)}>
            <Text style={styles.courseTitle}>{course.title}</Text>
            <Text style={styles.courseDescription}>{course.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FloatingButton onPress={() => {
        setSelectedCourse(null);
        setModalVisible(true);
      }} />

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedCourse ? (
              <>
                <Text style={styles.modalTitle}>{selectedCourse.title}</Text>
                <Text style={styles.courseDescription}>{selectedCourse.description}</Text>

                <TouchableOpacity style={styles.uploadButton} onPress={() => handleUpload("video")}>
                  <Text style={styles.uploadButtonText}>Upload Course Video</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.uploadButton} onPress={() => handleUpload("notes")}>
                  <Text style={styles.uploadButtonText}>Upload Learning Material</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.modalTitle}>Add a New Course</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Course Name"
                  value={courseName}
                  onChangeText={setCourseName}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Course Description"
                  value={courseDescription}
                  onChangeText={setCourseDescription}
                  multiline
                />
                <TouchableOpacity style={styles.saveButton} onPress={addCourse}>
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </>
            )}

            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Close</Text>
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
  courseCard: { padding: 20, marginBottom: 15, borderWidth: 1, borderColor: "#DDD", borderRadius: 15, backgroundColor: "#FFFFFF", shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 4 },
  courseTitle: { fontSize: 22, fontWeight: "700", color: "#2C3E50" },
  courseDescription: { fontSize: 16, color: "#7F8C8D", marginTop: 8 },
  fabContainer: { position: "absolute", bottom: 20, right: 20 },
  fab: { width: 60, height: 60, backgroundColor: "#007BFF", borderRadius: 30, justifyContent: "center", alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 5 },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { width: "80%", backgroundColor: "white", padding: 20, borderRadius: 10, elevation: 5 },
  uploadButton: { backgroundColor: "#28A745", padding: 10, borderRadius: 8, alignItems: "center", marginBottom: 10 },
  uploadButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  saveButton: { backgroundColor: "#007BFF", padding: 10, borderRadius: 8, alignItems: "center", marginBottom: 10 },
  saveButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  cancelButton: { backgroundColor: "#DC3545", padding: 10, borderRadius: 8, alignItems: "center", marginTop: 10 },
  cancelButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  modalTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#DDD", padding: 10, borderRadius: 8, marginBottom: 10 },


});