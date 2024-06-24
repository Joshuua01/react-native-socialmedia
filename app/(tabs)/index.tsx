import { ScrollView, StyleSheet } from "react-native";

import { getPosts } from "@/actions";
import { Post } from "@/components/Post";
import { View } from "@/components/Themed";
import { IPost } from "@/models";
import { useEffect, useState } from "react";

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
