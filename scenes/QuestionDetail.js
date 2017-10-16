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
  Footer,
  Left,
  Right
} from "native-base";
import { Actions } from "react-native-router-flux";
import { ListView } from "react-native";
import moment from "moment";
import { observer } from "mobx-react/native";

@observer
export default class QuestionDetail extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    //set store dengan objek question diawal
    this.props.store.question = this.props.question;
  }

  renderHeader() {
    const { title } = this.props;
    const questionId = this.props.question.id;
    return (
      <Header>
        <Left>
          <Button transparent onPress={() => Actions.pop()}>
            <Icon name="arrow-back" style={{ color: "white" }} />
          </Button>
        </Left>
        <Body>
          <Title>{title}</Title>
        </Body>
        <Right>
          <Button
            transparent
            onPress={() => Actions.AnswerAdd({ questionId: questionId })}
          >
            <Icon name="add" style={{ color: "#057ce4" }} />
            <Text>Answer</Text>
          </Button>
        </Right>
      </Header>
    );
  }

  voteUp() {
    //ambil nilai id dan vote dari props
    const { id, vote } = this.props.store.question;

    //panggil method update
    this.props.store.update(id, { vote: vote + 1 });
  }

  voteDown() {
    //ambil nilai id dan vote dari props
    const { id, vote } = this.props.store.question;

    //panggil method update
    this.props.store.update(id, { vote: vote - 1 });
  }

  renderAnswerRow(rowData) {
    return (
      <Card>
        <CardItem bordered>
          <Body>
            <Text note>
              Someone, on {moment(new Date()).format("DD/MM/YYY")}
            </Text>
          </Body>
        </CardItem>
        <CardItem>
          <Body>
            <Text>{rowData.text}</Text>
          </Body>
        </CardItem>
      </Card>
    );
  }

  render() {
    const {
      title,
      author,
      description,
      createdAt,
      vote
    } = this.props.store.question;
    return (
      <Container>
        {this.renderHeader()}
        <Content>
          <Card>
            <CardItem bordered>
              <Left>
                <Icon name="help-circle" />
                <Body>
                  <Text>{title} </Text>
                  <Text note>
                    {author}, on {moment(createdAt).format("DD/MM/YY")}
                  </Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <Text> {description} </Text>
              </Body>
              <Right>
                <Button transparent onPress={() => this.voteUp()}>
                  <Icon active name="arrow-up" />
                </Button>
                <Text>{vote}</Text>
                <Button transparent onPress={() => this.voteDown()}>
                  <Icon active name="arrow-down" />
                </Button>
              </Right>
            </CardItem>
          </Card>
        </Content>
        <Footer style={{ height: 320 }}>
          {/*Answer List*/}
          <ListView
            dataSource={this.props.store.dataSourceAnswers}
            renderRow={this.renderAnswerRow.bind(this)}
            enableEmptySections={true}
          />
        </Footer>
      </Container>
    );
  }
}
