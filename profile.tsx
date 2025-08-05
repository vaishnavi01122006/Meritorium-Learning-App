// app/profile.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter for navigation

const ProfilePage = () => {
  const [name, setName] = useState('Priyadarshini Kadam');
  const [email, setEmail] = useState('priyadarshini.kadam@gmail.com');
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);
  const router = useRouter(); // Initialize router

  const toggleSecurity = () => {
    setIsSecurityOpen(!isSecurityOpen);
  };

  const handleLogout = () => {
    // Here you could add any logout logic (like clearing auth tokens)
    router.replace('/(Index)'); // Redirect to Login page
  };

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>My Profile</Text>
        <Text style={styles.subHeaderText}>Manage your account settings</Text>
      </View>

      {/* Account Details Section */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Account Details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{name}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{email}</Text>
        </View>
      </View>

      {/* Security Button */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={toggleSecurity}
      >
        <Text style={styles.buttonText}>{isSecurityOpen ? 'Hide Security' : 'Show Security'}</Text>
      </TouchableOpacity>

      {/* Security Details Section */}
      {isSecurityOpen && (
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Security</Text>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Password:</Text>
            <Text style={styles.value}>*</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Two-Factor Authentication:</Text>
            <Text style={styles.value}>Enabled</Text>
          </View>
        </View>
      )}

      {/* Logout Button */}
      <TouchableOpacity 
        style={[styles.button, styles.logoutButton]} 
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f3f4f6',
  },
  header: {
    backgroundColor: '#3b82f6',
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  subHeaderText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    marginTop: 5,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#555',
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#3b82f6',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  logoutButton: {
    backgroundColor: '#ef4444', // Red color for logout button
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ProfilePage;