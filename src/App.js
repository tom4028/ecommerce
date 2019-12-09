import React,{Component} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';

import {createStructuredSelector} from 'reselect';
import { selectCurrentUser} from './redux/user/user.selectors';

import './App.css';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends Component {

  // constructor(props){
  //   super(props);

  //   this.state={
  //     currentUser:null
  //   }
  // }

  

  unsubscribeFromAuth=null;

  componentDidMount(){
    const { setCurrentUser }= this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth=>{
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        
        
        userRef.onSnapshot(snapShot=>{
          setCurrentUser({
            id:snapShot.id,
            ...snapShot.data()
          })
          // this.setState({
          //   currentUser:{
          //     id:snapShot.id,
          //     ...snapShot.data()
          //   }
          // });
          
        });
        
      }else{
        setCurrentUser(userAuth);
      }
      
    });
  }

  // componentDidMount(){
  //   this.unsubscribeFromAuth = auth.onAuthStateChanged( async user=>{
  //     //await this.setState({currentUser:user});
  //     createUserProfileDocument(user);
  //     //console.log(this.state.currentUser);
  //   });
  // }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    const { currentUser } = this.props;
    //console.log("curentuser from app:",this.state.currentUser);
    return (
      <div>
        <Header />
        <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/checkout" component={CheckoutPage}/>
        <Route exact path="/signin" render={()=>currentUser ? (<Redirect to='/'/>):(<SignInAndSignUpPage />)}/>
        {/* <Route exact path="/signin"  component={SignInAndSignUpPage}/> */}
        </Switch>
      </div>
    );
  }
};

const mapStateToProps=createStructuredSelector({
  currentUser:selectCurrentUser
});

//before reselect
// const mapStateToProps=({user})=>({
//   currentUser:user.currentUser
// })

const mapDispatchToProps = dispatch=>({
  setCurrentUser:user=>dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
