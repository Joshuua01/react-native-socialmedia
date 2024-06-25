import { editComment, getCommentById } from "@/actions";
import { MonoText } from "@/components/StyledText";
import { useAuth } from "@/contexts/AuthContext";
import { IComment } from "@/models";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

const CommentEditPage = () => {
  const [name, setName] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const id = useLocalSearchParams().commentId;
  const { user } = useAuth();

  useEffect(() => {
    const fetchComment = async (id: number) => {
      const response = await getCommentById(id);
      setName(response.name);
      setBody(response.body);
    };
    fetchComment(Number(id));
  }, []);

  const handleSubmit = async () => {
    if (!user) {
      console.log("User not found");
      return;
    }
    if (name && body) {
      const comment: IComment = {
        id: Number(id),
        name,
        body,
      };
      try {
        const data = await editComment(comment);
        router.back();
      } catch (error) {
        console.log("Failed to edit comment", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <MonoText style={styles.title}>Edit Comment</MonoText>
        <MonoText style={styles.text}>Enter the values</MonoText>
      </View>
      <View style={styles.separator} />
      <TextInput
        style={styles.input}
        placeholder="Title"
        onChangeText={(e) => {
          setName(e);
        }}
        value={name}
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

export default CommentEditPage;
