import React from 'react'

interface PriceChartingProps {
    data: {
        consoleName: string;
        id: string;
        loosePrice: number;
        productName: string;
        status: string;
    }
}

export const PriceCharting = (props: PriceChartingProps) => {

  return (
    <div style={ { height: 400, width: '100%' } }>
      <h2>{props.data.productName}</h2>
      <table>
        <tbody>
            <tr>
                <td>Name 1</td>
                <td>{props.data.consoleName}</td>
            </tr>
            <tr>
                <td>Name 2</td>
                <td>{props.data.loosePrice}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}
