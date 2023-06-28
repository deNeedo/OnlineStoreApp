import { createContext, useState } from "react";

export const ListContext = createContext({
    items: [],
    getProductQuantity: () => {},
    AddOneToCart: () => {},
    removeOneFromCart: () => {},
    deleteFromCart: () => {},
    getTotalCost: () => {}
});

export function ListProvider({children}) {
    const [cartProducts, setCartProducts] =  useState([]);

    function getProductQuantity(id_item) {
        const quantity = cartProducts.find(product => product.item.id_item === id_item)?.quantity;
        if (quantity === undefined) {
            return 0;
        } else {
            return quantity;
        }
    }

    function AddOneToCart(item) {
    
        const quantity = getProductQuantity(item.id_item);
        if (quantity == 0) {
            setCartProducts(
                [
                    ...cartProducts,
                    {
                        item: item,
                        quantity: 1
                    }
                ]
            )
        } else {
            setCartProducts(
                cartProducts.map(
                product => 
                product.item.id_item === item.id_item 
                ? { ...product, quantity: product.quantity + 1} 
                : product 
                )
            )
        }
    }

    function removeOneFromCart(id_item) {
        const quantity = getProductQuantity(id_item);

        if(quantity == 1){
             deleteFromCart(id_item);
        } else {
            setCartProducts(
                cartProducts.map(
                    product => 
                    product.item.id_item === id_item
                    ? { ...product, quantity: product.quantity - 1} 
                    : product 
                    )
            )
        }
    }

    function deleteFromCart(id_item) {
        setCartProducts(
            cartProducts => 
            cartProducts.filter(currentProduct => {
                return currentProduct.item.id_item != id_item;
            })
        )
    }

    function getTotalCost() {
        let totalCost = 0;
        cartProducts.map((cartItem) => {
            totalCost += (cartItem.item.price * cartItem.quantity);
        });
        return totalCost;
    }

    const contextValue = {
        items: cartProducts, 
        getProductQuantity,
        AddOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost
    } 

    return (
        <ListContext.Provider value={contextValue}>
            {children}
        </ListContext.Provider>
    )
}

export default ListProvider;