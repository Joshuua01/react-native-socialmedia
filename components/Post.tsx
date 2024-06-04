import { StyleSheet } from "react-native";
import { IComment, IPost } from "@/models";
import { View } from "./Themed";
import { MonoText } from "./StyledText";
import { useEffect, useState } from "react";
import { getCommentsByPostId } from "@/actions";

export function Post({ post }: { post: IPost }) {
  const [comments, setComments] = useState<IComment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await getCommentsByPostId(post.id);
      setComments(response);
    };
    fetchComments();
  }, []);

  return (
    <View style={[styles.container, { marginBottom: 20 }]}>
      <MonoText style={styles.title}>{post.title}</MonoText>
      <MonoText style={styles.desc}>{post.body}</MonoText>
      <MonoText>{comments.length} comments</MonoText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    backgroundColor: "#373A40",
    margin: 10,
    padding: 20,
    gap: 15,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  desc: {
    fontWeight: "semibold",
    fontSize: 16,
  },
});
