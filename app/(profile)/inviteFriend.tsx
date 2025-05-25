import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, View, Image, FlatList } from "react-native";
import { CustomButton, CustomHeader, JaraText } from "@/components";
import { theme } from "@/constants/theme";
import { ChevronGreyLeftIcon, ShareFilledIcon } from "@/assets/icons";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Contacts from "expo-contacts";

type Contact = {
  id?: string;
  name: string;
  phoneNumbers?: { label: string; number: string }[];
  imageAvailable: boolean;
  image?: { uri: string };
};

const InviteFriends = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Image],
        });
        // console.log(data);

        // Filter out contacts without an id or name, then cast to Contact[]
        const filteredContacts = data.filter(
          (contact) => contact.id && contact.name
        ) as Contact[];

        setContacts(filteredContacts);
      }
    })();
  }, []);

  const renderItem = ({ item }: { item: Contact }) => (
    <View style={styles.contactContainer}>
      <View style={styles.contactInfo}>
        {item.imageAvailable && item.image ? (
          <Image source={{ uri: item.image.uri }} style={styles.contactImage} />
        ) : (
          <Image
            source={{ uri: "https://placeholder.com/50" }}
            style={styles.contactImage}
          />
        )}
        <View style={styles.contactDetails}>
          <JaraText size={16} weight="700" color={theme.colors.black}>
            {item.name}
          </JaraText>
          {item.phoneNumbers && item.phoneNumbers.length > 0 && (
            <JaraText size={14} color={theme.colors.black_21}>
              {item.phoneNumbers[0].number}
            </JaraText>
          )}
        </View>
      </View>
      <CustomButton
        title={"Send Invite"}
        type="linearGradient"
        style={styles.inviteButton}
        titleStyle={{ fontSize: 14, fontWeight: "600" }}
        onPress={() => {}}
      />
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" />
      <CustomHeader
        title="Invite Friends"
        titleStyle={styles.headerTitle}
        leftComponent={<ChevronGreyLeftIcon />}
        onLeftPress={() => router.back()}
        rightComponent={<ShareFilledIcon />}
        containerStyle={styles.headerContainer}
      />

      <JaraText
        align="center"
        color={theme.colors.black_21}
        size={14}
        weight="500"
        style={styles.headerDescription}
        lineHeight={23.8}
      >
        Refer a friend from your contact list and you both get 20% off.
      </JaraText>

      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id || `${item.name}-${Math.random()}`}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.foundation_white_light_hover,
  },
  headerTitle: {
    color: theme.colors.foundation_pumpkin_normal,
  },
  headerContainer: {
    backgroundColor: "transparent",
  },
  headerDescription: {
    letterSpacing: 0.42,
    borderBottomWidth: 1,
    paddingBottom: 16,
    borderBottomColor: theme.colors.black_5,
    paddingHorizontal: 20,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  contactContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.black_5,
  },
  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  contactImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  placeholderImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.black_10,
    marginRight: 10,
  },
  contactDetails: {
    justifyContent: "center",
    gap: 8,
  },
  inviteButton: {
    // backgroundColor: theme.colors.foundation_pumpkin_normal,
    // borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
});

export default InviteFriends;
