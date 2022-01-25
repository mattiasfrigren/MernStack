import React, { useEffect, useState } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {login} from '../../actions/authActions';
import { clearErrors } from "../../actions/errorActions";


const LoginModal = () =>{
    const [modal, setModal] = useState({
        modal: false,
        email:'',
        password:'',
        msg: null
    });
    const auth= useSelector( state=> state.auth);
    const error =useSelector(state => state.error);
    
    const dispatch = useDispatch();

    const toggle = () =>{
        dispatch(clearErrors());
        setModal(prevState =>({
            ...prevState, 
            modal :!modal.modal
        }));
        
    }
    
    const onSubmit = (e) =>{
        e.preventDefault();
        login({email:modal.email, password: modal.password}, dispatch)
    }
    useEffect(()=>{
        if(modal.modal && auth.isAuthenticated){
            toggle();
        }
    },[auth.isAuthenticated])

    return(
        <div>
           <NavLink onClick={toggle} href="#">Login</NavLink>
            <Modal isOpen={modal.modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>
                    Login
                </ModalHeader>
                <ModalBody>
                    {error.id ==="LOGIN_FAIL" ? <Alert color="danger">{error.msg.msg}</Alert> : null}
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <Label for='email'> Email</Label>
                            <Input type="email" name="email" id="email" placeholder="Email" className="mb-3" onChange={e => setModal(prevState =>({...prevState, [e.target.name] :e.target.value}))}>
                            </Input>
                            <Label for='password'> Password</Label>
                            <Input type="password" name="password" id="password" placeholder="Password" className="mb-3" onChange={e => setModal(prevState =>({...prevState, [e.target.name] :e.target.value}))}>
                            </Input>
                            <Button color="dark" style={{marginTop: '2rem'}} block>
                               Login
                            </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );

}

export default LoginModal;