import ActionTypes from '../constant/constant';


import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDl_gRZh1p2-nTYV9L8Q6WMTulI1WxCwpc",
    authDomain: "cv-hassan-raza.firebaseapp.com",
    databaseURL: "https://cv-hassan-raza.firebaseio.com",
    projectId: "cv-hassan-raza",
    storageBucket: "cv-hassan-raza.appspot.com",
    messagingSenderId: "238703049452"
};
firebase.initializeApp(config);


export function addTodo(get) {
    return dispatch => {
        let todo = {
            todo: get,
            flag: true
        }
        firebase.database().ref('/').child("name").push(todo)
    }
}

export function getData() {
    return dispatch => {
        firebase.database().ref('/').child("name").on("child_added", function (data) {
            var obj = data.val();
            obj.id = data.key;
            dispatch({ type: ActionTypes.TODO, payload: obj })
        })

    }
}

export function callDelete(id, ind) {
    return dispatch => {
        firebase.database().ref('/').child(`name/${id}`).remove();
        dispatch({ type: ActionTypes.DELETETODO, payload: ind })


    }
}

export function editedTodo(val, ind) {
    return dispatch => {


        dispatch({ type: ActionTypes.EDITTODO, index: ind })


    }
}

export function updateTodo(val, ind, id) {
    return dispatch => {
        firebase.database().ref('/').child(`name/${id}`).update({ todo: val })

        dispatch({ type: ActionTypes.UPDATETODO, payload: val, index: ind })


    }
}


export function deleteAll(){
    return dispatch => {
        firebase.database().ref('/').child(`name`).remove()

        dispatch({type: ActionTypes.DELETEALLTODO})
    }
}