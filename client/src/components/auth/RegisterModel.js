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
import {register} from '../../actions/authActions';
import { clearErrors } from "../../actions/errorActions";


const RegisterModal = () =>{
    const [modal, setModal] = useState({
        modal: false,
        name:'',
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
        register({name:modal.name, email: modal.email, password: modal.password }, dispatch);
        //if Register Success close modal
      
    }
    useEffect(()=>{
        if(modal.modal && auth.isAuthenticated){
            toggle();
        }
    },[auth.isAuthenticated])

    return(
        <div>
           <NavLink onClick={toggle} href="#">Register</NavLink>
            <Modal isOpen={modal.modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>
                    Register
                </ModalHeader>
                <ModalBody>
                    {error.id ==="REGISTER_FAIL" ? <Alert color="danger">{error.msg.msg}</Alert> : null}
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <Label for='name'> Name</Label>
                            <Input type="text" name="name" id="name" placeholder="Name" className="mb-3" onChange={e => setModal(prevState =>({...prevState, [e.target.name] :e.target.value}))}>
                            </Input>
                            <Label for='email'> Email</Label>
                            <Input type="email" name="email" id="email" placeholder="Email" className="mb-3" onChange={e => setModal(prevState =>({...prevState, [e.target.name] :e.target.value}))}>
                            </Input>
                            <Label for='password'> Password</Label>
                            <Input type="password" name="password" id="password" placeholder="Password" className="mb-3" onChange={e => setModal(prevState =>({...prevState, [e.target.name] :e.target.value}))}>
                            </Input>
                            <Button color="dark" style={{marginTop: '2rem'}} block>
                               Register
                            </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );

}

export default RegisterModal;