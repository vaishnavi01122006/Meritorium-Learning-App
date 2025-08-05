import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Modal, 
  Image // Use Image from React Native for local images
} from "react-native";

interface Course {
  id: number;
  title: string;
  description: string;
  progress: number;
  certificate: any; // Change from string to 'any' to support local images using require
}

const Courses: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const courses: Course[] = [
    { 
      id: 1, 
      title: "Machine Learning(Part 1)", 
      description: "By the end of this course, you'll be able to leverage Power BI to make data-driven decisions and present complex data in a meaningful way.", 
      progress: 100,
      certificate: require("@/assets/images/certif.jpg"), // Using local image for certificate
    },
    { 
      id: 2, 
      title: "Machine Learning(Part 2)", 
      description: "By the end of this course, you’ll be equipped with the skills to leverage data for better decision-making, efficiency, and strategic growth", 
      progress: 100,
      certificate: require("@/assets/images/certif.jpg"), // Using local image for certificate
    },
  ];

  const handleViewCertificate = (course: Course) => {
    setSelectedCourse(course);
    setIsModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.courseList}>
        {courses.map((course) => (
          <View key={course.id} style={styles.courseCard}>
            <Text style={styles.courseTitle}>{course.title}</Text>
            <Text style={styles.courseDescription}>{course.description}</Text>

            {/* Progress Bar */}
            <View style={styles.progressContainer}>
              <Text style={styles.progressText}>Progress: {course.progress}%</Text>
              <View style={styles.progressBar}>
                <View
                  style={{
                    ...styles.progressFill,
                    width: `${course.progress}%`,

                  }}
                />
              </View>
            </View>

            {/* Button to view certificate */}
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => handleViewCertificate(course)}
            >
              <Text style={styles.buttonText}>View Certificate</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Modal to display certificate */}
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Certificate</Text>

            {/* Display the certificate image */}
            {selectedCourse && selectedCourse.certificate ? (
              <View style={styles.certificateContainer}>
                <Image
                  source={selectedCourse.certificate} // Display local image
                  style={styles.certificateImage}
                />
              </View>
            ) : (
              <Text style={styles.noCertificateText}>No certificate available</Text>
            )}

            {/* Button to close modal */}
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
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  courseList: {
    marginTop: 20,
    padding: 15,
  },
  courseCard: {
    padding: 20,
    marginTop: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  courseTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2C3E50",
  },
  courseDescription: {
    fontSize: 16,
    color: "#7F8C8D",
    marginTop: 8,
  },
  progressContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  progressText: {
    fontSize: 14,
    color: "#7F8C8D",
    marginBottom: 5,
  },
  progressBar: {
    width: "100%",
    height: 10,
    backgroundColor: "#E4E6E8",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#28A745", // Green color for progress bar
  },
  button: {
    width: "100%",
    padding: 12,
    marginVertical: 5,
    backgroundColor: "#3498DB",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "#E74C3C",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 15,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
    textAlign: "center",
  },
  certificateContainer: {
    width: "100%",
    height: 200,
    marginBottom: 15,
  },
  certificateImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain", // Ensure the image fits inside the container
  },
  noCertificateText: {
    fontSize: 16,
    color: "#E74C3C",
    textAlign: "center",
    marginTop: 20,
  },
});