import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Box, Grid, TextField, Typography, List, Button, Input } from "@mui/material";
import { trans } from "../../tools/Location";
import ItemMenu from "../../components/ItemMenu";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { FormMenu } from "../../components";

export default function Edit(props) {
	const { create, name, model, getData, setData } = props
	const { id } = useParams()
	const [ changed, setChanged ] = useState(false)
	const [ ProductId, setProductId ] = useState(id)
	const [entity, setEntity] = useState(model)
	const navigate = useNavigate()

	useEffect(() => {
		(async () => {
			if( !create ){
				await loadData()
			}
		})();
	  }, []);

	const loadData = async () => {
		const {data} = await getData( id ) 
		console.log( data )
		setEntity( prev => data.data[0] )
	}

	const handlerChangeEntity = (key) => ( {target} )=> {
		setChanged(true)
		return setEntity( prev => ({
			...prev,
			[key]: target.value
		}))
	}

	const saveEntity = async () => {
		const { data } = await setData(entity)
		setChanged(false)
		if(create){
			navigate(`/${name.toLowerCase()}/${data.data.id}`)
		}
		
	}
	const backHandler = _ => {
        navigate('/products')
    }

    const keys = Object.keys(model);
    const fields = keys.map( (key, index) => {
        let value = model[key];
        return(
            <Grid item xs={6} key={index} >
                <TextField 
                    variant="outlined"
                    sx={{ m: 1, width:'-webkit-fill-available' }}
                    label={trans(key)}
                    value={entity[key]}
                    onChange={handlerChangeEntity(key)}
                    type={value}
                />
            </Grid>
        )
    })


  	return (
    <Grid container sx={{ height: '100vh', padding: '10px'}}>
      <Grid item xs={9}>
				<Box component='form'>
					<Grid container>
						<Grid item xs={6}><Typography>{name}</Typography></Grid>
						<Grid item xs={3}><Button onClick={saveEntity} disabled={!changed}>Save</Button></Grid>
						<Grid item xs={3}><Button onClick={backHandler} disabled={create}>Back</Button></Grid>
                        { fields }
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
