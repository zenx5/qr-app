import { useState } from "react";
import { TextField } from "@mui/material"

export default function PickerColor( props ) {
    const [value, setValue] = useState(props.value);
    const validateKey = event => {
        const { key } = event
        //const { value } = event.target
        let newValue = ''
        const validate = /[0-9abcdefABCDEF]/.exec(key)
        
        if( key.length > 1 ) {
            console.log('if key.length > 1')
            event.preventDefault()
        }
        if( validate === null ) {
            console.log('if validate === null')
            event.preventDefault()
        }
        if( event.target.value.length > 5 ) {
            console.log('if event.target.value.length > 5')
            let arrayValue = event.target.value.split('')
            console.log('arrayValue', arrayValue)
            arrayValue.shift()
            newValue = arrayValue.join('')
            setValue( prev => newValue )
            props.onColorChange( `#${newValue}` )
        }else{
            console.log( 'else' )
            props.onColorChange( `#${event.target.value}${key}` )
        }
        
    }

    return(
        <TextField 
            {...props}
            value={value}
            InputProps={{
                startAdornment: '#-'
            }}
            //onKeyUp={validateKey}
        />
    )
}