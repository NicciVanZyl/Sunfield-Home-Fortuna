const express = require('express');
const cors = require('cors');
const { connectDB, sql } = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Establish connection pool
connectDB();

// Example Route: Fetching data from Azure SQL
app.get('/api/users', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Users`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
