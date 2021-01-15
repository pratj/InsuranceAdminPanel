import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'

function BarChart() {

    const [ chartData, setChartData ] = useState({})
    var borderColor = []
    var backgroundColor = []

    const fillColor = (responseLength) => {

        for(var i = 0; i < responseLength; i++){
            borderColor.push('rgba(255, 206, 86, 0.2)')
            backgroundColor.push('rgba(255, 206, 86, 0.2)')
        }

        // borderColor = Array(4).fill('rgba(255, 206, 86, 0.2)')
        // backgroundColor = Array(4).fill('rgba(255, 206, 86, 0.2)')
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
        <div style={{width: "80%", margin: 'auto'}}>
            <Bar data={chartData} options={options}/>
        </div>
    )
}

export default BarChart