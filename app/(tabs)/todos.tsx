import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getTodosByUserId } from "@/actions";
import { ITodo } from "@/models";
import { Todo } from "@/components/Todo";
import { ScrollView } from "react-native-gesture-handler";
import { MonoText } from "@/components/StyledText";

export default function TodosScreen() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchTodos = async () => {
      if (!user) return;
      const result = await getTodosByUserId(user.id);
      setTodos(result);
    };
    fetchTodos();
  }, []);

  return (
    <View style={styles.container}>
      <MonoText style={styles.title}>My Todos</MonoText>
      <ScrollView>
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
