import { deleteComment } from "@/actions";
import { IComment } from "@/models";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { MonoText } from "./StyledText";

interface CommentsProps {
  comments: IComment[];
}

const Comments = ({ comments }: CommentsProps) => {
  const refArr: Array<any> = [];

  const handleCommentDelete = async (id: number | undefined) => {
    if (!id) return;
    await deleteComment(id);
    refArr[id].close();
    alert("Comment deleted");
  };
  const handleCommentEdit = (postId: number | undefined, commentId: number | undefined) => {
    router.push(`/posts/${postId}/comments/${commentId}/edit`);
    refArr[commentId].close();
  };

  return (
    <View>
      {comments.map((comment) => (
        <View key={comment.id}>
          <View style={styles.separator} />
          <Swipeable
            ref={(ref) => (refArr[comment.id] = ref)}
            renderRightActions={() => (
              <Pressable
                style={{
                  width: 120,
                  backgroundColor: "red",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => handleCommentDelete(comment.id)}
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
                onPress={() => {
                  handleCommentEdit(comment.postId, comment.id);
                }}
              >
                <FontAwesome name="pencil" size={40} color={"white"} />
              </Pressable>
            )}
          >
            <View key={comment.id} style={styles.commentContainer}>
              <MonoText>{comment.email}</MonoText>
              <MonoText style={{ fontWeight: "bold" }}>{comment.name}</MonoText>
              <MonoText>{comment.body}</MonoText>
            </View>
          </Swipeable>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    marginVertical: 15,
    height: 1,
    backgroundColor: "#eee",
  },
  commentContainer: {
    backgroundColor: "#000",
    padding: 10,
    gap: 10,
  },
});

export default Comments;
