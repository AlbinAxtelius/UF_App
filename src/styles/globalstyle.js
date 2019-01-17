import { StyleSheet, StatusBar} from "react-native";

export default globalstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderTopColor: "#156352",
    borderTopWidth: StatusBar.currentHeight
  },

  header: {
    backgroundColor: "#156352",
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    elevation: 20
  },

  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    marginLeft: 20,
    flex: 1
  },

  inputBig: {
    width: "95%",
    marginTop: 16,
    fontSize: 40,
    padding: 5
  },

  popupContainer: {
    flex: 1,
    backgroundColor: "white",
    alignItems: 'center',
  }
});
