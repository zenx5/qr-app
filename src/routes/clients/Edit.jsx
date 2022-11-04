import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Box, Grid, TextField, Typography, List, Button } from "@mui/material";
import { trans } from "../../tools/Location";
import ItemMenu from "../../components/ItemMenu";
import { getClients, setClients, setMenus } from "../../tools/Request";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { FormMenu } from "../../components";

export default function Edit(props) {
	const { create } = props
	const { id } = useParams()
	const [ changed, setChanged ] = useState(false)
	const [ clientId, setClientId ] = useState(id)
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
		const {data} = await getClients( id ) 
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
		const { data } = await setClients(client)
		setChanged(false)
		if(create){
			navigate(`/client/${data.data.id}`)
		}
		
	}

	const newMenu = async (name, currency) => {
		const { data } = await setMenus({ name, currency, ClientId:clientId })
	}

  	return (
    <Grid container sx={{ height: '100vh', padding: '10px'}}>
      <Grid item xs={9}>
				<Box component='form'>
					<Grid container>
						<Grid item xs={6}><Typography>Cliente</Typography></Grid>
						<Grid item xs={6}><Button onClick={saveClient} disabled={!changed}>Save</Button></Grid>
						<Grid item xs={6}>
							<TextField 
								variant="outlined"
								sx={{ m: 1, width:'-webkit-fill-available' }}
								label={trans('First Name')}
								value={client.firstname}
								onChange={handlerChangeClient('firstname')}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField 
								variant="outlined"
								sx={{ m: 1, width:'-webkit-fill-available' }}
								label={trans('Last Name')}
								value={client.lastname}
								onChange={handlerChangeClient('lastname')}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField 
								variant="outlined"
								sx={{ m: 1, width:'-webkit-fill-available' }}
								label={trans('Nickname')}
								value={client.nickname}
								onChange={handlerChangeClient('nickname')}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField 
								variant="outlined"
								sx={{ m: 1, width:'-webkit-fill-available' }}
								label={trans('Email')}
								value={client.email}
								onChange={handlerChangeClient('email')}
							/>
						</Grid>
						<Grid item xs={6}>
							<Typography>{trans('Menus')}</Typography>
							<List>
								{client.Menus && client.Menus.map( menu => <ItemMenu label={trans(menu.name)} />)}
							</List>
							<FormMenu onSave={newMenu} />
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
