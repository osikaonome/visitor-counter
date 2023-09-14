const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Define a route to store the IP address
app.get('/store-ip', (req, res) => {
  const userIP = req.ip; // Get the user's IP from the request

  // Create an object with IP and timestamp
  const ipData = {
    ip: userIP,
    timestamp: new Date().toISOString(),
  };

  // Append the data to a JSON file
  fs.readFile('ip_data.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      return res.status(500).json({ error: 'Could not save IP address' });
    }

    let ipArray = [];
    if (data) {
      ipArray = JSON.parse(data);
    }

    ipArray.push(ipData);

    fs.writeFile('ip_data.json', JSON.stringify(ipArray, null, 2), (err) => {
      if (err) {
        console.error('Error writing JSON file:', err);
        return res.status(500).json({ error: 'Could not save IP address' });
      }
      console.log('IP address saved:', userIP);
      res.json({ message: 'IP address saved' });
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
