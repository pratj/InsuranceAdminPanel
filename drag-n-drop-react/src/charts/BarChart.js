import { Grid } from '@material-ui/core'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'

function BarChart() {

    const [ chartData, setChartData ] = useState({})
    var borderColor = []
    var backgroundColor = []

  
    var rgb=[]
    const fillColor = (responseLength) => {
        for(let i = 0; i < 3; i++){
          rgb.push(Math.floor(Math.random() * 255))
        }
        for(let i = 0; i < responseLength; i++){
          borderColor.push('rgb('+rgb.join(',')+')')
          backgroundColor.push('rgb('+rgb.join(',')+')')
        }
        rgb = []
       
      }

    const chart = () => {

        let categories = []
        let partnerCount = []

        axios.get("http://localhost:9090/api/category/partner/count").then((response) => {

            fillColor(response.data.length)

            for(let dataObj of response.data){
                categories.push(dataObj.category)
                partnerCount.push(dataObj.partnerCount)
            }
            setChartData({
                labels: categories,
                datasets: [
                    {
                      label: 'Partners in each category',
                      data: partnerCount,
                      borderColor: borderColor,
                      backgroundColor: backgroundColor
                    }
                  ]
            })
        })
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

    useEffect(() => {
        chart()
    }, [])

    return (
        <div>
            <Bar data={chartData} options={options}/>
        </div>
    )
}

export default BarChart