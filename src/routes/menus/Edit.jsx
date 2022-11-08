import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Box, Grid, TextField, Typography, List, Button, Input } from "@mui/material";
import { trans } from "../../tools/Location";
import { getClients, setClients, getProducts, setProducts, getMenus, setMenus } from "../../tools/Request";
import ItemMenu from "../../components/ItemMenu";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { FormMenu } from "../../components";

export default function Edit(props) {
	const { create, name, model, getData, setData } = props
	const { id } = useParams()
	const [ changed, setChanged ] = useState(false)
	const [ ProductId, setProductId ] = useState(id)
	const [menu, setMenu] = useState(model)
	const navigate = useNavigate()

	useEffect(() => {
		(async () => {
			if( !create ){
				await loadData()
			}
		})();
	  }, []);

	const loadData = async () => {
		const {data} = await getMenus( id ) 
		console.log( data )
		setMenu( prev => data.data[0] )
	}

	const handlerChangeEntity = (key) => ( {target} )=> {
		setChanged(true)
		return setMenu( prev => ({
			...prev,
			[key]: target.value
		}))
	}

	const saveMenu = async () => {
		const { data } = await setMenus(menu)
		setChanged(false)
		if(create){
			navigate(`/menu/${data.data.id}`)
		}
		
	}
	const backHandler = _ => {
        navigate('/menu')
    }


  	return (
    <Grid container sx={{ height: '100vh', padding: '10px'}}>
      <Grid item xs={9}>
				<Box component='form'>
					<Grid container>
						<Grid item xs={6}><Typography>{name}</Typography></Grid>
						<Grid item xs={3}><Button onClick={saveMenu} disabled={!changed}>Save</Button></Grid>
						<Grid item xs={3}><Button onClick={backHandler} disabled={create}>Back</Button></Grid>
                        <Grid item xs={6} >
							<TextField 
								variant="outlined"
								sx={{ m: 1, width:'-webkit-fill-available' }}
								label={trans('Menu')}
								value={menu.name}
								onChange={handlerChangeEntity('name')}
							/>
						</Grid>
						<Grid item xs={6} >
							<TextField 
								variant="outlined"
								sx={{ m: 1, width:'-webkit-fill-available' }}
								label={trans('Currency')}
								value={menu.currency}
								onChange={handlerChangeEntity('currency')}
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
