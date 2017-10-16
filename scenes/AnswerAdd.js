import React, { Component } from "react";
import {
  Header,
  Body,
  Title,
  Container,
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Form,
  Item,
  Label,
  Input,
  Left,
  Right
} from "native-base";
import { Actions } from "react-native-router-flux";
import moment from "moment";

export default class AnswerAdd extends Component {
  constructor() {
    super();
    this.state = {
      text: ""
    };
  }

  renderHeader() {
    const { title } = this.props;
    return (
      <Header>
        <Left>
          <Button transparent OnPress={() => Actions.pop()}>
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

  handleSave() {
    const { questionId } = this.props;

    //save data to DB with Store
    this.props.store.addAnswer(questionId, this.state); //add 2 param | questionId = question dengan objek id dan this.state isinya di constructor

    //clear the form
    this.setState({ text: "" });

    //back to main page
    Actions.pop();
  }

  render() {
    return (
      <Container>
        {this.renderHeader()}
        <Content>
          <Form>
            <Item floatingLabel last>
              <Label>Text</Label>
              <Input
                onChangeText={text => this.setState({ text: text })}
                value={this.state.text}
                multiline={true}
                nimberOfLines={10}
                style={{ height: 200, marginTop: 20 }}
              />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}
