import React from 'react'
import { Doughnut } from 'react-chartjs-2'

function DoughnutChart1() {

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
        labels: ["Tata AIG", "Bajaj Allianz", "HDFC ERGO", "HDFC Life"],
        datasets: [
            {
              label: 'Partners',
              data: [3, 3, 1, 1],
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

export default DoughnutChart1