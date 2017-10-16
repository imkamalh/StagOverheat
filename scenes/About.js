import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  Header,
  Title,
  Container,
  Content,
  Left,
  Body,
  Right,
  ListItem,
  Text,
  Icon
} from "native-base";

export default class About extends Component {
  renderHeader() {
    const { title } = this.props;

    return (
      <Header>
        <Body>
          <Title>{title}</Title>
        </Body>
      </Header>
    );
  }

  render() {
    return (
      <Container>
        {this.renderHeader()}
        <Content style={styles.container}>
          <Text style={styles.welcome}>About Page</Text>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    margin: 10,
    textAlign: "center"
  }
});
