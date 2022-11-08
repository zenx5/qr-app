import { useState, useEffect } from "react";
import { Box, Grid, TextField, Typography, List, Button, ListItem, ListItemText } from "@mui/material";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export default function BackButton(props) {
    // const history = useHistory();

    const handlerBack = _ => {
        // history.goBack()
    }

    return(
        <Button onClick={handlerBack}>Back</Button>
    )
}
