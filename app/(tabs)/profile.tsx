import { Pressable, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { MonoText } from "@/components/StyledText";
import { useAuth } from "@/contexts/AuthContext";
import { router } from "expo-router";

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout();
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <MonoText style={styles.title}>My Profile</MonoText>
        <View style={[styles.infoContainer, { marginTop: 50 }]}>
          <MonoText style={styles.text}>Email: {user?.email}</MonoText>
          <MonoText style={styles.text}>Name: {user?.name}</MonoText>
          <MonoText style={styles.text}>Username: {user?.username}</MonoText>
        </View>
      </View>

      <Pressable onPress={handleLogout} style={styles.button}>
        <MonoText style={{ fontSize: 20, fontWeight: "bold" }}>Sign Out</MonoText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 20,
  },
  infoContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
  },
  text: {
    fontSize: 28,
    fontWeight: "semibold",
  },
  button: {
    backgroundColor: "#f00",
    width: "100%",
    padding: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});
