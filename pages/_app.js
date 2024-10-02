// pages/_app.js
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/Layout';
import io from 'socket.io-client';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Initialize Socket.IO
    const socket = io();

    // Connect to the socket
    fetch('/api/socket');

    // Check Database Connection
    const checkDatabaseConnection = async () => {
      try {
        const response = await fetch('/api/init');
        const data = await response.json();
        console.log(data.message); // Log the message from the API
      } catch (error) {
        console.error('Error connecting to the database:', error);
      }
    };

    checkDatabaseConnection();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
