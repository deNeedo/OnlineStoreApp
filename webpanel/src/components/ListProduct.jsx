import Button from '@mui/material/Button';
import { ListContext } from "./ListContext";
import { useContext } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { CartContext } from './CartContext';

import cartProductCss from './css/CartProduct.module.css';
import homeCss from './css/Home.module.css';

function ListProduct(props) {

    const cart = useContext(CartContext);

    const list = useContext(ListContext);
    const item = props.item;
    const lang = props.lang;
    const {t} = useTranslation();
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid  className={cartProductCss['item_container']} xs={3}>
                        <img className={cartProductCss['img']} src={item.item.photo}/>
                    </Grid>
                    {lang == 'en' ? <Grid className={cartProductCss['item_container']} xs={2}>
                        {item.item.item_name}
                    </Grid> : <Grid className={cartProductCss['item_container']} xs={2}>
                        {item.item.polish_name}
                    </Grid>}
                    <Grid className={cartProductCss['item_container']} xs={2}>
                    {(item.item.price).toFixed(2)}{t("price_end")}/{t("unit")}
                    </Grid>
                    <Grid className={cartProductCss['item_container']} xs={3}>
                    {item.quantity > 0 ? <Button variant="contained" className={homeCss['add-to-cart']} onClick={() => cart.AddOneToCart(item)}>{t("add_to_cart")}</Button> : <></>}
                    </Grid>
                    <Grid className={cartProductCss['item_container']} xs={2}>
                        <Button className={cartProductCss['button']} onClick={() => list.deleteFromCart(item.item.id_item)}> <DeleteOutlineOutlinedIcon/> </Button>
                    </Grid>
                </Grid>
                <hr></hr>
            </Box>
        </>
    )
}

export default ListProduct;