import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2'

function DoughnutChart2() {

    const [ chartData, setChartData ] = useState({})
    var backgroundColor = []
    var rgb = []

    const randomColorGenerate = (responseLength) => {
        for(var i = 0; i < responseLength; i++){
            for(var j = 0; j < 3; j++){
                rgb.push(Math.floor(Math.random() * 255))
            }
            backgroundColor.push('rgb('+rgb.join(',')+')')
            rgb = []
        }
        console.log(backgroundColor)
    }

    const chart = () => {

        let insurances = []
        let soldInsurances = []

        axios.get("http://localhost:9090/api/category/request/count").then((response) => {

            randomColorGenerate(response.data.length)

            for(let dataObj of response.data){
                insurances.push(dataObj.category)
                soldInsurances.push(dataObj.count)
            }
            setChartData({
                labels: insurances,
                datasets: [
                    {
                      label: 'Insurances Bought',
                      data: soldInsurances,
                      backgroundColor: backgroundColor
                    }
                  ]
            })
        })
    }

    const options = {
        title: {
          display: true,
          text: 'Insurances Bought'
        }
      }

    useEffect(() => {
        chart()
    }, [])

    return (
        <div style={{width: "40%"}}>
            <Doughnut data={chartData} options={options}/>
        </div>
    )
}

export default DoughnutChart2