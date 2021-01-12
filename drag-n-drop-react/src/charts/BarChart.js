import React from 'react'
import { Bar } from 'react-chartjs-2'

function BarChart() {

    var borderColor = []
    var backgroundColor = []

    const fillColor = () => {

        for(var i = 0; i < 4; i++){
            borderColor.push('rgba(255, 206, 86, 0.2)')
            backgroundColor.push('rgba(255, 206, 86, 0.2)')
        }

        // borderColor = Array(4).fill('rgba(255, 206, 86, 0.2)')
        // backgroundColor = Array(4).fill('rgba(255, 206, 86, 0.2)')
        console.log(borderColor)
        console.log(backgroundColor)
    }

    const data = {
        labels: ["Motor Insurance", "Travel Insurance", "Health Insurance", "Term Life Insurance"],
        datasets: [
            {
                label: "Partners Available",
                data: [2,2,2,3],
                // borderColor: ['rgba(255, 206, 86, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(255, 206, 86, 0.2)'],
                // backgroundColor: ['rgba(255, 206, 86, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(255, 206, 86, 0.2)']
                borderColor: borderColor,
                backgroundColor: backgroundColor
            }
        ]
    }

    const options = {
        title: {
            display: true,
            text: "Bar Chart"
        },
        scales: {
            yAxes: [
              {
                ticks: {
                  min: 0,
                  max: 6,
                  stepSize: 1
                }
              }
            ]
          }
    }

    return (
        <div style={{width: "80%", margin: 'auto'}}>
            {fillColor()}
            <Bar data={data} options={options}/>
        </div>
    )
}

export default BarChart