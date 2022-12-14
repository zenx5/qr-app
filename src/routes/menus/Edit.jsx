import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Box, Grid, TextField, Typography, List, Button, ListItem, ListItemButton, ListItemText, Select, MenuItem } from "@mui/material";
import { trans } from "../../tools/Location";
import { useNavigate, useParams } from "react-router-dom";
import { getResource, setResource } from "../../tools/resourceRequest";
import { PickerColor } from '../../components'

export default function Edit(props) {
	const { create, view } = props
	const { id } = useParams()
	const [ changed, setChanged ] = useState(false)
	const [ protocol, setProtocol ] = useState('https')
	const [ clients, setClients ] = useState([])
	const [ tokens, setTokens ] = useState([])
	const [ control, setControl ] = useState({
		changed: false, 
		count: 0
	})
	const [ menu, setMenu ] = useState({
		name: '',
		currency: '',
		token: '',
		Products: [],
		Qrcode: {
			url: ''
		}
	})
	const [ product, setProduct ] = useState({
		title: '', 
		price: 0
	})
	const navigate = useNavigate()

	useEffect(() => {
		(async () => {
			await getClients()
			//await getTokens()
			if( !create ){
				await loadData()
			}
		})();
	}, []);

	const loadData = async () => {
		const { data } = await getResource('menus', id )		
		console.log( data )
		if( data.data.length === 0 ) {
			alert(`No existe el menu con id ${id}`)
			navigate(`/${process.env.REACT_APP_ROUTE_CREATE_MENU}`)
		}
		else{
			setMenu( prev => data.data[0] )
		}
		
	}

	const getClients = async () => {
		const { data } = await getResource('clients')
		console.log( data )
		setClients( prev => data.data )
	}

	const getTokens = async () => {
		const { data } = await getResource('menus' )
		console.log(  data.data.map( element => element.token  ))
		setTokens( prev => data.data.map( element => element.token ))
	}

	const handlerSaveMenu = async () => {
		if( create ){
			const { data } = await setResource('menus', { ...menu, ClientId: props.client?props.client: menu.ClientId })
			menu.Products.forEach( async product => {
				await setResource('products', { ...product, MenuId: data.data.id })
			})
			await setResource('qrcodes', { 
				url: `${protocol}://${menu.Qrcode.url}`,
				protocol: protocol,
				MenuId: data.data.id 
			} )
			//navigate(`/${process.env.REACT_APP_ROUTE_EDIT_MENU}/${data.data.id}`)
			alert('Menu Created')
			backHandler()
		}else{
			await setResource('menus', {...menu, id:id})
			await loadData()
		}
		
	}

	const handlerChangeMenu = (key) => ( {target} )=> {
		setChanged(true)
		setMenu( prev => ({
			...prev,
			[key]: target.value
		}))
	}

	

	const validateColor = (key) => (color) => {
		console.log('color',color)
		handlerChangeMenu(key)({ target: { value: color } })
	}

	const handlerChangeQrcode = ({target}) => {
		setMenu( prev => ({
			...prev,
			Qrcode: {
				...prev.Qrcode,
				url: target.value
			}
		}))
	}

	const handlerSaveProduct = async () => {
		if( product.title === '' ) return;
		if( create ) {
			setMenu( prev => ({
				...prev,
				Products:[
					...prev.Products,
					product
				]
			}))
			setProduct(prev=>({
				name: '', 
				price: 0
			}))
		}else{
			await setResource('products', {...product, MenuId:id})
			await loadData()
		}
	}

	const handlerChangeProduct = (key) => ({target}) => {
		setProduct( prev => ({
			...prev,
			[key]: target.value
		}))
	}

	const handlerRemoveProduct = (id) => () => {
		setMenu( prev => ({
			...prev,
			Products: prev.Products.filter( (product,index) => create ? id!==index : id!==product.id )
		}))
	}

	const handlerCleanProduct = () => {
		setProduct(prev => ({ name:'', price: 0}))
	}

	const validateToken = ({target}) => {
		
	}

	const backHandler = _ => {
        window.history.go(-1)
    }


  	return (
    <Grid container sx={{ height: '100vh', padding: '10px'}}>
      <Grid item xs={9}>
				<Box component='form'>
					<Grid container>
						<Grid item xs={12}><Typography style={{fontWeight:'bold', margin:'8px'}}>Menu</Typography></Grid>
                        <Grid item xs={5}>
							<TextField 
								variant="outlined"
								disabled={view}
								sx={{ m: 1, width:'-webkit-fill-available' }}
								label={trans('name')}
								value={menu.name}
								onChange={handlerChangeMenu('name')}
							/>
						</Grid>
						<Grid item xs={4}>
							<TextField 
								variant="outlined"
								disabled={view}
								sx={{ m: 1, width:'-webkit-fill-available' }}
								label={trans('currency')}
								value={menu.currency}
								onChange={handlerChangeMenu('currency')}
							/>
						</Grid>
						<Grid item xs={1} style={{display:'flex', alignItems:'center'}}>
							{!view && <Button variant="contained" onClick={handlerSaveMenu} disabled={!changed}>Save</Button>}
						</Grid>
						<Grid item xs={1} style={{display:'flex', alignItems:'center'}}>
							<Button variant="outlined" onClick={backHandler}>Back</Button>
						</Grid>
						<Grid item xs={5}>
							<TextField 
								variant="outlined"
								disabled={view}
								sx={{ m: 1, width:'-webkit-fill-available' }}
								label={trans('Access Token')}
								value={menu.token}
								onChange={handlerChangeMenu('token')}
							/>
						</Grid>
						<Grid item xs={4}>
							<Select
								sx={{ m: 1, width:'-webkit-fill-available' }}
								disabled={!create}
								defaultValue={-1}
								label={'Client '+menu.ClientId}
								value={menu.ClientId}
								onChange={handlerChangeMenu('ClientId')}>
								<MenuItem value={-1}>{ create ? 'Seleccione' : clients.filter( client => client?.id === menu.ClientId )?.at(0)?.nickname }</MenuItem>
								{clients && clients.map( client => (<MenuItem value={client?.id}>{client?.nickname}</MenuItem>) )} 
							</Select>
						</Grid>
						<Grid item xs={5}>
							<TextField 
								variant="outlined"
								disabled={view}
								sx={{ m: 1, width:'-webkit-fill-available' }}
								label={trans('Size Title')}
								value={menu.sizeTitle}
								onChange={handlerChangeMenu('sizeTitle')}
							/>
						</Grid>
						<Grid item xs={4}>
							<TextField
								variant="outlined"
								disabled={view}
								sx={{ m: 1, width:'-webkit-fill-available' }}
								label={trans('Color Title')}
								value={ menu.colorTitle }
								onChange={handlerChangeMenu('colorTitle')}
							/>
						</Grid>
						<Grid item xs={5}>
							<TextField 
								variant="outlined"
								disabled={view}
								sx={{ m: 1, width:'-webkit-fill-available' }}
								label={trans('Size Items')}
								value={menu.sizeItem}
								onChange={handlerChangeMenu('sizeItem')}
							/>
						</Grid>
						<Grid item xs={4}>
							<TextField
								variant="outlined"
								disabled={view}
								sx={{ m: 1, width:'-webkit-fill-available' }}
								label={trans('Color Item')}
								value={ menu.colorItem }
								onChange={handlerChangeMenu('colorItem')}
							/>
						</Grid>
						<Grid item xs={9}>
							<TextField 
								variant="outlined"
								disabled={view}
								sx={{ m: 1, width:'-webkit-fill-available' }}
								label={trans('Background Image')}
								value={menu.background}
								onChange={handlerChangeMenu('background')}
							/>
						</Grid>
					</Grid>
					<Grid container style={{borderTop:'1px solid #efefef', marginTop: '10px', paddingTop: '10px'}}>
						<Grid item xs={12}>
							<Typography style={{fontWeight:'bold', margin:'8px'}}>Products: </Typography>
						</Grid>
						<Grid item xs={9}>
							<List>
								{ menu.Products && menu.Products.map((product, index) => 
									<ListItem 
										key={ product.id ?? index }
										secondaryAction={
											!view && (<Button onClick={handlerRemoveProduct(product.id ?? index)}>Remove</Button>)
										}>
										<ListItemButton>
											<ListItemText primary={
												<div style={{
													width: '100%',
													display: 'flex',
													justifyContent: 'space-between'
												}}>
													<span>{product.title}</span>
													<span>{product.price} <b>{menu.currency}</b></span>
												</div>
											}></ListItemText>
										</ListItemButton>
									</ListItem>)}
							</List>
						</Grid>
						{ !view && (<>
						<Grid item xs={5}>
							<TextField 
								variant="outlined"
								sx={{ m: 1, width:'-webkit-fill-available' }}
								label={trans('Title')}
								value={product.title}
								onChange={handlerChangeProduct('title')}
							/>
						</Grid>
						<Grid item xs={4}>
							<TextField 
								variant="outlined"
								type="number"
								sx={{ m: 1, width:'-webkit-fill-available' }}
								label={trans('Price')}
								value={product.price}
								onChange={handlerChangeProduct('price')}
							/>
						</Grid>
						<Grid item xs={1.5} style={{display:'flex', alignItems:'center'}}>
							<Button variant="outlined" onClick={handlerSaveProduct}>Agregar</Button>
						</Grid>
						<Grid item xs={1} style={{display:'flex', alignItems:'center'}}>
							<Button variant="outlined" onClick={handlerCleanProduct}>Clean</Button>
						</Grid></>)}
					</Grid>
				</Box>
		</Grid>
      	<Grid item xs={3} sx={{ marginTop:'20px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'start' }}>
        	<QRCodeCanvas value={`http://localhost:3000/m/${menu.token}`} />
        	{/* <QRCodeCanvas value={protocol + '://' + ( menu?.Qrcode?.url.indexOf('://') === -1 ? menu?.Qrcode?.url : menu?.Qrcode?.url.split('://')[1] )} /> */}
			<TextField sx={{ m: 1, width:'-webkit-fill-available' }} variant="outlined" disabled={true} value={`http://localhost:3000/m/${menu.token}`} onina={validateToken}/>
				{/* <TextField 
					variant="outlined"
					disabled={view}
					sx={{ m: 1, width:'-webkit-fill-available' }}
					label={trans('Url')}
					value={ menu?.Qrcode?.url.indexOf('://') === -1 ? menu?.Qrcode?.url : menu?.Qrcode?.url.split('://')[1] }
					onChange={handlerChangeQrcode}
					InputProps={{
						startAdornment: 
							<Select
								position="start"
								style={{
									position: 'relative',
									left: '-15px',
								}}
								disabled={view}
								value={protocol}
								onChange={ event => setProtocol( event.target.value ) }>
									<MenuItem value={'http'}>http://</MenuItem>
									<MenuItem value={'https'}>https://</MenuItem>
					
							</Select>
					  }}
				/> */}
      	</Grid>
    </Grid>
  );
}
