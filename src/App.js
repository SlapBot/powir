import React, {useEffect, useState} from 'react';
import './App.css';
import { Line, Bar }  from 'react-chartjs-2';


function App() {
    function randomScalingFactor() {
        return Math.random() * 100
    }

    const [data, setData] = useState(
        {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'red',
                borderColor: 'red',
                data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                ],
                fill: false,
            }, {
                label: 'My Second dataset',
                fill: false,
                backgroundColor: 'blue',
                borderColor: 'blue',
                data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                ],
            }]
        }
    )
    return (
        <div>
            <div className="box" style={{
                marginBottom: "0.5em"
            }}>
                <div className="content is-large">
                    <h1>Roxy </h1>
                    <p>Monitoring & Analyzing your battery!</p>
                </div>
            </div>
            <div className="columns">
                <div className="column is-one-third">
                    <div className="box">
                        <div className="content has-text-centered">
                            <h2>Battery Capacity History</h2>
                        </div>
                        <Line data={data}/>
                    </div>
                </div>
                <div className="column is-one-third">
                    <div className="box">
                        <div className="content has-text-centered">
                            <h2>Battery Capacity History</h2>
                        </div>
                        <Bar data={data}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
