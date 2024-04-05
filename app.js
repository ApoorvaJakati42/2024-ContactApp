const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const contactRouter = require("./routes/contactRoutes");
const swaggerUi = require('swagger-ui-express');
const specs = require('./services/swagger');

const mongodb = require('./mongodb/mongodb')

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(contactRouter)


// Serve Swagger UI at /api-docs route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Set view engine and views directory for rendering views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public/html')); 

// Use contactRouter for handling contact-related routes


// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
