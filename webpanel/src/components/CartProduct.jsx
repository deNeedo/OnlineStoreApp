import Button from '@mui/material/Button';
import { CartContext } from "./CartContext";
import { useContext } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';

import cartProductCss from './css/CartProduct.module.css';

function CartProduct(props) {
    console.log(props)
    const cart = useContext(CartContext);
    const item = props.item;
    const quantity = props.quantity;
    const lang = props.lang;
    const {t} = useTranslation();
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid  className={cartProductCss['item_container']} xs={2}>
                        <img className={cartProductCss['img']} src={item.item.photo}/>
                    </Grid>
                    {lang == 'en' ? <Grid className={cartProductCss['item_container']} xs={2}>
                        {item.item.item_name}
                    </Grid> : <Grid className={cartProductCss['item_container']} xs={2}>
                        {item.item.polish_name}
                    </Grid>}
                    <Grid className={cartProductCss['item_container']} xs={3}>
                    <Button className={cartProductCss['button']} variant="text" onClick={() => cart.removeOneFromCart(item.item.id_item)}> <IndeterminateCheckBoxOutlinedIcon/> </Button>
                        {quantity}
                        <Button className={cartProductCss['button']} variant="text" onClick={() => cart.AddOneToCart(item.item)}> <AddBoxOutlinedIcon/> </Button>
                    </Grid>
                    <Grid className={cartProductCss['item_container']} xs={2}>
                    {(item.item.price).toFixed(2)}{t("price_end")}/{t("unit")}
                    </Grid>
                    <Grid className={cartProductCss['item_container']} xs={2}>
                    {t("price")} {(item.item.price * quantity).toFixed(2)}{t("price_end")}
                    </Grid>
                    <Grid className={cartProductCss['item_container']} xs={1}>
                        <Button className={cartProductCss['button']} onClick={() => cart.deleteFromCart(item.item.id_item)}> <DeleteOutlineOutlinedIcon/> </Button>
                    </Grid>
                </Grid>
                <hr></hr>
            </Box>
        </>
    )
}

export default CartProduct;