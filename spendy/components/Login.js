import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { auth } from "../FirebaseConfig";
import { setUser } from "../redux/UserSlice";
import { authstyle } from "../styles/AuthStyle";
import CustomInput from "./CustomInput";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const dispatch = useDispatch();

  const onLogin = async () => {
    try {
      if (email && password) {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        if (user && user.emailVerified) {
          dispatch(
            setUser({
              displayName: user.displayName,
              uid: user.uid,
            })
          );

          setEmail("");
          setPassword("");
          setErrorMsg("");

          navigation.reset({
            index: 0,
            routes: [{ name: "ExpenseOverview" }],
          });
        } else {
          setErrorMsg("Please verify your email address.");
        }
      } else {
        setErrorMsg("Please fill in all the fields");
      }
    } catch (error) {
      console.log("error: ", error.message);
      setErrorMsg("Email or password not valid");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={authstyle.container}>
        <View style={authstyle.authForm}>
          <Text style={authstyle.title}>Log In to Your Account</Text>

          {errorMsg ? <Text style={authstyle.errorMsg}>{errorMsg}</Text> : null}

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

          <TouchableOpacity style={authstyle.buttonContainer} onPress={onLogin}>
            <Text style={authstyle.buttonText}>Login</Text>
          </TouchableOpacity>

          <Text
            style={authstyle.normalText}
            onPress={() => navigation.navigate("Register")}
          >
            Don't have an account?
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
