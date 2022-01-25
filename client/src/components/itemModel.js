import React, { Fragment, useState } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { useDispatch, useSelector} from "react-redux";
import {addItem} from '../actions/itemActions';
import { useStore } from "react-redux";


const ItemModal = () =>{
    const [modal, setModal] = useState(false);
    const [name, setName] = useState('');
    
   
    const dispatch = useDispatch();
    const store = useStore();
    const auth = useSelector(state =>state.auth);

    const toggle = () =>{
        setModal(!modal);
    }
    
    const onSubmit = (e) =>{
        e.preventDefault();
        const newItem ={
            name: name
        }
     
        //add item via addItem action
        addItem(newItem,dispatch,store.getState);
        //close modal
        toggle();
    }

    const authButton = (
        <Fragment>
        <Button color="dark" style={{marginBottom: '2rem'}} onClick={toggle}>
        Add Item
    </Button>
    </Fragment>

    );

    return(
        <div>
            {auth.isAuthenticated ? authButton :<h4 className="mb-3 ml-4"> Please log in to manage items</h4>}
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    Add To Shopping List
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <Label for='item'> Item</Label>
                            <Input type="text" name="name" id="item" placeholder="Add Shopping item"  onChange={e => setName(e.target.value)}>
                            </Input>
                            <Button color="dark" style={{marginTop: '2rem'}} block>
                                Add Item
                            </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );

}

export default ItemModal;