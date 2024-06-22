import { Pressable, StyleSheet } from "react-native";
import { IComment, IPost, IUser } from "@/models";
import { View } from "./Themed";
import { MonoText } from "./StyledText";
import { useEffect, useRef, useState } from "react";
import { deletePost, getCommentsByPostId, getUserById } from "@/actions";
import { router } from "expo-router";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import Comments from "./Comments";

interface PostProps {
  post: IPost;
  pressable: boolean;
  renderComments: boolean;
}

export function Post({ post, pressable, renderComments }: PostProps) {
  const [comments, setComments] = useState<IComment[]>([]);
  const [owner, setOwner] = useState<IUser>();

  const swipeableRef = useRef(null);

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

  const handlePostDelete = async () => {
    await deletePost(post.id);
    alert("Post deleted");
    swipeableRef.current.close();
  };

  const handlePostEdit = () => {
    router.push(`/posts/${post.id}/edit`);
  };

  return (
    <View style={{ marginBottom: 10 }}>
      {!renderComments && (
        <Swipeable
          renderRightActions={() => (
            <Pressable
              style={{
                width: 120,
                backgroundColor: "red",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={handlePostDelete}
            >
              <FontAwesome name="trash" size={40} color={"white"} />
            </Pressable>
          )}
          renderLeftActions={() => (
            <Pressable
              style={{
                width: 120,
                backgroundColor: "blue",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={handlePostEdit}
            >
              <FontAwesome name="pencil" size={40} color={"white"} />
            </Pressable>
          )}
          ref={swipeableRef}
        >
          <Pressable onPress={handlePostPress}>
            <View style={[styles.container]}>
              <MonoText style={styles.desc}>Author: {owner?.name}</MonoText>
              <MonoText style={styles.title}>{post.title}</MonoText>
              <MonoText style={styles.desc}>{post.body}</MonoText>
              <MonoText>{comments.length} comments</MonoText>
            </View>
          </Pressable>
        </Swipeable>
      )}
      {renderComments && (
        <Pressable onPress={handlePostPress}>
          <View style={[styles.container]}>
            <MonoText style={styles.desc}>Author: {owner?.name}</MonoText>
            <MonoText style={styles.title}>{post.title}</MonoText>
            <MonoText style={styles.desc}>{post.body}</MonoText>
            <MonoText>{comments.length} comments</MonoText>
            {renderComments && <Comments comments={comments} />}
          </View>
        </Pressable>
      )}
    </View>
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
    backgroundColor: "#000",
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
    backgroundColor: "#000",
    padding: 10,
    gap: 10,
  },
});
