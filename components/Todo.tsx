import { ITodo } from "@/models";
import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { View } from "./Themed";
import { MonoText } from "./StyledText";
import { Swipeable } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import { deleteTodo } from "@/actions";
import { router } from "expo-router";

interface TodoProps {
  todo: ITodo;
}

export function Todo({ todo }: TodoProps) {
  const swipeableRef = useRef(null);
  const [todox, setTodox] = useState<ITodo>(todo);

  const handleTodoPress = () => {
    setTodox({ ...todox, completed: !todox.completed });
  };

  const handleTodoDelete = async () => {
    if (!todo.id) return;
    await deleteTodo(todo.id);
    alert("Todo deleted");
    swipeableRef.current.close();
  };

  const handleTodoEdit = () => {
    router.push(`/todos/${todo.id}/edit`);
    swipeableRef.current.close();
  };

  return (
    <View style={{ borderTopColor: "#fff", borderTopWidth: 0.5 }}>
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
            onPress={handleTodoDelete}
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
            onPress={handleTodoEdit}
          >
            <FontAwesome name="pencil" size={40} color={"white"} />
          </Pressable>
        )}
        ref={swipeableRef}
      >
        <Pressable onPress={handleTodoPress}>
          <View style={[styles.container]}>
            <MonoText style={styles.desc}>
              {todox.completed ? (
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 10 }}>
                  <FontAwesome name="check-circle" size={24} color="green" />
                  <MonoText>{todo.title}</MonoText>
                </View>
              ) : (
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 10 }}>
                  <FontAwesome name="times-circle-o" size={24} color="red" />
                  <MonoText>{todo.title}</MonoText>
                </View>
              )}
            </MonoText>
          </View>
        </Pressable>
      </Swipeable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    backgroundColor: "#000",
    paddingVertical: 25,
    paddingHorizontal: 25,
  },
  desc: {
    fontSize: 16,
  },
});
