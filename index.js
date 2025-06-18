const express = require('express'); 
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3100; 

app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Welcome to the aquack assessment API");
});

// In-memory user storage
const users = {};

// POST /users
app.post('/users', (req, res) => { 
    console.log('Received request to create user:', req.body);
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  const id = uuidv4();
  const user = { id, name, email };
  users[id] = user;

  res.status(201).json(user);
}); 

 
app.get('/users/:id', (req, res) => {
    const {id} = req.params;
  console.log('Received request to get user with ID:', id);
  const user = users[id] 
  console.log("Received request to get user with ID:", user);
  if (!user) {
    return res.status(404).json({ error: `User not  found` });
  }
  res.json(user);
});
 

//Catch-all for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Page not found' });
});

// start the server LAST
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
