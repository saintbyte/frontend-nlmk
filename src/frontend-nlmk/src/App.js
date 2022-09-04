
import './App.css';
import axios from "axios";
import React from 'react';
import ReactECharts from 'echarts-for-react';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data: {},
          graph: []
        };
        this.getData();
        console.log(process.env.PUBLIC_URL)
    }
    getData = async () => {
        const api = "http://localhost:8000/atmosphere/parameters/";
        const data = await axios
          .get(api)
          .then((res) => {
            return res.data;
          })
          .catch((err) => console.log(err));
        this.setState({ data: data });
        return data;
    };
    extractDataToList = (arg) => {
        const data = this.state.data;
        const res = [];
        for (let i in data) {
            res.push(data[i][arg]);
        }
        return res.reverse();
    };
    
    componentDidMount = () => {
        document.title = "Atmosphere parameters";
    };
    render() {
        const dates = this.extractDataToList("date");
        const temperature = this.extractDataToList("temperature");
        const pressure = this.extractDataToList("pressure");
        const humidity = this.extractDataToList("humidity");

        const data = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              label: {
                backgroundColor: "#6a7985"
              }
            }
          },
          legend: {
            data: ["Temperature", "Pressure","Humidity"]
          },
          dataZoom: [
            {
              type: "slider",
              height: 8,
              bottom: 20,
              borderColor: "transparent",
              backgroundColor: "#e2e2e2",
              handleIcon:
                "M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z", // jshint ignore:line
              handleSize: 20,
              handleStyle: {
                shadowBlur: 6,
                shadowOffsetX: 1,
                shadowOffsetY: 2,
                shadowColor: "#aaa"
              }
            },
            {
              type: "inside"
            }
          ],
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          xAxis: {
            type: "category",
            data: dates,
            show: true,
            axisLabel: {
              color: "gray",
              fontWeight: "bold",
              rotate: 90,
              interval: 6
            }
          },
          yAxis: {
            type: "value",
            axisLabel: {
              color: "gray",
              inside: true
            }
          },
          series: [
            {
              name: "Temperature",
              type: "bar",
              smooth: true,
              data: temperature,
              symbol: "none",
              color: "#0000ff"
            },
            {
              name: "Pressure",
              type: "bar",
              smooth: true,
              data: pressure,
              symbol: "none",
              color: "#FF4500"
            },
            {
              name: "Humidity",
              type: "bar",
              smooth: true,
              data: humidity,
              symbol: "none",
              color: "#45FF00"
            }
          ]
        };
        return (
          <div className="App">
            <h2>Atmosphere parameters</h2>
            <ReactECharts
              style={{
                height: "600px",
                width: "100%"
              }}
              option={data}
            />
          </div>
        );
      }
}

export default App;
