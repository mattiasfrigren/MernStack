import React, { Fragment } from "react";
import {logout} from '../../actions/authActions';
import {NavLink} from 'reactstrap';
import { useDispatch } from "react-redux";

const Logout =  () =>{

    const dispatch = useDispatch();

    return(
            <Fragment>
                <NavLink onClick={ () =>dispatch(logout())} href="#"> Logout</NavLink>
            </Fragment>
        
    )

}


export default Logout;
