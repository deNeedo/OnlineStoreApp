import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useNotifications } from 'reapop';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import PersonIcon from '@mui/icons-material/Person';
import ConstructionIcon from '@mui/icons-material/Construction';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import headerCss from './css/Header.module.css';
import Logo from '../../img/page-icon.ico';
import CartPNG from '../../img/icons8-cart-96.png';
import WishPNG from '../../img/icons8-list-64.png';
import USFlagPNG from '../../img/united-states.png';
import PLFlagPNG from '../../img/poland.png';
import ProfilePNG from '../../img/profile.png';
import CartProduct from './CartProduct';
import ListProduct from './ListProduct';
import { ListContext } from './ListContext';
import { CartContext } from './CartContext';

export function Header({props}) {
    const {t} = useTranslation();
    const {notify} = useNotifications();
    const navigate = useNavigate();
    const location = useLocation();

    const loginRedirect = () => {
        if (props.auth != null) {props.setAuth(null); notify(t("log_out_mess"), 'success');}
        else {navigate('/login', {state: {lang: props.lang, auth: props.auth}});setAnchorEl(null);}
    }
    const registerRedirect = () => {
        if (props.auth != null) {notify(t("already_logged_in_mess"), 'info')}
        else {navigate('/register', {state: {lang: props.lang, auth: props.auth}});setAnchorEl(null);}
    }
    const employeeLoginRedirect = () => {
        if (props.auth != null) {props.setAuth(null); notify(t("log_out_mess"), 'success');}
        else {navigate('/employee-login', {state: {lang: props.lang, auth: props.auth}});setAnchorEl(null);}
    }
    const employeeRegisterRedirect = () => {
        if (props.auth != null) {notify(t("already_logged_in_mess"), 'info')}
        else {navigate('/employee-register', {state: {lang: props.lang, auth: props.auth}});setAnchorEl(null);}
    }

    const OrdersRedirect = () => {
      if (props.auth != null) {navigate('/orders', {state: {lang: props.lang, auth: props.auth}})}
      else {notify(t("feature_message"), 'info');}
    }

    const homeRedirect = () => {navigate('/home', {state: {lang: props.lang, auth: props.auth}})}
    const handleChange = (e) => {props.setLang(e.target.value);}

    const make_purchase = () => {
      console.log("siemaneczko");
    }

    
    const StyledMenu = styled((props) => (
        <Menu
          elevation={0}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          {...props}
        />
      ))(({theme}) => ({
        '& .MuiPaper-root': {
          borderRadius: 6,
          marginTop: theme.spacing(1),
          minWidth: 180,
          color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
          boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
          '& .MuiMenu-list': {
            padding: '4px 0',
          },
          '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
              fontSize: 18,
              color: theme.palette.text.secondary,
              marginRight: theme.spacing(1.5),
            },
            '&:active': {
              backgroundColor: alpha(
                theme.palette.success.dark,
                theme.palette.action.selectedOpacity,
              ),
            },
          },
        },
      }));
      
        const [anchorEl, setAnchorEl] = React.useState(null);
        const open = Boolean(anchorEl);
        const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
          setAnchorEl(null);
        };

        const [anchorEl2, setAnchorEl2] = React.useState(null);
        const open2 = Boolean(anchorEl2);
        const handleClick2 = (event) => {
          setAnchorEl2(event.currentTarget);
        };
        const handleClose2 = () => {
          setAnchorEl2(null);
        };

        const [openCartModal, setCartOpen] = React.useState(false);
        const handleCartOpen = () => {
          if (props.auth != null) {setCartOpen(true);}
          else {notify(t("feature_message"), 'info');}
        }
        const handleCartClose = () => setCartOpen(false);

        // Shopping Cart Modal Styling //
        const style = {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '50%',
          // height: '75%',
          bgcolor: 'background.paper',
          border: '1px solid #ffffff',
          // boxShadow: 24,
          p: 3,
        };

        const [openListModal, setListOpen] = React.useState(false);
        const handleListOpen = () => {
          if (props.auth != null) {setListOpen(true);}
          else {notify(t("feature_message"), 'info');}
        }
        const handleListClose = () => setListOpen(false);

        const cart = useContext(CartContext);
        const list = useContext(ListContext);

        const productCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);
        const ListproductCount = list.items.reduce((sum, product) => sum + product.quantity, 0);


    return (
        <nav>
            <div className={headerCss['header']}>
                <div className={headerCss['logo-and-title']}>
                <img onClick={homeRedirect} className={headerCss['logo']} src={Logo} alt='Logo'/>
                <span onClick={homeRedirect} className={headerCss['title']}>{t("site_name")}</span>
                </div>
                <div className={headerCss['nav']}>

                {
                  props.auth ?
                  <></>
                  :
                    <div className={headerCss['register-box']}>
                      <Button
                          className={headerCss['dropdown-menu']}
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                          variant="contained"
                          onClick={handleClick}
                          endIcon={<KeyboardArrowDownIcon />}
                      >
                          {t("register")}
                      </Button>
                      <StyledMenu
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                      >
                          <MenuItem onClick={registerRedirect} disableRipple>
                          <PersonIcon />
                          {t("customer_register")}
                          </MenuItem>
                          <Divider sx={{ my: 0.5 }} />
                          <MenuItem onClick={employeeRegisterRedirect} disableRipple>
                          <ConstructionIcon />
                          {t("employee_register")}
                          </MenuItem>
                      </StyledMenu>
                    </div>
                }
                {
                  props.auth ?
                    <div className={headerCss['login-box']}>
                      <Button
                          className={headerCss['dropdown-menu']}
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                          variant="contained"
                          onClick={loginRedirect}
                      >
                        {t("logout")}
                      </Button>
                    </div>
                  :
                    <div className={headerCss['login-box']}>
                      <Button
                          className={headerCss['dropdown-menu']}
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                          variant="contained"
                          onClick={handleClick2}
                          endIcon={<KeyboardArrowDownIcon />}
                      >
                          {t("login")}
                      </Button>
                      <StyledMenu
                          anchorEl={anchorEl2}
                          open={open2}
                          onClose={handleClose2}
                      >
                          <MenuItem onClick={loginRedirect} disableRipple >
                          <PersonIcon />
                          {t("customer_account")}
                          </MenuItem>
                          <Divider sx={{ my: 0.5 }} />
                          <MenuItem onClick={employeeLoginRedirect} disableRipple>
                          <ConstructionIcon />
                          {t("employee_account")}
                          </MenuItem>
                      </StyledMenu>
                    </div>
                }

                    <img onClick={handleCartOpen} className={headerCss['icon']} src={CartPNG}/><span className={headerCss['product-counter']}>{productCount}</span>
                    <img onClick={handleListOpen} className={headerCss['icon']} src={WishPNG}/><span className={headerCss['product-counter']}>{ListproductCount}</span>
                    <img onClick={OrdersRedirect} className={headerCss['icon']} src={ProfilePNG}/>

                    <FormControl className={headerCss['form-control']}>
                        <Select className={headerCss['select']} 
                            sx={{ boxShadow: "none", ".MuiOutlinedInput-notchedOutline": { border: 0 }, 
                            "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": { border: 0, }, 
                            "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": { border: 0, },
                            ".MuiSvgIcon-root": {fill: "white !important",}
                        }}
                        value={props.lang}
                        onChange={handleChange}
                        >
                        <MenuItem value={'pl'}><img className={headerCss['flags']} src={PLFlagPNG} onClick={() => i18next.changeLanguage('pl')}/></MenuItem>
                        <MenuItem value={'en'}><img className={headerCss['flags']} src={USFlagPNG} onClick={() => i18next.changeLanguage('en')}/></MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            
            <Modal
              open={openCartModal}
              onClose={handleCartClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6">
                <p className={headerCss['cart_title']}>{t("shopping_cart")}</p>
                </Typography>
                <Typography>
                  {productCount > 0 ?
                  <>
                    <hr></hr>
                    {cart.items.map((currentProduct) => (
                      <CartProduct key={Math.random()} item={currentProduct} quantity={currentProduct.quantity} lang={props.lang}> </CartProduct> 
                    ))}
                      <p> {t("total")}: {cart.getTotalCost().toFixed(2)}{t("price_end")} </p>
                      <Button className={headerCss['purchase_items_btn']} onClick={make_purchase} variant='contained'> Purchase items! </Button>
                    </>
                    :
                    <p className={headerCss['cart_empty_message']}>{t("cart_empty")}</p>
                  }
                </Typography>

              </Box>
            </Modal>

            <Modal
              open={openListModal}
              onClose={handleListClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6">
                <p className={headerCss['cart_title']}>{t("wishlist")}</p>
                </Typography>
                <Typography>
                  {ListproductCount > 0 ?
                  <>
                    <hr></hr>
                    {list.items.map((currentProduct) => (
                      <ListProduct key={Math.random()} item={currentProduct} quantity={currentProduct.quantity} lang={props.lang}> </ListProduct> 
                    ))}
                    </>
                    :
                    <p className={headerCss['cart_empty_message']}>{t("wishlist_empty")}</p>
                  }
                </Typography>
              </Box>
            </Modal>
        </nav>
    )
}

export default Header;