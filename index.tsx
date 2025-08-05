import type React from "react"
import { useState, useCallback } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native"
import { useFonts } from "expo-font"
import * as SplashScreen from "expo-splash-screen"
import { responsiveSize } from "@/components/responsiveSize"
import { Link } from "expo-router"

const InstructorLogin: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const [fontsLoaded] = useFonts({
    "PlayfairDisplay-Regular": require("../../assets/fonts/PlayfairDisplay-Regular.ttf"),
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  const handleLogin = () => {
    if (!email || !password) {
      setErrorMessage("Please enter your credentials to move ahead")
    } else if (email === "vaishali.malkar@gmail.com" && password === "Vaishali@1234") {
      setErrorMessage("")
      Alert.alert("Login Successful", "Welcome to Meritorium Knowledge Academy!")
    } else {
      setErrorMessage("Invalid login credentials")
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.content} onLayout={onLayoutRootView}>
            <View style={styles.logoContainer}>
              <Image source={require("../../assets/images/applogo.png")} style={styles.logo} resizeMode="contain" />
              <Text style={styles.logoText}>MERITORIUM</Text>
              <Text style={styles.subText}>KNOWLEDGE ACADEMY</Text>
            </View>
            <Text style={styles.title}>Instructor LOGIN</Text>
            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your email..."
                placeholderTextColor="#999090"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your password..."
                placeholderTextColor="#999090"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                returnKeyType="done"
              />
              {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
              <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              {email === "vaishali.malkar@gmail.com" && password === "Vaishali@1234" && (
                <Link href={"/home(instructor)/addcourse"} style={styles.button}>
                  <Text style={styles.buttonText}>Proceed</Text>
                </Link>
              )}
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: responsiveSize(20),
  },
  safeArea: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  content: {
    alignItems: "center",
    width: "100%",
    paddingVertical: responsiveSize(40),
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: responsiveSize(40),
  },
  logo: {
    width: responsiveSize(100),
    height: responsiveSize(100),
    marginBottom: responsiveSize(16),
  },
  logoText: {
    fontSize: responsiveSize(32),
    fontWeight: "bold",
    color: "#000",
    marginBottom: responsiveSize(4),
  },
  subText: {
    fontSize: responsiveSize(16),
    color: "#555",
  },
  title: {
    fontSize: responsiveSize(36),
    fontWeight: "800",
    color: "#000",
    marginBottom: responsiveSize(32),
    letterSpacing: 1,
  },
  formContainer: {
    width: "100%",
    gap: responsiveSize(20),
  },
  input: {
    width: "100%",
    backgroundColor: "#FFF",
    paddingHorizontal: responsiveSize(20),
    paddingVertical: responsiveSize(16),
    borderRadius: 25,
    fontSize: responsiveSize(16),
    color: "#000",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 2,
    borderColor: "#0096C7",
  },
  errorText: {
    color: "red",
    fontSize: responsiveSize(14),
    textAlign: "center",
    marginTop: responsiveSize(-10),
  },
  button: {
    backgroundColor: "#0096C7",
    paddingHorizontal: responsiveSize(50),
    paddingVertical: responsiveSize(16),
    borderRadius: 25,
    marginTop: responsiveSize(10),
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: responsiveSize(16),
    textAlign: "center",
  },
})

export default InstructorLogin