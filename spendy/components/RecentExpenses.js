import { format } from "date-fns";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import { db } from "../FirebaseConfig";

const RecentExpenses = ({ navigation }) => {
  const [savedExpenses, setSavedExpenses] = useState([]);
  const [loading, setLoading] = useState(true); 
  const currentUser = useSelector((state) => state.user);

  const expenseCategories = [
    { id: "1", name: "Rent", icon: "home" },
    { id: "2", name: "Shopping", icon: "cart" },
    { id: "3", name: "Food", icon: "food" },
    { id: "4", name: "Transportation", icon: "car" },
    { id: "5", name: "Utilities", icon: "flash" },
    { id: "6", name: "Entertainment", icon: "movie" },
    { id: "7", name: "Healthcare", icon: "hospital-box" },
    { id: "8", name: "Fitness", icon: "dumbbell" },
    { id: "9", name: "Insurance", icon: "shield-account" },
    { id: "10", name: "Travel", icon: "airplane" },
    { id: "11", name: "Education", icon: "school" },
  ];

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      if (currentUser.uid) {
        const savedExpensesRef = collection(
          db,
          "users",
          currentUser.uid,
          "savedExpenses"
        );

        const expensesQuery = query(savedExpensesRef, orderBy("SavedAt", "desc"));
        const querySnapshot = await getDocs(expensesQuery);

        const expenses = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          SavedAt: doc.data().SavedAt?.toDate(),
        }));

        setSavedExpenses(expenses);
      }
    } catch (error) {
      console.log("Error fetching expenses from Firestore: ", error.message);
    } finally {
      setLoading(false); 
    }
  };

  const handleKeyExtracting = (item) => item.id;

  const renderItem = ({ item }) => {
    const formattedDate = item.SavedAt
      ? format(item.SavedAt, "dd.MM.yyyy")
      : "N/A";
    const category = expenseCategories[item.categoryId - 1]; // Adjusted indexing

    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemData}>
          <View style={styles.iconWrapper}>
            <Icon name={category.icon} size={30} color="#9c66cc" />
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.categoryText}>{category.name}</Text>
            <Text style={styles.amountText}>${item.amount}</Text>
            <Text style={styles.dateText}>{formattedDate}</Text>
          </View>
        </View>

        {item.description && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>{item.description}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Past 7 days</Text>
        <TouchableOpacity>
          <Icon
            name="plus-circle"
            size={30}
            color="#9c66cc"
            onPress={() => navigation.navigate("AddExpense")}
          />
        </TouchableOpacity>
      </View>

      {loading ? (
        // Show loading indicator while fetching
        <ActivityIndicator size="large" color="#9c66cc" style={styles.loader} />
      ) : (
        <FlatList
          data={savedExpenses}
          initialNumToRender={5}
          maxToRenderPerBatch={2}
          windowSize={2}
          keyExtractor={handleKeyExtracting}
          renderItem={renderItem}
          style={styles.listStyle}
          contentContainerStyle={styles.flatListContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f4f4f4",
  },
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#f3e9fc",
  },
  headerText: {
    color: "#4c2c8f",
    fontSize: 16,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    width: "90%",
    backgroundColor: "white",
    marginVertical: 10,
    borderRadius: 8,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  iconWrapper: {
    backgroundColor: "#e0c1f0",
    borderRadius: 25,
    padding: 8,
    marginRight: 10,
  },
  textWrapper: {
    flex: 1,
    justifyContent: "center",
  },
  categoryText: {
    fontSize: 16,
    color: "#4c2c8f",
    fontWeight: "bold",
  },
  amountText: {
    fontSize: 14,
    color: "#4caf50",
  },
  dateText: {
    fontSize: 12,
    color: "#888",
  },
  descriptionContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: "#555",
  },
  listStyle: {
    width: "100%",
  },
  flatListContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

export default RecentExpenses;
