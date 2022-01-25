import React, {useEffect} from "react";
import { Container,ListGroup,ListGroupItem, Button} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import { useSelector, useDispatch, useStore } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";

const ShoppingList = () =>{
    
    const dispatch = useDispatch();
    const store = useStore();
    const newItems = useSelector(state =>state.item);   
    const auth = useSelector(state => state.auth);

    useEffect(()=>{
        getItems(dispatch);
    },[])

    return (
        
        <Container>   
           {  <ListGroup>
                <TransitionGroup className="shopping-list">
                    {newItems.items.map(( item) =>(
                        <CSSTransition key={item._id} timeout={500} classNames="fade">
                            <ListGroupItem>
                                {auth.isAuthenticated ? <Button
                                className="remove-btn"
                                color="danger"
                                size="sm"
                                onClick={ () => deleteItem(item._id,dispatch,store.getState)}
                                >&times;</Button> : null}
                                
                                {item.name}
                            </ListGroupItem>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </ListGroup> }
        </Container>
    );

}

export default ShoppingList;
