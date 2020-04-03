import React from 'react';
import { Component } from 'react';


class ShoppingList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            shoppingList: [],
            error: null
        }
    }


    handleSubmit = (e) => {
        e.preventDefault();
        let { ingredient_name, low, out_of_stock } = e.target;
        


    }
    render() {
        return (
          <div>  
            <ShoppingList>
                Hello
            </ShoppingList>
          </div>  

        )
    }
}

export default ShoppingList;