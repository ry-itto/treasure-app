import React from 'react';
import firebase from '../../firebase';
import { updateArticle } from '../../api';

class UpdateArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      errorMessage: '',
      title: '',
      body: '',
      user: null,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({user: user});
      } else {
        this.setState({
          user: null
        });
      }
    });
  }

  handleTitleChange(event) {
    this.setState({
      title: event.target.value
    });
  }

  handleBodyChange(event) {
    this.setState({
      body: event.target.value
    });
  }

  handleUpdateArticle() {
    const body = {
      title: this.state.title,
      body: this.state.body
    }
    const {params} = this.props.match
    const id = parseInt(params.id, 10)
    this.state.user 
      .getIdToken()
      .then(token => {
        updateArticle(body, token, id)
          .then(res => {
            if (res.status === 201) {
              this.setState({
                message: 'Success!!'
              });
            }
          })
          .catch(error => {
            this.setState({
              errorMessage: error.toString()
            })
          })
      })
  }

  render() {
    return (
      <div>
        <form>
          <label>タイトル</label>
          <input id="title" type="text" value={this.state.title} onChange={this.handleTitleChange.bind(this)}></input>
          <label>内容</label>
          <input id="body" type="text" value={this.state.body} onChange={this.handleBodyChange.bind(this)}></input>
          <button type="button" onClick={this.handleUpdateArticle.bind(this)}>更新</button>
        </form>
      </div>
    )
  }
}

export default UpdateArticle;