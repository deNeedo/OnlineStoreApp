import React from "react";
import { Grid, Box,Typography} from '@mui/material';
const ProductList = () => {

    
    return ( 
       <Grid container spacing={2}>
            <Grid item border='solid 1px'  borderRadius='15px'>
                <Box 
                component='img' 
                src='../../img/potato.jpg'
                width='300px'
                height='300px'></Box>
                <Typography 
                    variant="h6" 
                    fontWeight='bold'
                    >Potato
                </Typography>
                <Typography 
                    variant="h5" 
                    fontWeight='bold' 
                    color='red'
                    >10zł

                </Typography>
            </Grid>
            <Grid item border='solid 1px'  borderRadius='15px'>
                <Box 
                component='img' 
                src='../../img/potato.jpg'
                width='300px'
                height='300px'></Box>
                <Typography 
                    variant="h6" 
                    fontWeight='bold'
                    >Potato
                </Typography>
                <Typography 
                    variant="h5" 
                    fontWeight='bold' 
                    color='red'
                    >10zł

                </Typography>
            </Grid>
            <Grid item border='solid 1px'  borderRadius='15px'>
                <Box 
                component='img' 
                src='../../img/potato.jpg'
                width='300px'
                height='300px'></Box>
                <Typography 
                    variant="h6" 
                    fontWeight='bold'
                    >Potato
                </Typography>
                <Typography 
                    variant="h5" 
                    fontWeight='bold' 
                    color='red'
                    >10zł

                </Typography>
            </Grid>
            <Grid item border='solid 1px'  borderRadius='15px'>
                <Box 
                component='img' 
                src='../../img/potato.jpg'
                width='300px'
                height='300px'></Box>
                <Typography 
                    variant="h6" 
                    fontWeight='bold'
                    >Potato
                </Typography>
                <Typography 
                    variant="h5" 
                    fontWeight='bold' 
                    color='red'
                    >10zł

                </Typography>
            </Grid>
    
       </Grid>
        );
};

export default ProductList;