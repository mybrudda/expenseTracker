import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import Toast from 'react-native-toast-message';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import { db } from "../FirebaseConfig";
import { expenseCategories } from "./expenseCategories";

const ExpenseInput = ({ expenseAmount, setExpenseAmount }) => (
    <TextInput
        placeholder="Add expense amount"
        value={expenseAmount}
        onChangeText={setExpenseAmount}
        keyboardType="numeric"
        style={styles.input}
    />
);


const CategorySelector = ({ selectedCategoryId, setSelectedCategoryId }) => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {expenseCategories.map((category) => (
            <TouchableOpacity
                key={category.id}
                style={[styles.button, selectedCategoryId === category.id && styles.selectedButton]}
                onPress={() => setSelectedCategoryId(category.id)}
            >
                <Icon name={category.icon} size={40} color="#9c66cc" />
                <Text style={styles.buttonText}>{category.name}</Text>
            </TouchableOpacity>
        ))}
    </ScrollView>
);


const DescriptionInput = ({ expenseDescription, setExpenseDescription }) => (
    <TextInput
        placeholder="Description..."
        value={expenseDescription}
        onChangeText={setExpenseDescription}
        style={styles.multilineInput}
        multiline
        numberOfLines={5}
    />
);


const SubmitButton = ({ handleSubmitExpense }) => (
    <TouchableOpacity onPress={handleSubmitExpense} style={styles.buttonContainer}>
        <Text style={styles.submitButtonText}>Add</Text>
    </TouchableOpacity>
);

const AddExpense = () => {
    const [expenseAmount, setExpenseAmount] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState("");
    const [expenseDescription, setExpenseDescription] = useState("");

    const userProfile = useSelector((state) => state.user);

    const handleSubmitExpense = async () => {
        if (!userProfile || !userProfile.uid) {
            Alert.alert('Please log in to add an expense.');
            return;
        }

        if (!expenseAmount || !selectedCategoryId || !expenseDescription) {
            showErrorToast('Fill in all the fields and try again saving.');
            return;
        }

        if(isNaN(expenseAmount)){
            showErrorToast('Numeric value only','Please enter a numeric value for amount')
            return;f
        }

        try {
            await addDoc(collection(db, "users", userProfile.uid, "savedExpenses"), {
                amount: expenseAmount,
                category: expenseCategories.find(category => category.id === selectedCategoryId)?.name,
                categoryId: selectedCategoryId,
                description: expenseDescription,
                SavedAt: serverTimestamp(),
            });

            showSuccessToast('Your expense has been successfully saved.');
            resetForm();
        } catch (error) {
            console.log('Error: ', error.message);
        }
    };

    const showSuccessToast = (message) => {
        Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Expense Saved!',
            text2: message,
            visibilityTime: 3000,
        });
    };

    const showErrorToast = (title ,message) => {
        Toast.show({
            type: 'error',
            position: 'top',
            text1: title || 'Something went wrong!',
            text2: message,
            visibilityTime: 3000,
        });
    };

    const resetForm = () => {
        setExpenseAmount('');
        setSelectedCategoryId('');
        setExpenseDescription('');
    };

    return (
        <ScrollView style={styles.screen} showsVerticalScrollIndicator={false} >
            <KeyboardAvoidingView style={styles.screen} behavior="position">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                       
                            <ExpenseInput expenseAmount={expenseAmount} setExpenseAmount={setExpenseAmount} />
                            <CategorySelector selectedCategoryId={selectedCategoryId} setSelectedCategoryId={setSelectedCategoryId} />
                            <DescriptionInput expenseDescription={expenseDescription} setExpenseDescription={setExpenseDescription} />
                            <SubmitButton handleSubmitExpense={handleSubmitExpense} />
             
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#f3e9fc",
    },
    container: {
        alignItems: "center",
    },

    input: {
        fontSize: 16,
        borderWidth: 0.5,
        borderColor: "#9c66cc",
        width: "90%",
        marginVertical: 20,
        padding: 15,
        borderRadius: 5,
        backgroundColor: "#f8f4fc",
    },
    multilineInput: {
        fontSize: 16,
        borderWidth: 0.5,
        borderColor: "#9c66cc",
        width: "90%",
        marginVertical: 20,
        padding: 15,
        borderRadius: 5,
        minHeight: 100,
        textAlignVertical: "top",
        backgroundColor: "#f8f4fc",
    },
    scrollView: {
        flexGrow: 0,
        width: "90%",
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ddd3fb",
        borderRadius: 10,
        padding: 15,
        marginRight: 10,
        width: 130,
        height: 100,
    },
    selectedButton: {
        backgroundColor: "#d0eaff",
        borderColor: "#9c66cc",
        borderWidth: 2,
    },
    buttonText: {
        fontSize: 14,
        textAlign: "center",
        color: "#7a4fa1",
        marginTop: 5,
    },
    buttonContainer: {
        width: "90%",
        height: 50,
        backgroundColor: "#9c66cc",
        marginVertical: 20,
        justifyContent: "center",
        borderRadius: 10,
    },
    submitButtonText: {
        fontSize: 20,
        textAlign: "center",
        color: "white",
    },
});

export default AddExpense;
