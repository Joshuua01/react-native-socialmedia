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
    <View style={{ marginBottom: 20 }}>
      <MonoText>{post.title}</MonoText>
      <MonoText>{post.body}</MonoText>
      <MonoText>{comments.length} comments</MonoText>
    </View>
  );
}
