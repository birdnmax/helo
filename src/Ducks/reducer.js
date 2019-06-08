const REGISTER_USER = 'REGISTER_USER';
const LOGIN_USER = 'LOGIN_USER';

const initialState ={
    username: '',
    id: '',
    profilePic: ''
}

function reducer(state = initialState, action){
    switch(action.type){
        default: return state;
    }
}

export default (reducer);