import { getAlbumById } from "@/actions";
import { Album } from "@/components/Album";
import { IAlbum } from "@/models";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const AlbumPage = () => {
  const id = useLocalSearchParams().id;
  const [album, setAlbum] = useState<IAlbum | null>(null);

  useEffect(() => {
    const fetchAlbum = async (id: number) => {
      const response = await getAlbumById(id);
      setAlbum(response);
    };
    fetchAlbum(Number(id));
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>{album && <Album album={album} pressable={false} renderPictures={true} />}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default AlbumPage;
