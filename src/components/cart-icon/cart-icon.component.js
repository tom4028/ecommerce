import React from 'react';
import { connect } from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import {createStructuredSelector} from 'reselect';
import { selectCartItemsCount }from '../../redux/cart/cart.selectors';

import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon=({toggleCartHidden,itemCount})=> {
    console.log("itemCount: ",itemCount);
    return (
        <div className="cart-icon" onClick={toggleCartHidden}>
            <ShoppingIcon className=" shopping-icon"/>
            <span className="item-count">{itemCount}</span>
        </div>
    )
}

const mapStateToProps = createStructuredSelector(
    {
        itemCount:selectCartItemsCount
    }
)

//before reselect

// const mapStateToProps =({cart:{cartItems}})=>{
//     return{
//     itemCount:cartItems.reduce((accumulatedQuantity,cartItem)=>accumulatedQuantity+cartItem.quantity,0)
//     }
// }

const mapDispatchToProps= dispatch=>{
    return{
        toggleCartHidden:()=>dispatch(toggleCartHidden())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CartIcon);
