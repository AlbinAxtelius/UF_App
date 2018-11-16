import React, { Component } from 'react';
import { View, Text, AsyncStorage, ScrollView, StyleSheet } from 'react-native';
import fire from '../../config/config';
import { connect } from 'react-redux'
import { getGroupId } from '../../actions/groupActions'

class ManageGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupInfo: {},
      members: [],
      groupId: "",
      loading: true
    };

    this.db = fire.firestore();
  }

  componentDidMount = () => {
    this.props.getGroupId();
    this.getGroupInfo(this.props.groupId)
  }

  componentWillReceiveProps = (nextProps) => {
    console.log("hej")
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
      return <Text key={m.id}>{m.displayName}</Text>
    })
    return (
      <View style={styles.groupView}>
        {this.state.loading ? <Text>Loading</Text> :
          <View style={styles.members}>
            <Text>Users:</Text>
            {renderUsers}
          </View>
        }
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
  }
})