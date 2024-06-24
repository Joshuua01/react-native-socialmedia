import { editAlbum, getAlbumById } from "@/actions";
import { MonoText } from "@/components/StyledText";
import { useAuth } from "@/contexts/AuthContext";
import { IAlbum } from "@/models";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

const AlbumEditPage = () => {
  const [title, setTitle] = useState<string>("");
  const id = useLocalSearchParams().commentId;
  const { user } = useAuth();

  useEffect(() => {
    const fetchComment = async (id: number) => {
      const response = await getAlbumById(id);
      setTitle(response.title);
    };
    fetchComment(Number(id));
  }, []);

  const handleSubmit = async () => {
    if (!user) {
      console.log("User not found");
      return;
    }
    if (title) {
      const comment: IAlbum = {
        id: Number(id),
        title,
      };
      try {
        const data = await editAlbum(comment);
        console.log("Album Edited", data);
        router.back();
      } catch (error) {
        console.log("Failed to edit album", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <MonoText style={styles.title}>Edit Post</MonoText>
        <MonoText style={styles.text}>Enter the values</MonoText>
      </View>
      <View style={styles.separator} />
      <TextInput
        style={styles.input}
        placeholder="Title"
        onChangeText={(e) => {
          setTitle(e);
        }}
        value={title}
      />

      <Pressable style={styles.button} onPress={handleSubmit}>
        <MonoText style={styles.buttonText}>Save</MonoText>
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

export default AlbumEditPage;
