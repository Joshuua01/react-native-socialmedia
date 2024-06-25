import { createAlbum } from "@/actions";
import { MonoText } from "@/components/StyledText";
import { useAuth } from "@/contexts/AuthContext";
import { IAlbum } from "@/models";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

const AlbumCreateScreen = () => {
  const [title, setTitle] = useState<string>("");
  const { user } = useAuth();
  const { id } = useLocalSearchParams();

  const handleSubmit = async () => {
    if (!user) {
      console.log("User not found");
      return;
    }

    if (title) {
      const album: IAlbum = {
        id: Number(id),
        title,
      };
      try {
        const data = await createAlbum(album);
        router.back();
      } catch (error) {
        console.log("Failed to create album", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <MonoText style={styles.title}>Add album</MonoText>
        <MonoText style={styles.text}>Enter the values</MonoText>
      </View>
      <View style={styles.separator} />
      <TextInput
        style={styles.input}
        placeholder="Body"
        onChangeText={(e) => {
          setTitle(e);
        }}
        value={title}
      />
      <Pressable style={styles.button} onPress={handleSubmit}>
        <MonoText style={styles.buttonText}>Create</MonoText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 50,
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
    color: "#ccc",
    marginBottom: 10,
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
export default AlbumCreateScreen;
