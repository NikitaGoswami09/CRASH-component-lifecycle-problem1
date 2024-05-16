import React, { useState, useEffect } from 'react';

const App = () => {
  // State for storing API data
  const [data, setData] = useState([]);
  // State for tracking mouse position
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // State for tracking document title
  const [title, setTitle] = useState('React App');

  // useEffect for fetching data from an API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  // useEffect for subscribing to mouse movement events
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  // useEffect for updating the document title
  useEffect(() => {
    document.title = title;
  }, [title]); // This effect runs whenever the title state changes

  return (
    <div>
      <h1>React useEffect Demo</h1>

      <section>
        <h2>Fetched Data from API</h2>
        <ul>
          {data.slice(0, 5).map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Mouse Position</h2>
        <p>
          X: {mousePosition.x}, Y: {mousePosition.y}
        </p>
      </section>

      <section>
        <h2>Update Document Title</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </section>
    </div>
  );
};

export default App;
