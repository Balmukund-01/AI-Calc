import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const History = () => {
    const [history, setHistory] = useState([]);

    // Fetch the history from the backend when the component mounts
    useEffect(() => {
        axios.get('http://localhost:8000/history')  // Adjust the backend URL if needed
            .then(response => {
                setHistory(response.data.history);
            })
            .catch(error => {
                console.error("There was an error fetching the history!", error);
            });
    }, []);

    return (
        <div>
            <h2>Calculation History</h2>
            {history.length === 0 ? (
                <p>No history found.</p>
            ) : (
                <ul>
                    {history.map((entry: any) => (
                        <li key={entry.id}>
                            {entry.input} = {entry.result} (at {new Date(entry.timestamp).toLocaleString()})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default History;
