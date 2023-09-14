import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { firestore } from "../firebase";
import { addDoc, collection, query, where, getDocs } from "@firebase/firestore";
import './getIP.css'
import { Bars, InfinitySpin } from 'react-loader-spinner';
import CountUp from 'react-countup';

const GetIP = () => {
  const [userIP, setUserIP] = useState('');
  const ref = collection(firestore, "ipData");

  const isFetchInitiatedRef = useRef(false);
  const [ipCount, setIpCount] = useState(0);
  const [isLoadingCounter, setIsLoadingCounter] = useState(true); // Control whether the counter is loading

  useEffect(() => {
    // Check if the fetch has already been initiated, and if so, return early
    if (isFetchInitiatedRef.current) {
      return;
    }

    // Mark the fetch as initiated
    isFetchInitiatedRef.current = true;

    // Fetch user's IP address
    const fetchUserIP = async () => {
      try {
        const response = await fetch('https://api64.ipify.org?format=json');
        const data = await response.json();
        const userIp = data.ip;

        // Check if the IP already exists in the database
        const ipQuery = query(ref, where("ip", "==", userIp));
        const ipQuerySnapshot = await getDocs(ipQuery);

        if (ipQuerySnapshot.empty) {
          // IP doesn't exist in the database, add it
          let ipdata = {
            ip: userIp,
          };

          try {
            await addDoc(ref, ipdata);
          } catch (e) {
            console.error('Error saving data to Firebase:', e);
          }
        }

        setUserIP(userIp);
        console.log("LOG", data);

        // Fetch and set the count of IP addresses in the database
        const querySnapshot = await getDocs(ref);
        setIpCount(querySnapshot.size);
        setIsLoadingCounter(false); // Stop loading the counter
      } catch (error) {
        console.error('Error fetching IP:', error);
      }
    }

    fetchUserIP();
  }, [userIP, ref]);

  // Periodically update the IP count using setInterval
  useEffect(() => {
    const interval = setInterval(() => {
      // Fetch and set the count of IP addresses in the database
      const fetchIpCount = async () => {
        const querySnapshot = await getDocs(ref);
        setIpCount(querySnapshot.size);
      };

      fetchIpCount();
    }, 10000); // Update every 10 seconds (adjust as needed)

    return () => {
      clearInterval(interval); // Clear the interval when the component unmounts
    };
  }, [ref]);

  return (
    <div className='getip-container'>
      <h1 className='visits-header'>Number of Visits to myAreaa</h1>
      {isLoadingCounter ? (
        <div className="loading-container">
            <Bars
        height="80"
        width="80"
        color="#a06ccb"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
        </div>
      ) : (
        <>
            <CountUp
            className='ip-number'
            end={ipCount}
            duration={5}
            />
            </>
      )}
      {/* <p>User's IP Address: {userIP}</p> */}
    </div>
  );
};

export default GetIP;
