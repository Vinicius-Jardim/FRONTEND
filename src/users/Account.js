import React from 'react';
import Header from "../header/Header";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    background: 'white',
    backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/chave.png'})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  button: {
    backgroundColor: 'green',
    color: 'white',
    margin: '10px',
    '&:hover': {
      backgroundColor: '#006400',
    },
  },
});

const Account = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <Button variant="contained" className={classes.button}>
        Recuperar senha
      </Button>
      <Button variant="contained" className={classes.button} startIcon={<img src={process.env.PUBLIC_URL + '/assets/'} alt="Sair" />}>
        Sair
      </Button>
    </div>

  );
}

export default Account;
