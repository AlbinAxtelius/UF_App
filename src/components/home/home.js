import React, { Component } from 'react';
import { View, Text, Button, ListView } from 'react-native';
import { Link } from 'react-router-native';
import fire from '../../config/config';

class Home extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      profiles: [],
    };
  }

  componentWillMount() {
    fire.database().ref().child("/Profiles/" + fire.auth().currentUser.uid).once("child_added", snap => {
      let oldProfiles = this.state.profiles;
      oldProfiles.push({
        id: snap.key,
        name: snap.val().name,
      });
      console.log(oldProfiles);
      this.setState({
        profiles: oldProfiles
      })
    })
  }

  render() {
    return (
      <View>
        <ListView
          enableEmptySections={true}
          style={{ marginTop: 20 }}
          dataSource={this.ds.cloneWithRows(this.state.profiles)}
          renderRow={rowData => <Text>{rowData.name}, {rowData.id}</Text>} />
        <Link style={{ marginTop: 100 }} to="/CreateProfile">
          <Text>{this.props.userData.uid}</Text>
        </Link>
        <Button title="Log out" onPress={() => fire.auth().signOut()} />
      </View>
    );
  }
}

export default Home;
