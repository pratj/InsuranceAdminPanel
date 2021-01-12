import React from 'react'
import { Doughnut } from 'react-chartjs-2'

function DoughnutChart2() {

    var backgroundColor = []
    var rgb = []

    const randomColorGenerate = () => {
        for(var i = 0; i < 4; i++){
            for(var j = 0; j < 3; j++){
                rgb.push(Math.floor(Math.random() * 255))
            }
            backgroundColor.push('rgb('+rgb.join(',')+')')
            rgb = []
        }
        console.log(backgroundColor)
    }

    const data = {
        labels: ["Motor Insurance", "Travel Insurance", "Health Insurance", "Term Life Insurance"],
        datasets: [
            {
              label: 'Insurances Bought',
              data: [5, 10, 15, 12],
              backgroundColor: backgroundColor
            }
          ]
    }

    const options = {
        title: {
          display: true,
          text: 'Doughnut Chart'
        }
      }

    return (
        <div style={{width: "40%"}}>
            {randomColorGenerate()}
            <Doughnut data={data} options={options}/>
        </div>
    )
}

export default DoughnutChart2