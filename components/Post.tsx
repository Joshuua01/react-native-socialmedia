import { Pressable, StyleSheet } from "react-native";
import { IComment, IPost, IUser } from "@/models";
import { View } from "./Themed";
import { MonoText } from "./StyledText";
import { useEffect, useState } from "react";
import { getCommentsByPostId, getUserById } from "@/actions";
import { router } from "expo-router";

interface PostProps {
  post: IPost;
  pressable: boolean;
  renderComments: boolean;
}

export function Post({ post, pressable, renderComments }: PostProps) {
  const [comments, setComments] = useState<IComment[]>([]);
  const [owner, setOwner] = useState<IUser>();

  useEffect(() => {
    const fetchComments = async () => {
      const response = await getCommentsByPostId(post.id);
      setComments(response);
    };
    const fetchOwner = async () => {
      const response = await getUserById(post.userId);
      setOwner(response);
    };
    fetchComments();
    fetchOwner();
  }, []);

  const handlePostPress = () => {
    if (pressable) {
      router.push(`/posts/${post.id}`);
    }
  };

  return (
    <Pressable onPress={handlePostPress}>
      <View style={[styles.container, { marginBottom: 20 }]}>
        <MonoText style={styles.desc}>Author: {owner?.name}</MonoText>
        <MonoText style={styles.title}>{post.title}</MonoText>
        <MonoText style={styles.desc}>{post.body}</MonoText>
        <MonoText>{comments.length} comments</MonoText>

        {renderComments &&
          comments.map((comment) => (
            <View key={comment.id} style={styles.commentContainer}>
              <View style={styles.separator} />
              <MonoText>{comment.email}</MonoText>
              <MonoText style={{ fontWeight: "bold" }}>{comment.name}</MonoText>
              <MonoText>{comment.body}</MonoText>
            </View>
          ))}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  separator: {
    marginBottom: 15,
    height: 1,
    backgroundColor: "#eee",
  },
  container: {
    justifyContent: "flex-start",
    backgroundColor: "#373A40",
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
  commentContainer: {
    backgroundColor: "#373A40",
    padding: 10,
    margin: 5,
    gap: 10,
  },
});
