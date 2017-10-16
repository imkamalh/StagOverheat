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
  Input,
  Item,
  Button
} from "native-base";
import { Actions } from "react-native-router-flux";
import { observer } from "mobx-react/native";

@observer
export default class Question extends Component {
  constructor() {
    super();
    this.state = {
      displaySearchBar: false, //show n hide searchbar
      search: "" //search form value
    };
  }
  // const ds = new ListView.DataSource({
  //   rowHasChanged: (r1, r2) => r1 !== r2
  // });
  // this.questions = [
  //   {
  //     title: "First Question",
  //     author: "Feri",
  //     vote: 4,
  //     description: "Description 1",
  //     createdAt: new Date("2017-01-11")
  //   },
  //   {
  //     title: "Second Question",
  //     author: "Donald",
  //     vote: 8,
  //     description: "Description 2",
  //     createdAt: new Date("2017-12-23")
  //   },
  //   {
  //     title: "Third Question",
  //     author: "Heisenberg",
  //     vote: 12,
  //     description: "Description 3",
  //     createdAt: new Date("2016-06-19")
  //   }
  // ];
  // this.state = {
  //   dataSource: ds.cloneWithRows(this.questions)
  // };

  handleAdd() {
    const doc = {
      title: "Fourth Question",
      author: "Walter White",
      vote: 10,
      description: "Description 4",
      createdAt: new Date("2017-03-15")
    };
    this.props.store.add(doc);
  }

  renderHeader() {
    const { title } = this.props;

    let header = (
      <Header>
        <Body>
          <Title>{title}</Title>
        </Body>
        <Right>
          {}
          <Button
            transparent
            onPress={() => this.setState({ displaySearchBar: true })}
          >
            <Icon name="search" style={{ color: "#0098ff" }} />
          </Button>
          <Button transparent onPress={() => Actions.QuestionAdd()}>
            <Icon name="add-circle" style={{ color: "#0098ff" }} />
          </Button>
        </Right>
      </Header>
    );

    //display search form if set true
    if (this.state.displaySearchBar) {
      header = (
        <Header searchBar rounded>
          <Item>
            <Icon name="search" />
            <Input
              placeholder="Search"
              onChangeText={text => this.setState({ search: text })}
              value={this.state.search}
            />
          </Item>
          <Right>
            <Button transparent onPress={() => this.handleSearch()}>
              <Text>Search</Text>
            </Button>
          </Right>
        </Header>
      );
    }
    return header;
  }

  handleSearch() {
    const { search } = this.state;

    //panggil method store
    this.props.store.search(search);
    //hide searchBar and clear search
    this.setState({ displaySearchBar: false });
  }

  handleToQuestionDetail(rowData) {
    //get answer saat list question di klik menuju question Detail
    this.props.store.findAnswers(rowData.id);
    Actions.QuestionDetail({ question: rowData });
  }

  renderRow(rowData) {
    return (
      <ListItem onPress={() => this.handleToQuestionDetail(rowData)}>
        <Body>
          <Text>{rowData.author}</Text>
          <Text note>{rowData.title}</Text>
        </Body>
        <Right>
          <Icon name="arrow-forward" style={{ color: "orange" }} />
        </Right>
      </ListItem>
    );
  }
  // <View style={styles.row}>
  //   <View style={styles.titleRow}>
  //     <Text>{rowData.title}</Text>
  //   </View>
  //   <View style={styles.authorRow}>
  //     <Text>{rowData.author}</Text>
  //   </View>
  // </View>

  render() {
    const { dataSource } = this.props.store;
    return (
      <Container>
        {this.renderHeader()}

        <Content>
          <ListView
            dataSource={dataSource} //wadah dari renderRow sehingga dataSource ditampung di renderRow
            renderRow={this.renderRow.bind(this)}
            enableEmptySections={true}
          />
        </Content>
      </Container>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   row: {
//     flex:1,
//     justifyContent: 'center',
//     padding: 20,
//     marginBottom: 10,
//     backgroundColor: '#FFF',
//     flexDirection: "row"
//   },
//   titleRow: {
//     flex: 4,
//   },
//   authorRow: {
//     flex: 1
//   }
// });
