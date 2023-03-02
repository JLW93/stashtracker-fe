import React, { Suspense } from 'react';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Link, BrowserRouter as Router } from 'react-router-dom';

import { Navbar } from '../Navbar';

interface Props {
    title: string;
}

const useStyles = makeStyles({
  mainText: {
    fontFamily: 'Nunito',
    fontWeight: 500,
    fontSize: '64px',
    lineHeight: '87px',
    textAlign: 'center',
    textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    color: '#F1F0F0'
  },
  purple: {
    color: '#643173'
  },
  darkGray: {
    color: '#333333'
  },
  titleText: {
    fontWeight: 800
  },
  div: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '50px'
  },
  button: {
    background: '#333333',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '4px',
    '&:hover': {
      background: '#3D3D3D'
    },
    textTransform: 'none',
    padding: '10px'
  },
  buttonSpacing: {
    marginTop: '35px'
  },
  buttonText: {
    fontFamily: 'Nunito',
    fontWeight: 800,
    fontSize: '24px',
    lineHeight: '33px',
    textAlign: 'center',
    color: '#89CE94',
    textDecoration: 'none',
    fontStyle: 'normal'
  },
  innerButton: {
    background: '#89CE94',
    borderRadius: '20px',
    color: '#333333',
    fontSize: '14px',
    lineHeight: '19px',
    padding: '5px',
    paddingLeft: '10px',
    paddingRight: '10px'
  }
})

export const Home = ( props: Props ) => {

  const classes = useStyles();

  return (
    <>
      <Navbar />
      <div className={classes.div}>
        <h1 className={classes.mainText}>
          Document your <span className={classes.purple}>valuables</span> and <span className={classes.purple}>collectibles</span> with <br />
          <span className={classes.titleText}><span className={classes.purple}>Stash</span><span className={classes.darkGray}>Tracker</span></span>
          </h1>
      </div>
      <div className={classes.div}>
        <Button className={`${classes.button} ${classes.buttonSpacing}`}>
            <Link to='/signup' className={classes.buttonText}>Start Tracking <span className={`${classes.innerButton}`}>Free</span></Link>
        </Button>
      </div>
    </>
  )
}
