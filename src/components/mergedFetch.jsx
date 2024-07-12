import { useEffect } from 'react';

function MergedFetch() {
  useEffect(() => {
    const fetchData = () => {
      fetch('http://localhost:4000/data/merged')
        .then(response => response.json())
        .then(data => {
          sessionStorage.setItem('HD2merged', JSON.stringify(data));
        })
        .catch(error => console.log(error));
    };

    fetchData(); 

    const interval = setInterval(fetchData, 5000); 

    return () => clearInterval(interval); 
  }, []);

  return null; 
}

export default MergedFetch;
