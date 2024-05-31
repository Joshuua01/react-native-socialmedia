import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { useEffect } from "react";
import { getUsers } from "@/actions";

export default function AlbumsScreen() {
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getUsers();
      console.log(response);
    };
    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Albums</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
