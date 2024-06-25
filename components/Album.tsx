import { deleteAlbum, deletePicture, getPicturesByAlbumId, getUserById } from "@/actions";
import { IAlbum, IPicture, IUser } from "@/models";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { MonoText } from "./StyledText";
import { View } from "./Themed";

interface AlbumProps {
  album: IAlbum;
  renderPictures: boolean;
  pressable: boolean;
}

export function Album({ album, renderPictures, pressable }: AlbumProps) {
  const [pictures, setPictures] = useState<IPicture[]>([]);
  const [owner, setOwner] = useState<IUser>();
  const albumSwipeableRef = useRef(null);
  const refArr: Array<any> = [];

  useEffect(() => {
    const fetchPictures = async () => {
      const response = await getPicturesByAlbumId(album.id);
      setPictures(response);
    };
    const fetchOwner = async () => {
      const response = await getUserById(album.userId);
      setOwner(response);
    };
    fetchPictures();
    fetchOwner();
  }, []);

  const handleAlbumPress = () => {
    if (pressable) {
      router.push(`/albums/${album.id}`);
    }
  };

  const handleAlbumDelete = async () => {
    await deleteAlbum(album.id);
    alert("Album deleted");
    albumSwipeableRef.current.close();
  };

  const handleAlbumEdit = () => {
    router.push(`/albums/${album.id}/edit`);
    albumSwipeableRef.current.close();
  };

  const handlePictureDelete = async (id: number) => {
    await deletePicture(id);
    alert("Picture deleted");
    refArr[id].close();
  };

  return (
    <View>
      {!renderPictures && (
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
              onPress={handleAlbumDelete}
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
              onPress={handleAlbumEdit}
            >
              <FontAwesome name="pencil" size={40} color={"white"} />
            </Pressable>
          )}
          ref={albumSwipeableRef}
        >
          <Pressable onPress={handleAlbumPress}>
            <View style={styles.container}>
              <MonoText style={styles.desc}>Owner: {owner?.name}</MonoText>
              <MonoText style={styles.title}>{album.title}</MonoText>
              <MonoText>{pictures.length} pictures</MonoText>

              {renderPictures &&
                pictures.map((picture) => (
                  <View>
                    <View style={styles.separator} />
                    <View key={picture.id} style={styles.commentContainer}>
                      <Image source={{ uri: picture.url }} style={{ width: 300, height: 300 }} />
                    </View>
                  </View>
                ))}
            </View>
          </Pressable>
        </Swipeable>
      )}
      {renderPictures && (
        <View style={styles.container}>
          <MonoText style={styles.desc}>Owner: {owner?.name}</MonoText>
          <MonoText style={styles.title}>{album.title}</MonoText>
          <MonoText>{pictures.length} pictures</MonoText>

          {renderPictures &&
            pictures.map((picture) => (
              <Swipeable
                key={picture.id}
                ref={(ref) => (refArr[picture.id] = ref)}
                renderRightActions={() => (
                  <Pressable
                    style={{
                      width: 120,
                      backgroundColor: "red",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={() => handlePictureDelete(picture.id)}
                  >
                    <FontAwesome name="trash" size={40} color={"white"} />
                  </Pressable>
                )}
              >
                <View>
                  <View style={styles.separator} />
                  <View style={styles.commentContainer}>
                    <Image source={{ uri: picture.url }} style={{ width: 300, height: 300 }} />
                  </View>
                </View>
              </Swipeable>
            ))}
        </View>
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
    display: "flex",
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
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 5,
    gap: 10,
  },
});
