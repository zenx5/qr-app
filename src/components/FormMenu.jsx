import { Add } from '@mui/icons-material'
import { Grid, IconButton, TextField } from '@mui/material'
import { useState } from 'react'
import { trans } from '../tools/Location'

export default function FormMenu(props){
    const [name, setName] = useState('')
    const [currency, setCurrency] = useState('')
    const { onSave } = props

    const handlerEventSave = () => {
        onSave(name, currency)
        setName(prev=>'')
        setCurrency(prev=>'')
    }

    return(<Grid container>
        <Grid item xs={5}>
            <TextField 
                variant="outlined"
                sx={{ m: 1, width:'-webkit-fill-available' }}
                label={trans('Name')}
                value={name}
                onChange={({target})=>setName(prev=>target.value)}
            />
        </Grid>
        <Grid item xs={5}>
            <TextField 
                variant="outlined"
                sx={{ m: 1, width:'-webkit-fill-available' }}
                label={trans('Name')}
                value={currency}
                onChange={({target})=>setCurrency(prev=>target.value)}
            />
        </Grid>
        <Grid item xs={2}>
            <IconButton onClick={handlerEventSave}><Add /></IconButton>
        </Grid>
    </Grid>)
}