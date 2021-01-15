import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2'

function DoughnutChart1() {

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

        let partners = []
        let partnersCount = []

        axios.get("http://localhost:9090/api/partner/category/count").then((response) => {

            randomColorGenerate(response.data.length)

            for(let dataObj of response.data){
                partners.push(dataObj.partner)
                partnersCount.push(dataObj.count)
            }
            setChartData({
                labels: partners,
                datasets: [
                    {
                      label: 'Partners',
                      data: partnersCount,
                      backgroundColor: backgroundColor
                    }
                  ]
            })
        })
    }

    const options = {
        title: {
          display: true,
          text: 'Partners'
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

export default DoughnutChart1