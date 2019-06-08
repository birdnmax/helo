import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

function Nav(props){
    // if (props.location.pathname !== '/')
    {
        return(
            <div className='Nav'>
                <div className='profile-pic' style={{backgroundImage: `url('${props.profilePic}')`}}></div>
                <p>{props.userName}</p>
                <button>
                    <Link to='/Dashboard'>Home</Link>
                </button>
                <button>
                    <Link to='/Form'>New Post</Link>
                </button>
                <button>
                    <Link to='/'>Logout</Link>
                </button>
            </div>
        )
    }
}
function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps)(Nav);