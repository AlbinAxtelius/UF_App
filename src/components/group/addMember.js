import React, { Component } from 'react'
import fire from '../../config/config';

export class AddMember extends Component {
  handleAccept = async () => {
    fetch("adduser")
  }
  render() {
    return (
      <div>
        <Modal
          animationType="slide"
          onRequestClose={() => this.props.handleClose()}
          visible={this.props.visible}
        >
          <View style={styles.container}>
            <TextInput
              underlineColorAndroid="#27AE60"
              value={this.state.taskName}
              onChangeText={taskName => this.setState({ taskName })}
              placeholder="Task name"
              style={styles.taskTitle} />
            <View style={{ alignSelf: 'flex-start', marginLeft: "2.5%" }}>
              <Text>{this.state.errorMsg}</Text>
            </View>
            <Button onPress={() => this.handleAccept()} title="Lägg till" />
          </View >
        </Modal>
      </div>
    )
  }
}

export default AddMember
