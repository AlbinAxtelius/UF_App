import React, { Component } from 'react';
import { View, Text, AsyncStorage, ScrollView, TouchableNativeFeedback, StyleSheet, ActivityIndicator } from 'react-native';
import fire from '../../config/config';
import { connect } from 'react-redux'
import { getGroupId } from '../../actions/groupActions'
import Ionicons from '@expo/vector-icons/Ionicons';
import AddMember from './addMember';

class ManageGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupInfo: {},
      members: [],
      groupId: "",
      loading: true,
      addingMember: false,

    };

    this.db = fire.firestore();
  }

  componentDidMount = () => {
    this.props.getGroupId();
    this.getGroupInfo(this.props.groupId)
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.state.groupId != nextProps.groupId) {
      this.setState({
        groupId: nextProps.groupId,
      })
      this.getGroupInfo(nextProps.groupId);
    } else {
      this.getGroupInfo(this.state.groupId);
    }
  }

  getGroupInfo = (groupId) => {
    if (groupId !== "") {
      if (groupId !== undefined) {
        this.db
          .collection('Groups')
          .doc(groupId)
          .get()
          .then(doc => {
            const data = doc.data();
            let members = []
            data.Members.forEach(m => {
              members.push({
                id: m.userId,
                displayName: m.displayName
              })
            })
            this.setState({
              members: members,
              loading: false
            })
          })
      }
    }
  }

  render() {
    let renderUsers = this.state.members.map(m => {
      return (
        <View key={m.id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <View style={{ marginRight: 15, height: 38, width: 38, backgroundColor: "red", borderRadius: 38 / 2, alignItems: "center", justifyContent: 'center' }}>
            <Text style={{ color: "white", fontWeight: 'bold', lineHeight: 38, height: 38 }}>{m.displayName[0]}</Text>
          </View>
          <Text style={{ fontSize: 24 }}>{m.displayName}</Text>
        </View>
      )
    })
    return (
      <View style={styles.groupView}>
        {this.state.loading ? <ActivityIndicator size={38} /> :
          <View style={styles.members}>
            <Text style={{ fontSize: 16, color: "#1c1c1c" }}>Användare:</Text>
            {renderUsers}
          </View>
        }
        <TouchableNativeFeedback
          onPress={() => this.setState({ addingMember: true })}
          background={TouchableNativeFeedback.SelectableBackground()}>
          <View style={styles.addButton}>
            <Ionicons name="md-person-add" size={24} color="white" />
          </View>
        </TouchableNativeFeedback>
        {this.state.addingMember && <AddMember groupId={this.state.groupId} visible={this.state.addingMember} handleClose={() => this.setState({ addingMember: false })} />}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  groupId: state.groups.groupId
})

export default connect(mapStateToProps, { getGroupId })(ManageGroup)

const styles = StyleSheet.create({
  groupView: {
    flex: 1,
    backgroundColor: "white",
    alignItems: 'center',
  },
  members: {
    width: "90%",
  },
  addButton: {
    backgroundColor: "#66392F",
    position: 'absolute',
    height: 60,
    width: 60,
    right: 20,
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    borderRadius: 30,
  }
})