import React, { Component } from "react";
import { ListView } from "react-native";
//import { StyleSheet, Text, View, ListView } from 'react-native';
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
  Icon,
  Form,
  Button,
  Label,
  Input,
  Item
} from "native-base";
import { Actions } from "react-native-router-flux";

export default class QuestionAdd extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      vote: 0,
      author: "Danaerys Targaryen" //HARDCODE
    };
  }

  renderHeader() {
    const { title } = this.props;

    return (
      <Header>
        <Left>
          <Button transparent onPress={() => Actions.pop()}>
            <Icon name="arrow-back" style={{ color: "#0098ff" }} />
          </Button>
        </Left>

        <Body>
          <Title>{title}</Title>
        </Body>

        <Right>
          <Button transparent onPress={() => this.handleSave()}>
            <Text style={{ color: "#0098ff" }}>Save</Text>
          </Button>
        </Right>
      </Header>
    );
  }

  handleSave(){
    //save data ke table DB
    this.props.store.add(this.state);

    //refresh hasil store
    this.props.store.refresh()

    //clear the form
    this.setState = ({
      title: "",
      description: ""
    });

    Actions.pop();
  }

  render() {
    return (
      <Container>
        {this.renderHeader()}

        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Title</Label>
              <Input
                onChangeText={text => this.setState({ title: text })}
                value={this.state.title}
              />
            </Item>
            <Item floatingLabel>
              <Label> Description </Label>
              <Input
                onChangeText={text => this.setState({ description: text })}
                value={this.state.description}
                multiLine={true}
                numberOfLines={10}
                style={{height:100, marginTop:20}}
              />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}
