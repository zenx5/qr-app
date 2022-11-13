import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Box, Grid, TextField, Typography, List, Button } from "@mui/material";
import { trans } from "../../tools/Location";
import ItemMenu from "../../components/ItemMenu";
import { useNavigate, useParams } from "react-router-dom";
import { ListView } from "../../components";
import { getResource, setResource } from "../../tools/resourceRequest";



export default function Edit(props) {
	const { create, view } = props
	const { id } = useParams()
	const [ changed, setChanged ] = useState(false)
	const [client, setClient] = useState({
		nickname: '',
		firstname: '',
		lastname: '',
		email: '',
		menus: []
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
		const {data} = await getResource('clients', id ) 
		console.log( data )
		setClient( prev => data.data[0] )
	}

	const handlerChangeClient = (key) => ( {target} )=> {
		setChanged(true)
		return setClient( prev => ({
			...prev,
			[key]: target.value
		}))
	}

	const saveClient = async () => {
		const { data } = await setResource('clients', client)
		setChanged(false)
		if(create){
			alert('Client Created')
			window.history.go(-1)
			//navigate(`/${process.env.REACT_APP_ROUTE_EDIT_CLIENT}/${data.data.id}`)
		}
		
	}
	const backHandler = _ => {
        window.history.go(-1)
    }

	const handlerView = (id) => {
		navigate(`/${process.env.REACT_APP_ROUTE_VIEW_MENU}/${id}`)
	}
	const handlerEdit = (id) => {
		navigate(`/${process.env.REACT_APP_ROUTE_EDIT_MENU}/${id}`)
	}

	const handlerNewMenu = () => {
		navigate(`/${process.env.REACT_APP_ROUTE_CREATE_MENU}`)
	}

  	return (
    <Grid container sx={{ height: '100vh', padding: '10px'}}>
      <Grid item xs={12}>
			<Box component='form'>
				<Grid container>
					<Grid item xs={6}>
						<Typography style={{fontWeight:'bold', margin:'8px'}}>{trans('Clients')}: </Typography>
					</Grid>
					<Grid item xs={3}><Button onClick={saveClient} disabled={!changed}>Save</Button></Grid>
					<Grid item xs={3}><Button onClick={backHandler}>Back</Button></Grid>
					<Grid item xs={6}>
						<TextField 
							variant="outlined"
							disabled={view}
							sx={{ m: 1, width:'-webkit-fill-available' }}
							label={trans('First Name')}
							value={client.firstname}
							onChange={handlerChangeClient('firstname')}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField 
							variant="outlined"
							disabled={view}
							sx={{ m: 1, width:'-webkit-fill-available' }}
							label={trans('Last Name')}
							value={client.lastname}
							onChange={handlerChangeClient('lastname')}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField 
							variant="outlined"
							disabled={view}
							sx={{ m: 1, width:'-webkit-fill-available' }}
							label={trans('Nickname')}
							value={client.nickname}
							onChange={handlerChangeClient('nickname')}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField 
							variant="outlined"
							disabled={view}
							sx={{ m: 1, width:'-webkit-fill-available' }}
							label={trans('Email')}
							value={client.email}
							onChange={handlerChangeClient('email')}
						/>
					</Grid>
					{ client.Menus && (<Grid item xs={9} style={{marginTop: '10px'}}>
						<Typography style={{fontWeight:'bold', margin:'8px'}}>{trans('Menus')}: </Typography>
					</Grid>)}
					{ client.Menus && (<Grid item xs={3} style={{display:'flex', justifyContent:'end', marginTop: '10px'}}>
						{ !view && <Button variant="contained" onClick={handlerNewMenu}>New Menu</Button> }
					</Grid>)}
					{ client.Menus && (<Grid item xs={12}>
						<ListView 
							headers={ [
							{ key: 'name', name: trans('Name'), default: '' },
							{ key: 'currency', name: trans('Currency'), default: '' },
							{ key: 'token', name: trans('Access'), default: 'http://localhost:3000/m/', format: (index, value) => (<a href={`http://localhost:3000/m/${value}`} target='_blank'>http://localhost:3000/m/{value}</a>) },
							{ key: 'Client', name: trans('Client'), default: '', format: () => client.email},
							] }
							disableSelection
							records={client.Menus}
							onView={handlerView}
							onEdit={!view && handlerEdit}
							id={'id'}
						/>
					</Grid>)}
				</Grid>
			</Box>
		</Grid>
    </Grid>
  );
}
