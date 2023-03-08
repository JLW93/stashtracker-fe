import React from 'react';
import { makeStyles } from '@material-ui/core'
import { Navbar } from '../Navbar'

const useStyles = makeStyles({
  titleText: {
    fontFamily: 'Nunito',
    fontWeight: 800,
    fontSize: '36px',
    color: '#333'
  },
  col: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  topMargin: {
    marginTop: '50px'
  },
  subText: {
    fontFamily: 'Nunito',
    fontWeight: 500,
    fontSize: '18px',
    color: '#FFF'
  },
  padding: {
    padding: '20px'
  }
});

export const About = () => {

  const classes = useStyles();

  return (
    <>
        <Navbar />
        <div className={`${classes.col} ${classes.topMargin}`}>
            <h1 className={classes.titleText}>This was built as a Capstone project for Coding Temple.</h1>
            <p className={`${classes.subText} ${classes.padding}`}>
              The intention behind this app is to allow the tracking/documenting of different items, 
              such as Video Games, Consoles, other Electronics, Trading Cards, Figurines, etc.
              You can manually enter one item at a time, and all fields are required. 
              You can have as many items as desired in as many different Stashes as you need.
              You cannot delete a Stash if there are currently items in the Stash. For now, you
              can only delete one item at a time.
            </p>
            <p className={`${classes.subText} ${classes.padding}`}>
              Incorporated into this is the PriceCharting API. You can select one item, and use the 
              PriceCharting Data button to search PruceCharting for the item, based on the "Item Name"
              that you gave to the item. It may sometimes return data that is not for the exact item you entered.
              This will display the current loose item price, as well as the console name (for video games), or the
              set name (for trading cards).
            </p>
        </div>
    </>
  )
}
