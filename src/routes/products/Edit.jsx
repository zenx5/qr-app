import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Box, Grid, TextField, Typography, List, Button, Input } from "@mui/material";
import { trans } from "../../tools/Location";
import ItemMenu from "../../components/ItemMenu";
import { getProducts, setProducts, setMenus } from "../../tools/Request";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { FormMenu } from "../../components";

export default function Edit(props) {
	const { create } = props
	const { id } = useParams()
	const [ changed, setChanged ] = useState(false)
	const [ ProductId, setProductId ] = useState(id)
	const [product, setProduct] = useState({
		title: '',
        price: 0
	})
	const navigate = useNavigate()

	useEffect(() => {
		(async () => {
			if( !create ){
				await loadData()
			}
		})();
	  }, []);

	const loadData = async () => {
		const {data} = await getProducts( id ) 
		console.log( data )
		setProduct( prev => data.data[0] )
	}

	const handlerChangeProduct = (key) => ( {target} )=> {
		setChanged(true)
		return setProduct( prev => ({
			...prev,
			[key]: target.value
		}))
	}

	const saveProduct = async () => {
		const { data } = await setProducts(product)
		setChanged(false)
		if(create){
			navigate(`/${process.env.REACT_APP_ROUTE_EDIT_PRODUCT}/${data.data.id}`)
		}
		
	}
	const backHandler = _ => {
        window.history.go(-1)
    }


  	return (
    <Grid container sx={{ height: '100vh', padding: '10px'}}>
      <Grid item xs={9}>
				<Box component='form'>
					<Grid container>
						<Grid item xs={6}><Typography>Producto</Typography></Grid>
						<Grid item xs={3}><Button onClick={saveProduct} disabled={!changed}>Save</Button></Grid>
						<Grid item xs={3}><Button onClick={backHandler} disabled={create}>Back</Button></Grid>
						<Grid item xs={6}>
							<TextField 
								variant="outlined"
								sx={{ m: 1, width:'-webkit-fill-available' }}
								label={trans('Title')}
								value={product.title}
								onChange={handlerChangeProduct('title')}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
                                type='number' 
								variant="outlined"
								sx={{ m: 1, width:'-webkit-fill-available' }}
								label={trans('Price')}
								value={product.price}
								onChange={handlerChangeProduct('price')}
							/>
						</Grid>
					</Grid>
				</Box>
			</Grid>
      <Grid item xs={3} sx={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
        {/* <QRCodeCanvas value={value} />
        <p>
          <a href={value} target="_blank">
            {value}
          </a>
        </p> */}
      </Grid>
    </Grid>
  );
}
