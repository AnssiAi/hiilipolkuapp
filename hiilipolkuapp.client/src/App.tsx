import { useEffect, useState } from 'react';
import './App.css';


function App() {
    const [pingResponse, setPingResponse] = useState<string>();

    useEffect(() => {
        ping();
    }, []);

    const contents = pingResponse === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <div>
                {pingResponse}
        </div>;

    return (
        <div>
            <h1 id="tableLabel">Hiilipolku</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );

    async function ping() {
        const response = await fetch('api/health/ping');
        const data = await response.text()
        setPingResponse(data);
    }
}

export default App;