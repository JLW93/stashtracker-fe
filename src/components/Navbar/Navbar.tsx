import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import arrow from '../../assets/images/arrow.png';
import stashIcon from '../../assets/images/stash.png';

interface NavProps {
    history: RouteComponentProps["history"];
    location: RouteComponentProps["location"];
    match: RouteComponentProps["match"];
}

const useStyles = makeStyles({
    logo: {
        content: `url(${stashIcon})`,
        maxWidth: '15%',
        height: 'auto'
    },
    navLogo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    between: {
        justifyContent: 'space-between'
    },
    row: {
        display: 'flex',
        flexDirection: 'row'
    },
    navbar: {
        backgroundColor: '#F1F0F0',
        zIndex: 1,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        width: '100%'
    },
    navButton: {
        boxSizing: 'border-box',
        width: '180px',
        height: '45px',
        background: 'rgba(137, 206, 148, 0.25)',
        border: '1px solid #89CE94',
        borderRadius: '4px',
        marginTop: '15px',
        marginBottom: '15px',
        
    },
    buttonText: {
        fontFamily: 'Nunito',
        fontStyle: 'normal',
        textTransform: 'none',
        fontWeight: 700,
        fontSize: '24px',
        lineHeight: '33px',
        textAlign: 'center',
        color: '#89CE94'
    },
    buttonArrow: {
        content: `url(${arrow})`,
        width: '15%',
        height: 'auto',
        paddingLeft: '8px'
    },
    navTitle: {
        fontFamily: 'Nunito',
        fontStyle: 'normal',
        fontWeight: 800,
        fontSize: '24px',
        color: '#643173',
        textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
    },
    darkGray: {
        color: '#333333'
    },
    navbarSpacing: {
        paddingLeft: '25px',
        paddingRight: '25px'
    },
    link: {
        textDecoration: 'none',
        '&:active': {
            color: '#89CE94'
        }
    },
    navText: {
        color: '#643173',
        fontFamily: 'Nunito',
        fontWeight: 700,
        fontSize: '20px',
        textAlign: 'center'
    },
    navbarTextSpacing: {
        paddingLeft: '40px',
        paddingRight: '40px'
    },
    activeLink: {
        color: '#89CE94'
    },
    navTextSmall: {
        color: '#643173',
        fontFamily: 'Nunito',
        fontWeight: 700,
        fontSize: '14px',
        textAlign: 'center'
    },
    navbarSpacingSmall: {
        paddingLeft: '15px',
        paddingRight: '15px'
    },
    navButtonSmall: {
        boxSizing: 'border-box',
        width: '100px',
        height: '45px',
        background: 'rgba(137, 206, 148)',
        border: '1px solid #89CE94',
        borderRadius: '4px',
        marginTop: '15px',
        marginBottom: '15px',
        '&:hover': {
            background: 'rgba(125, 197, 139)'
        }
    },
    buttonTextSmall: {
        fontFamily: 'Nunito',
        fontStyle: 'normal',
        textTransform: 'none',
        fontWeight: 700,
        fontSize: '18px',
        lineHeight: '33px',
        textAlign: 'center',
        color: '#F1F0F0'
    }
})

export const Navbar = withRouter( ( props: NavProps )  => {

    // use [isActive, setIsActive] state and onClick to change navbar link color for the active item
    // also use [className, setClassName] to set class to activeLink
    const classes = useStyles();
    const [ loggedIn, setLoggedIn ] = useState(false);

    useEffect( () => {
        const token = localStorage.getItem('token');
        if ( token ) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, []);

    const handleLogOut = async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('stash_id');
        setLoggedIn(false);
        setTimeout( () => { window.location.reload() }, 1000 )
    };

  return (
    <>
        <div className={`${classes.navbar} ${classes.row} ${classes.between}`}>
            <div className={`${classes.navbarSpacing} ${classes.row} ${classes.center}`}>
                <div className={classes.row}>
                    <span className={classes.logo}></span>
                    <h1 className={`${classes.navTitle} ${classes.navbarSpacing}`}>Stash<span className={classes.darkGray}>Tracker</span></h1>
                </div>
                <div className={`${classes.row}`}>
                    <h2 className={`${classes.navText} ${classes.navbarTextSpacing}`}>
                        <Link to='/' className={classes.link}>
                            Home
                        </Link>
                    </h2>
                    <h2 className={`${classes.navText} ${classes.navbarTextSpacing}`}>
                        <Link to='/stashes' className={classes.link}>
                            Stashes
                        </Link>
                    </h2>
                    <h2 className={`${classes.navText} ${classes.navbarTextSpacing}`}>
                        <Link to='/about' className={classes.link}>
                            About
                        </Link>
                    </h2>
                </div>
            </div>
            <div className={`${classes.navbarSpacing} ${classes.row} ${classes.center}`}>
                {loggedIn ? (
                    <Button className={classes.navButtonSmall} onClick={handleLogOut}><span className={classes.buttonTextSmall}>Log Out</span></Button>
                ) : (
                <>
                    <Button className={classes.navButton}>
                        <Link to='/signup' className={classes.link}><span className={classes.buttonText}>Get Started</span><span className={classes.buttonArrow}></span></Link>
                    </Button>
                    <h5 className={`${classes.navTextSmall} ${classes.navbarSpacingSmall}`}>OR</h5>
                    <Button className={classes.navButtonSmall}>
                        <Link to='/signin' className={classes.link}><span className={classes.buttonTextSmall}>Sign In</span></Link>
                    </Button>
                </>)}
            </div>
        </div>
    </>
  )
})
