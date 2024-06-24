import { editPost, getPostById } from "@/actions";
import { MonoText } from "@/components/StyledText";
import { useAuth } from "@/contexts/AuthContext";
import { IPost } from "@/models";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

const PostEditPage = () => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const id = useLocalSearchParams().id;
  const { user } = useAuth();

  useEffect(() => {
    const fetchPost = async (id: number) => {
      const response = await getPostById(id);
      setTitle(response.title);
      setBody(response.body);
    };
    fetchPost(Number(id));
  }, []);

  const handleSubmit = async () => {
    if (!user) {
      console.log("User not found");
      return;
    }
    if (title && body) {
      const post: IPost = {
        id: Number(id),
        title,
        body,
      };
      try {
        const data = await editPost(post);
        console.log("Post Edited", data);
        router.replace("/");
      } catch (error) {
        console.log("Failed to edit post", error);
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
      <TextInput
        style={styles.input}
        placeholder="Body"
        onChangeText={(e) => {
          setBody(e);
        }}
        value={body}
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

export default PostEditPage;
