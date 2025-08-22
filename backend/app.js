// import fs from 'node:fs/promises';

// import bodyParser from 'body-parser';
// import express from 'express';

// const app = express();

// app.use(bodyParser.json());
// app.use(express.static('public'));

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, PUT, DELETE, OPTIONS'
//   );
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'X-Requested-With,content-type'
//   );
//   next();
// });

// app.get('/events', async (req, res) => {  
//   const { max, search } = req.query;
//   const eventsFileContent = await fs.readFile('./data/events.json');
//   let events = JSON.parse(eventsFileContent);

//   if (search) {
//     events = events.filter((event) => {
//       const searchableText = `${event.title}`;
//       return searchableText.toLowerCase().includes(search.toLowerCase());
//     });
//   }

//   if (max) {
//     events = events.slice(events.length - max, events.length);
//   }

//   res.json({
//     events: events.map((event) => ({
//       id: event.id,
//       title: event.title,
//       image: event.image,
//       price: event.price,
//     })),
//   });
// });

// app.get('/events/images', async (req, res) => {
//   const imagesFileContent = await fs.readFile('./data/images.json');
//   const images = JSON.parse(imagesFileContent);

//   res.json({ images });
// });

// app.get('/events/:id', async (req, res) => {
//   const { id } = req.params;

//   const eventsFileContent = await fs.readFile('./data/events.json');
//   const events = JSON.parse(eventsFileContent);

//   const event = events.find((event) => event.id === id);

//   if (!event) {
//     return res
//       .status(404)
//       .json({ message: `For the id ${id}, no event could be found.` });
//   }

//   setTimeout(() => {
//     res.json({ event });
//   }, 1000);
// });

// app.post('/events', async (req, res) => {
//   const { event } = req.body;

//   if (!event) {
//     return res.status(400).json({ message: 'Event is required' });
//   }

//   console.log(event);

//   if (
//     !event.title?.trim() ||
//     !event.description?.trim() ||
//     !event.price?.trim() ||
//      !event.image?.trim() 
//   ) {
//     return res.status(400).json({ message: 'Invalid data provided.' });
//   }

//   const eventsFileContent = await fs.readFile('./data/events.json');
//   const events = JSON.parse(eventsFileContent);

//   const newEvent = {
//     id: Math.round(Math.random() * 10000).toString(),
//     ...event,
//   };

//   events.push(newEvent);

//   await fs.writeFile('./data/events.json', JSON.stringify(events));

//   res.json({ event: newEvent });
// });

// app.put('/events/:id', async (req, res) => {
//   const { id } = req.params;
//   const { event } = req.body;

//   if (!event) {
//     return res.status(400).json({ message: 'Event is required' });
//   }

//   if (
//     !event.title?.trim() ||
//     !event.description?.trim() ||
//     !event.image?.trim() ||
//     !event.price?.trim()
//   ) {
//     return res.status(400).json({ message: 'Invalid data provided.' });
//   }

//   const eventsFileContent = await fs.readFile('./data/events.json');
//   const events = JSON.parse(eventsFileContent);

//   const eventIndex = events.findIndex((event) => event.id === id);

//   if (eventIndex === -1) {
//     return res.status(404).json({ message: 'Event not found' });
//   }

//   events[eventIndex] = {
//     id,
//     ...event,
//   };

//   await fs.writeFile('./data/events.json', JSON.stringify(events));

//   setTimeout(() => {
//     res.json({ event: events[eventIndex] });
//   }, 1000);
// });

// app.delete('/events/:id', async (req, res) => {
//   const { id } = req.params;

//   const eventsFileContent = await fs.readFile('./data/events.json');
//   const events = JSON.parse(eventsFileContent);

//   const eventIndex = events.findIndex((event) => event.id === id);

//   if (eventIndex === -1) {
//     return res.status(404).json({ message: 'Event not found' });
//   }

//   events.splice(eventIndex, 1);

//   await fs.writeFile('./data/events.json', JSON.stringify(events));

//   setTimeout(() => {
//     res.json({ message: 'Event deleted' });
//   }, 1000);
// });

// app.listen(3000, () => {
//   console.log('Server running on port 3000');
// // });
// import fs from 'node:fs/promises';
// import bodyParser from 'body-parser';
// import express from 'express';
// import cors from 'cors';

// const app = express();
// app.use(cors({ origin: 'http://localhost:5173', methods: ['GET','POST','PUT','DELETE'] }));

// app.use(bodyParser.json());
// app.use(express.static('public'));




// // -----------------------------------------------------------------------------
// // Helper functions
// // -----------------------------------------------------------------------------
// const EVENTS_FILE = './data/events.json';
// const ORDERS_FILE = './data/orders.json';
// const IMAGES_FILE = './data/images.json';

// async function readJson(file) {
//   try {
//     const content = await fs.readFile(file, 'utf-8');
//     return content ? JSON.parse(content) : [];
//   } catch {
//     return [];
//   }
// }

// async function writeJson(file, data) {
//   await fs.writeFile(file, JSON.stringify(data, null, 2));
// }

// // -----------------------------------------------------------------------------
// // EVENTS ROUTES (unchanged from your code, just cleaned a little)
// // -----------------------------------------------------------------------------
// app.get('/events', async (req, res) => {
//   const { max, search } = req.query;
//   let events = await readJson(EVENTS_FILE);

//   if (search) {
//     events = events.filter((event) =>
//       event.title.toLowerCase().includes(search.toLowerCase())
//     );
//   }

//   if (max) {
//     events = events.slice(events.length - max, events.length);
//   }

//   res.json({
//     events: events.map((event) => ({
//       id: event.id,
//       title: event.title,
//       image: event.image,
//       price: event.price,
//     })),
//   });
// });

// app.get('/events/images', async (req, res) => {
//   const images = await readJson(IMAGES_FILE);
//   res.json({ images });
// });

// app.get('/events/:id', async (req, res) => {
//   const { id } = req.params;
//   const events = await readJson(EVENTS_FILE);

//   const event = events.find((event) => event.id.toString() === id.toString());

//   if (!event) {
//     return res
//       .status(404)
//       .json({ message: `For the id ${id}, no event could be found.` });
//   }

//   setTimeout(() => {
//     res.json({ event });
//   }, 1000);
// });

// app.post('/events', async (req, res) => {
//   const { event } = req.body;
//   if (!event) return res.status(400).json({ message: 'Event is required' });

//   if (
//     !event.title?.trim() ||
//     !event.description?.trim() ||
//     !event.image?.trim() ||
//     !event.price
//   ) {
//     return res.status(400).json({ message: 'Invalid data provided.' });
//   }

//   const events = await readJson(EVENTS_FILE);
//   const newEvent = {
//     id: Math.round(Math.random() * 10000).toString(),
//     ...event,
//   };

//   events.push(newEvent);
//   await writeJson(EVENTS_FILE, events);

//   res.json({ event: newEvent });
// });

// app.put('/events/:id', async (req, res) => {
//   const { id } = req.params;
//   const { event } = req.body;

//   if (!event) return res.status(400).json({ message: 'Event is required' });

//   if (
//     !event.title?.trim() ||
//     !event.description?.trim() ||
//     !event.image?.trim() ||
//     !event.price
//   ) {
//     return res.status(400).json({ message: 'Invalid data provided.' });
//   }

//   const events = await readJson(EVENTS_FILE);
//   const eventIndex = events.findIndex((ev) => ev.id.toString() === id.toString());

//   if (eventIndex === -1) {
//     return res.status(404).json({ message: 'Event not found' });
//   }

//   events[eventIndex] = { id, ...event };
//   await writeJson(EVENTS_FILE, events);

//   setTimeout(() => {
//     res.json({ event: events[eventIndex] });
//   }, 1000);
// });

// app.delete('/events/:id', async (req, res) => {
//   const { id } = req.params;
//   const events = await readJson(EVENTS_FILE);

//   const eventIndex = events.findIndex((ev) => ev.id.toString() === id.toString());
//   if (eventIndex === -1) {
//     return res.status(404).json({ message: 'Event not found' });
//   }

//   events.splice(eventIndex, 1);
//   await writeJson(EVENTS_FILE, events);

//   setTimeout(() => {
//     res.json({ message: 'Event deleted' });
//   }, 1000);
// });

// // -----------------------------------------------------------------------------
// // ORDERS ROUTES (NEW)
// // -----------------------------------------------------------------------------

// // Get all orders
// app.get('/orders', async (req, res) => {
//   const orders = await readJson(ORDERS_FILE);
//   res.json({ orders });
// });

// // Add new order
// app.post('/orders', async (req, res) => {
//   const { order } = req.body;
//   if (!order) return res.status(400).json({ message: 'Order is required' });

//   const orders = await readJson(ORDERS_FILE);
//   const newOrder = {
//     id: Math.round(Math.random() * 10000).toString(),
//     createdAt: new Date().toISOString(),
//     ...order,
//   };

//   orders.push(newOrder);
//   await writeJson(ORDERS_FILE, orders);

//   res.json({ order: newOrder });
// });
// app.put('/orders', async (req, res) => {
//   const { order } = req.body;
//   if (!order) return res.status(400).json({ message: 'Order is required' });

//   // Replace entire file content with just this order
//   await writeJson(ORDERS_FILE, [order]);

//   res.json({ order });
// });
// // Delete order
// app.delete('/orders/:id', async (req, res) => {
//   const { id } = req.params;
//   const orders = await readJson(ORDERS_FILE);

//   const index = orders.findIndex((o) => o.id.toString() === id.toString());
//   if (index === -1) {
//     return res.status(404).json({ message: 'Order not found' });
//   }

//   orders.splice(index, 1);
//   await writeJson(ORDERS_FILE, orders);

//   res.json({ message: 'Order deleted' });
// });

// // -----------------------------------------------------------------------------
// // Start server
// // -----------------------------------------------------------------------------
// app.listen(3000, () => {
//   console.log('Server running on port 3000');
// });

// app.js// app.js
import fs from "node:fs/promises";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { hash, compare } from "bcryptjs";
import pkg from "jsonwebtoken";
const { sign, verify } = pkg;

const app = express();
app.use(cors({ origin: "http://localhost:5173", methods: ["GET","POST","PUT","DELETE"] }));
app.use(bodyParser.json());
app.use(express.static("public"));

// -----------------------------------------------------------------------------
// File paths
// -----------------------------------------------------------------------------
const EVENTS_FILE = "./data/events.json";
const ORDERS_FILE = "./data/orders.json";
const USERS_FILE = "./data/users.json";
const IMAGES_FILE = "./data/images.json";

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------
async function readJson(file) {
  try {
    const content = await fs.readFile(file, "utf-8");
    return content ? JSON.parse(content) : [];
  } catch {
    return [];
  }
}

async function writeJson(file, data) {
  await fs.writeFile(file, JSON.stringify(data, null, 2));
}

// -----------------------------------------------------------------------------
// Auth & Users Helpers
// -----------------------------------------------------------------------------
const KEY = "supersecret";

function createJSONToken(email) {
  return sign({ email }, KEY, { expiresIn: "1h" });
}

function validateJSONToken(token) {
  return verify(token, KEY);
}

async function isValidPassword(password, hashed) {
  return compare(password, hashed);
}

function isValidEmail(value) {
  return value && value.includes("@");
}

function isValidText(value, minLength = 1) {
  return value && value.trim().length >= minLength;
}

// -----------------------------------------------------------------------------
// USERS ROUTES
// -----------------------------------------------------------------------------
app.post("/auth/signup", async (req, res) => {
  const { email, password } = req.body;
  const errors = {};

  if (!isValidEmail(email)) errors.email = "Invalid email";
  if (!isValidText(password, 6)) errors.password = "Password too short";

  const users = await readJson(USERS_FILE);
  if (users.find(u => u.email === email)) errors.email = "Email already exists";

  if (Object.keys(errors).length > 0) return res.status(422).json({ message: "Validation failed", errors });

  const hashedPw = await hash(password, 12);
  const newUser = { id: Date.now().toString(), email, password: hashedPw };
  users.push(newUser);
  await writeJson(USERS_FILE, users);

  const token = createJSONToken(email);
  res.status(201).json({ message: "User created", user: { id: newUser.id, email }, token });
});

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const users = await readJson(USERS_FILE);
  const user = users.find(u => u.email === email);

  if (!user) return res.status(401).json({ message: "Authentication failed" });

  const valid = await isValidPassword(password, user.password);
  if (!valid) return res.status(422).json({ message: "Invalid credentials" });

  const token = createJSONToken(email);
  res.json({ token });
});

// -----------------------------------------------------------------------------
// EVENTS ROUTES
// -----------------------------------------------------------------------------
app.get("/events", async (req, res) => {
  const { max, search } = req.query;
  let events = await readJson(EVENTS_FILE);

  if (search) events = events.filter(e => e.title.toLowerCase().includes(search.toLowerCase()));
  if (max) events = events.slice(events.length - max);

  res.json({ events: events.map(e => ({ id: e.id, title: e.title, image: e.image, price: e.price })) });
});

app.get("/events/images", async (req, res) => {
  const images = await readJson(IMAGES_FILE);
  res.json({ images });
});

app.get("/events/:id", async (req, res) => {
  const events = await readJson(EVENTS_FILE);
  const event = events.find(e => e.id.toString() === req.params.id);
  if (!event) return res.status(404).json({ message: "Event not found" });
  res.json({ event });
});

app.post("/events", async (req, res) => {
  const { event } = req.body;
  if (!event || !event.title || !event.description || !event.image || !event.price) {
    return res.status(400).json({ message: "Invalid data" });
  }

  const events = await readJson(EVENTS_FILE);
  const newEvent = { id: Date.now().toString(), ...event };
  events.push(newEvent);
  await writeJson(EVENTS_FILE, events);
  res.json({ event: newEvent });
});

app.put("/events/:id", async (req, res) => {
  const { id } = req.params;
  const { event } = req.body;

  const events = await readJson(EVENTS_FILE);
  const index = events.findIndex(e => e.id.toString() === id);
  if (index === -1) return res.status(404).json({ message: "Event not found" });

  events[index] = { id, ...event };
  await writeJson(EVENTS_FILE, events);
  res.json({ event: events[index] });
});

app.delete("/events/:id", async (req, res) => {
  const { id } = req.params;
  const events = await readJson(EVENTS_FILE);
  const index = events.findIndex(e => e.id.toString() === id);
  if (index === -1) return res.status(404).json({ message: "Event not found" });

  events.splice(index, 1);
  await writeJson(EVENTS_FILE, events);
  res.json({ message: "Event deleted" });
});

// -----------------------------------------------------------------------------
// ORDERS ROUTES
// -----------------------------------------------------------------------------
app.get("/orders", async (req, res) => {
  const orders = await readJson(ORDERS_FILE);
  res.json({ orders });
});

app.post("/orders", async (req, res) => {
  const { order } = req.body;
  if (!order) return res.status(400).json({ message: "Order required" });

  const orders = await readJson(ORDERS_FILE);
  const newOrder = { id: Date.now().toString(), createdAt: new Date().toISOString(), ...order };
  orders.push(newOrder);
  await writeJson(ORDERS_FILE, orders);
  res.json({ order: newOrder });
});

app.put("/orders", async (req, res) => {
  const { order } = req.body;
  if (!order) return res.status(400).json({ message: "Order required" });

  await writeJson(ORDERS_FILE, [order]);
  res.json({ order });
});

app.delete("/orders/:id", async (req, res) => {
  const { id } = req.params;
  const orders = await readJson(ORDERS_FILE);
  const index = orders.findIndex(o => o.id.toString() === id);
  if (index === -1) return res.status(404).json({ message: "Order not found" });

  orders.splice(index, 1);
  await writeJson(ORDERS_FILE, orders);
  res.json({ message: "Order deleted" });
});

// -----------------------------------------------------------------------------
// Start Server
// -----------------------------------------------------------------------------
app.listen(3000, () => {
  console.log("✅ Server running on port 3000");
});
