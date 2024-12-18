import { useState } from "react";
import {
    Keyboard,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { authstyle } from "../styles/AuthStyle";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={authstyle.container}>
        <View style={authstyle.authForm}>
          <Text style={authstyle.title}>Login screen</Text>

          <View style={authstyle.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={20}
              color="#888"
              style={authstyle.icon}
            />
            <TextInput
              style={authstyle.input}
              value={email}
              placeholder="Email"
              onChangeText={setEmail}
              placeholderTextColor="#888"
            />
          </View>

          <View style={authstyle.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#888"
              style={authstyle.icon}
            />
            <TextInput
              style={authstyle.input}
              value={password}
              placeholder="Password"
              onChangeText={setPassword}
              placeholderTextColor="#888"
              secureTextEntry={true}
            />
          </View>

          <TouchableOpacity
            style={authstyle.buttonContainer}
            onPress={() => navigation.navigate("ExpenseOverview")}
          >
            <Text style={authstyle.buttonText}>Login</Text>
          </TouchableOpacity>

          <Text style={authstyle.normalText} onPress={() => navigation.navigate('Register')}>Don't have an account?</Text>
          
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
