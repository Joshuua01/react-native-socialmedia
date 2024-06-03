import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { getPosts } from "@/actions";
import { IPost } from "@/models";
import { Post } from "@/components/Post";

export default function FeedScreen() {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();

  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      setPosts(response);
    };
    fetchPosts();
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
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
