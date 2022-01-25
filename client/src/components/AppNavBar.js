import React, { Fragment, useState} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';
import RegisterModal from './auth/RegisterModel';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';
import { useSelector } from 'react-redux';

const AppNavBar = () =>{
    const [isOpen, setIsOpen] = useState(false);

    const auth = useSelector(state => state.auth);

   const toggle =() =>{
        setIsOpen(!isOpen);
    }
    const authLinks = (
        <Fragment>
            <NavItem>
                <span className='navbar-text mr-3'>
                    <strong>{auth.user ? `Welcome ${auth.user.name}` :null}</strong>
                </span>
            </NavItem>
        <NavItem>
        <Logout/>
    </NavItem>
    </Fragment>
    );

    const guestLinks = (
        <Fragment>
        <NavItem>
        <RegisterModal/>
     </NavItem>
     <NavItem>
         <LoginModal/>
     </NavItem>
     </Fragment>

    );

    return(
    <div>
        <Navbar color='dark' dark expand="sm" className='mb-5'>
            <Container>
                <NavbarBrand href='/'>
                    ShoppingList
                </NavbarBrand>
                <NavbarToggler onClick={toggle}/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav className='ml-auto' navbar>
                   {auth.isAuthenticated ? authLinks :guestLinks}
                    </Nav>
                </Collapse>
            </Container>
            
        </Navbar>
    </div>
    );

}


export default AppNavBar;