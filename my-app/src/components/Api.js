import React, { useState, useEffect } from 'react';

const Api = ({city}) => {
    const [data, setData] = useState(null);

    console.log('Inside api code')

    useEffect(() => {
        // Fetch data from the API
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('https://api.example.com/data');
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            
            <button class="apiButton" onClick={()=> {}}type="button">{'IMMMM HEREEEE'}</button>
        </div>
    );
};
export default Api;