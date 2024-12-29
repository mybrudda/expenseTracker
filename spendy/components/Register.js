import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import {
  Alert,
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { auth, db } from "../FirebaseConfig";
import { authstyle } from "../styles/AuthStyle";
import CustomInput from "./CustomInput";

const Register = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const onRegister = async () => {
    try {
      if (username && email && password) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        await updateProfile(user, {
          displayName: username,
        });

        await sendEmailVerification(user);

        await setDoc(doc(db, "users", user.uid), {
          username: username,
          email: email,
          createdAt: serverTimestamp(),
        });

        setUsername("");
        setEmail("");
        setPassword("");
        setErrorMsg("");

        Alert.alert("User " + user.displayName + " created!");

        navigation.navigate("Login");
      } else {
        setErrorMsg("Please fill in all the fields");
      }
    } catch (error) {
      console.log("Error: ", error.message);
      setErrorMsg("User already exists with this email");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={authstyle.container}>
        <View style={authstyle.authForm}>
          <Text style={authstyle.title}>Create an Account</Text>

          {errorMsg ? <Text style={authstyle.errorMsg}>{errorMsg}</Text> : null}

          <CustomInput
            value={username}
            placeholder={"Username"}
            onChangeText={setUsername}
            iconName={"person-outline"}
          />

          <CustomInput
            value={email}
            placeholder={"Email"}
            onChangeText={setEmail}
            iconName={"mail-outline"}
          />

          <CustomInput
            value={password}
            placeholder={"Password"}
            onChangeText={setPassword}
            iconName={"lock-closed-outline"}
            secureTextEntry={true}
          />

          <TouchableOpacity
            style={authstyle.buttonContainer}
            onPress={onRegister}
          >
            <Text style={authstyle.buttonText}>Register</Text>
          </TouchableOpacity>

          <Text
            style={authstyle.normalText}
            onPress={() => navigation.navigate("Login")}
          >
            Already have an account?
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Register;
