import { observable } from "mobx";
import { ListView } from "react-native";
import Rest from "fetch-on-rest";

class QuestionStore {
  // questions = [
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
  @observable dataSource;
  @observable question = {};
  @observable dataSourceAnswers;

  constructor() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });
    this.dataSource = ds.cloneWithRows([]);
    this.dataSourceAnswers = ds.cloneWithRows([]);
    this.api = new Rest("http://192.168.0.103:8000/api/v1");
    this.refresh();
  }

  add(doc) {
    this.api.post("question", doc);
  }

  refresh() {
    const self = this;
    this.api.get("question").then(function(response) {
      self.dataSource = self.dataSource.cloneWithRows(response);
    });
    //this.dataSource = this.dataSource.cloneWithRows(this.questions);
  }

  search(search) {
    const self = this;

    //call api localhost/question?search=search
    //then set the response to dataSource to refresh it reactively
    this.api.get("question", { search: search }).then(function(response) {
      self.dataSource = self.dataSource.cloneWithRows(response);
    });
  }

  update(id, doc) {
    const self = this;

    //call api PUT localhost/question/{id}, with passed data
    this.api.put("question/" + id, doc).then(function() {
      self.refresh();
      //panggil method findOne
      self.findOne(id);
    });
  }

  findOne(id) {
    const self = this;

    //call api GET localhost/question/{id}, untuk ambil obj
    this.api.get("question/" + id).then(function(response) {
      //set obj response to store.question reactively
      self.question = response;
    });
  }

  addAnswer(questionId, doc) {
    const self = this;
    this.api
      .post("question/" + questionId + "/answers", doc)
      .then(function(response) {
        self.findAnswers(questionId);
      });
  }

  //get all answers by questionId
  findAnswers(questionId) {
    const self = this;
    this.api
      .get("question/" + questionId + "/answers")
      .then(function(response) {
        self.dataSourceAnswers = self.dataSourceAnswers.cloneWithRows(response);
      });
  }
}

const questionStore = new QuestionStore();
export default questionStore;
