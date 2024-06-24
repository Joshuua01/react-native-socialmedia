import { getPostById } from "@/actions";
import { Post } from "@/components/Post";
import { IPost } from "@/models";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const PostPage = () => {
  const id = useLocalSearchParams().id;
  const [post, setPost] = useState<IPost | null>(null);

  useEffect(() => {
    const fetchPost = async (id: number) => {
      const response = await getPostById(id);
      setPost(response);
    };
    fetchPost(Number(id));
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>{post && <Post post={post} pressable={false} renderComments={true} />}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default PostPage;
