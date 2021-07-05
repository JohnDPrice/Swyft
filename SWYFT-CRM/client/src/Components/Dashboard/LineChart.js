import { ClientContext } from "../../providers/ClientProvider";
import { Line } from 'react-chartjs-2';
import React, { useContext, useEffect, useState } from 'react'

const LineChart = () => {
    const { clients, getAllClients } = useContext(ClientContext);
    const [ dataChart, setDataChart ] = useState({});

    useEffect(() => {
        getAllClients();
    }, [])

    let run = () => {

        let convertedClients = []
        let dateOfCompletion = []
        let monday = []
        let tuesday = []
        let wednesday = []
        let thursday = []
        let friday = []
        let saturday = []
        let sunday = []

        clients.forEach(client => {

            const d = new Date()
            let yearStart = +new Date(d.getFullYear(), 0, 1)
            let today = new Date(d.getFullYear(),d.getMonth(),d.getDate())
            let dayOfYear = ((today - yearStart + 1 ) / 86400000)
            let week = Math.ceil(dayOfYear / 7)
            const soldD = new Date(client.soldDate)
            let soldYearStart = +new Date(soldD.getFullYear(), 0, 1)
            let soldToday = new Date(soldD.getFullYear(),soldD.getMonth(),soldD.getDate())
            let soldDayOfYear = ((soldToday - soldYearStart + 1 ) / 86400000)
            let soldWeek = Math.ceil(soldDayOfYear / 7)

            if(client.sold === true && soldWeek === week) {

                let tempDate = new Date(client.soldDate)
                let dayNumber = tempDate.getDay() - 1
                let dayNames = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
                let dayName = dayNames[dayNumber]
                
                if(dayName === 'Mon'){
                    monday.push(dayName)
                } else if(dayName === 'Tues'){
                    tuesday.push(dayName)
                } else if(dayName === 'Wed'){
                    wednesday.push(dayName)
                } else if(dayName === 'Thurs'){
                    thursday.push(dayName)
                } else if(dayName === 'Fri'){
                    friday.push(dayName)
                } else if(dayName === 'Sat'){
                    saturday.push(dayName)
                } else if(dayName === 'Sun'){
                    sunday.push(dayName)
                }
                dateOfCompletion.push(dayName)
                convertedClients.push(client)
            }

            let totals  = [ monday.length, tuesday.length, wednesday.length, thursday.length, friday.length, saturday.length, sunday.length ]

            setDataChart({
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                datasets: [{
                    label:'Total Number Of Sales Per Day',
                    data: totals,
                    backgroundColor: ['#ffbd00'],
                    fill: true
                }]
            })
        })
}

useEffect(() => {
    run()
}, [clients])

    return (
        <div className="barChartContainer">
        <Line
        data={dataChart}
        height={500}
        width={600}
        options={{
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                    }
                }]
            }
        }}
        />
        </div>
    )
}

export default LineChart;