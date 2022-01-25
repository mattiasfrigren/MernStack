import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNavBar from './components/AppNavBar';
import ShoppingList from './components/ShoppingList';
import {Provider} from 'react-redux';
import store from './store'
import ItemModel from './components/itemModel';
import {Container} from 'reactstrap';
import {loadUser} from './actions/authActions';
import { useEffect } from 'react';

function App() {

  useEffect(()=>{
   loadUser(store.dispatch, store.getState);
  },[])
  return (
    <Provider store={store}>
    <div className="App">
      <AppNavBar/>
      <Container>
      <ItemModel/>
      <ShoppingList/>
      </Container>
    </div>
    </Provider>
  );
}

export default App;
