import React from "react";
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { theme } from "@/constants/theme";
import { CloseIcon } from "@/assets/icons";
import JaraText from "./JaraText";
import CustomButton from "./CustomButton";

interface Folder {
  id: number;
  name: string;
}

interface SelectFolderModalProps {
  visible: boolean;
  onClose: () => void;
  folders: Folder[];
  onSelectFolder: (folderId: number) => void;
  productName: string;
}

const SelectFolderModal: React.FC<SelectFolderModalProps> = ({
  visible,
  onClose,
  folders,
  onSelectFolder,
  productName,
}) => {
  const renderFolder = ({ item }: { item: Folder }) => (
    <TouchableOpacity
      style={styles.folderItem}
      onPress={() => onSelectFolder(item.id)}
    >
      <JaraText size={14} weight="400" color={theme.colors.black}>
        {item.name}
      </JaraText>
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.content} onStartShouldSetResponder={() => true}>
          <View style={styles.header}>
            <JaraText size={16} weight="600" color={theme.colors.black}>
              Add {productName} to Favorites
            </JaraText>
            <TouchableOpacity onPress={onClose}>
              <CloseIcon />
            </TouchableOpacity>
          </View>

          <FlatList
            data={folders}
            renderItem={renderFolder}
            keyExtractor={(item) => item.id.toString()}
            style={styles.list}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    width: "80%",
    maxHeight: "70%",
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  list: {
    marginTop: 10,
  },
  folderItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.black_5,
  },
});

export default SelectFolderModal;
