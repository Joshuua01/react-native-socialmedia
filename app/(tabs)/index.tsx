import { ScrollView, StyleSheet } from "react-native";

import { View } from "@/components/Themed";
import { useEffect, useState } from "react";
import { getPosts } from "@/actions";
import { IPost } from "@/models";
import { Post } from "@/components/Post";

export default function FeedScreen() {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      setPosts(response);
    };
    fetchPosts();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {posts.map((post) => (
          <Post key={post.id} post={post} pressable={true} renderComments={false} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
