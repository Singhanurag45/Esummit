const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
}

// Load schemes data
const schemesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/schemes.json'), 'utf8'));

// API endpoint to get all schemes
app.get('/api/schemes', (req, res) => {
  res.json(schemesData);
});

// API endpoint to get eligible schemes based on user details
app.post('/api/check-eligibility', (req, res) => {
  const { age, income, occupation, caste, gender, state, district } = req.body;
  
  // Filter schemes based on user details
  const eligibleSchemes = schemesData.schemes.filter(scheme => {
    let isEligible = true;
    
    // Check age eligibility
    if (scheme.eligibility.age) {
      const userAge = parseInt(age);
      if (scheme.eligibility.age.min && userAge < scheme.eligibility.age.min) {
        isEligible = false;
      }
      if (scheme.eligibility.age.max && userAge > scheme.eligibility.age.max) {
        isEligible = false;
      }
    }
    
    // Check income eligibility
    if (scheme.eligibility.income) {
      const userIncome = parseInt(income);
      if (scheme.eligibility.income.max && userIncome > scheme.eligibility.income.max) {
        isEligible = false;
      }
    }
    
    // Check occupation eligibility
    if (scheme.eligibility.occupation && !scheme.eligibility.occupation.includes(occupation)) {
      isEligible = false;
    }
    
    // Check gender eligibility
    if (scheme.eligibility.gender && !scheme.eligibility.gender.includes(gender)) {
      isEligible = false;
    }
    
    // Check caste eligibility
    if (scheme.eligibility.caste && !scheme.eligibility.caste.includes(caste)) {
      isEligible = false;
    }
    
    // Check state eligibility
    if (scheme.eligibility.states && !scheme.eligibility.states.includes(state)) {
      isEligible = false;
    }
    
    return isEligible;
  });
  
  res.json({ eligibleSchemes });
});

// API endpoint to get states and districts
app.get('/api/locations', (req, res) => {
  res.json(schemesData.locations);
});

// API endpoint to get translations
app.get('/api/translations', (req, res) => {
  res.json(schemesData.translations);
});

// Handle React routing in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});