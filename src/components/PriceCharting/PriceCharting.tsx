import React from 'react';
import { makeStyles } from '@material-ui/core';

interface PriceChartingProps {
    data: {
        consoleName: string;
        id: string;
        loosePrice: number;
        productName: string;
        status: string;
    }
}

const useStyles = makeStyles({
  titleText: {
    fontFamily: 'Nunito',
    fontWeight: 800,
    fontSize: '28px',
    color: '#89CE94'
  },
  subText: {
    fontFamily: 'Nunito',
    fontWeight: 500,
    fontSize: '18px',
    color: '#F1F0F0'
  },
  tableMargins: {
    marginTop: '50px',
    marginLeft: '5px',
    marginRight: '5px'
  },
  tablePadding: {
    paddingLeft: '20px',
    paddingRight: '20px',
    padding: '20px'
  },
  padding: {
    paddingLeft: '75px'
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
  },
  bold: {
    fontWeight: 800
  }
});

export const PriceCharting = (props: PriceChartingProps) => {

  const classes = useStyles();
  const formatCurrency = ( amount: number ) => {
    return '$' + (amount / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 } ) + ' USD';
  }

  return (
    <div style={ { height: 400, width: '100%', paddingTop: '25px' } } >
      <div style={ { width: '100%'}} className={classes.center}>
        <h2 className={`${classes.titleText}`}>{props.data.productName}</h2>
      </div>
      <table className={`${classes.subText} ${classes.tableMargins}`}>
        <tbody>
            <tr>
                <td className={`${classes.tablePadding} ${classes.bold}`}>Console/Set Name: </td>
                <td className={classes.tablePadding}>{props.data.consoleName}</td>
            </tr>
            <tr>
                <td className={`${classes.tablePadding} ${classes.bold}`}>Loose/Ungraded Price: </td>
                <td className={classes.tablePadding}>{formatCurrency(props.data.loosePrice)}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}
