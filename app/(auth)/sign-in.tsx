import { Button, Pressable, StyleSheet, TextInput } from "react-native";
import { Text, View } from "@/components/Themed";
import { MonoText } from "@/components/StyledText";
import { useEffect, useState } from "react";
import { getUsers } from "@/actions";
import { User } from "@/models";
import { useAuth } from "@/contexts/AuthContext";
import { router } from "expo-router";

const SignInScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const { login } = useAuth();

  const handleInputChange = (text: string) => {
    setEmail(text);
  };
  const handleSubmit = async (email: string) => {
    if (email.length > 0) {
      const result = await login(email);
      if (result) {
        // TODO: Error handling

        console.log("User logged in");
        router.replace("/");
      } else {
        console.log("User not found");
      }
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.log("Failed to fetch users", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <MonoText style={styles.title}>Social Media</MonoText>
        <MonoText style={styles.text}>Sign in with an email</MonoText>
      </View>
      <View style={styles.separator} />
      <TextInput style={styles.input} placeholder="Email" onChangeText={handleInputChange} value={email} />
      <Pressable style={styles.button} onPress={() => handleSubmit(email)}>
        <MonoText style={styles.buttonText}>Sign in</MonoText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 60,
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
  },
  button: {
    height: 60,
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#ccc",
    padding: 15,
    marginTop: 30,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
  },
  text: {
    fontSize: 20,
    fontWeight: "semibold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "85%",
    backgroundColor: "#eee",
    opacity: 0.5,
  },
});

export default SignInScreen;
