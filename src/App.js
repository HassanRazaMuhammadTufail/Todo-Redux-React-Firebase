import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { addTodo } from './store/actions';
import { getData, editedTodo, callDelete, updateTodo, deleteAll } from './store/actions';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { ListItem } from 'material-ui/List';




const paperStyle = {
  height: 100,
  padding: 15,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
}
const style = {
  margin: 12,
};




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

      name: "",
      editname: '',
      flag: false,
      val: [],
      id: []

    }
  }


  handleChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value
    })
  }

  onChangeHandler(eve) {
    this.setState({
      [eve.target.name]: eve.target.value
    })
  }

  submit() {
    let name1 = this.state.name
    this.props.addTodo(name1)
    this.state.name = ""

  }

  editSubmit(ind, id) {
    let edited = this.state.editname

    this.props.updateTodo(edited, ind, id)
  }


  edit(val, ind) {
    this.props.editedTodo(val, ind)

  }


deleteAll(){
  this.props.deleteAll()
}





  delete(id, ind) {
    this.props.callDelete(id, ind)
  }

  componentWillMount() {
    this.props.getData()
  }

  render() {

    return (

      <div>
        <AppBar title="Todo Application"> 
          <RaisedButton label="Delete All" primary={true} style={style} onClick={this.deleteAll.bind(this)} />
          </AppBar>
        <Paper style={paperStyle} zDepth={2}>


          <TextField hintText="Your todo goes here . . ." floatingLabelText="Todo Input" ref="name" name="name" onChange={this.handleChange.bind(this)} />
          <RaisedButton label="Save" primary={true} style={style} onClick={this.submit.bind(this)} />
        </Paper>


        {
          this.props.todo.map((val, ind) => {
            

            return (
              <div key={ind}>
                <Paper style={paperStyle} zDepth={2}>
                  <ListItem value={3} primaryText={val.todo} key={val.id} />
                 


                  {(!val.flag) ?
                    <div>
                      <TextField hintText='edit' ref='editname' name='editname' onChange={this.onChangeHandler.bind(this)} />

                      <RaisedButton label="update" primary={true} style={style} onClick={this.editSubmit.bind(this, ind, val.id)} />

                    </div>
                    :

                    <div>
                      <RaisedButton label="Delete" secondary={true} onClick={this.delete.bind(this, val.id, ind)} />

                      <RaisedButton label="Edit" style={style} onClick={this.edit.bind(this, val, ind)} />

                    </div>
                  }
                </Paper>

              </div>
            )
          })
        }


      </div>
    );
  }
}


function mapStateToProp(state) {
  return ({
    todo: state.root.todo,
    flag: state.root.flag

  })
}
function mapDispatchToProp(dispatch) {
  return ({
    addTodo: (name) => { dispatch(addTodo(name)) },
    getData: () => { dispatch(getData()) },
    callDelete: (id, ind) => { dispatch(callDelete(id, ind)) },
    editedTodo: (val, ind) => { dispatch(editedTodo(val, ind)) },
    updateTodo: (val, ind, id) => { dispatch(updateTodo(val, ind, id)) },
    deleteAll: () => { dispatch(deleteAll()) }

  })
}





export default connect(mapStateToProp, mapDispatchToProp)(App);
