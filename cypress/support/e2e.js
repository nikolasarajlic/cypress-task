// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Function to generate a random string of a specified length without numbers
function getRandomStringWithoutNumbers() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
  
  // Function to generate a random string of a specified length with numbers
  function getRandomPassword() {
    const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const allCharacters = upperCaseLetters + lowerCaseLetters + numbers;
  
    let password = '';
  
    // Ensure at least one uppercase letter and one number
    password += lowerCaseLetters.charAt(Math.floor(Math.random() * lowerCaseLetters.length))
    password += upperCaseLetters.charAt(Math.floor(Math.random() * upperCaseLetters.length));
    password += numbers.charAt(Math.floor(Math.random() * numbers.length));
  
    // Fill the remaining characters
    for (let i = 0; i < 6; i++) {
      password += allCharacters.charAt(Math.floor(Math.random() * allCharacters.length));
    }
  
    // Shuffle the password to ensure randomness
    password = password.split('').sort(() => 0.5 - Math.random()).join('');
  
    return password;
  }
  
  module.exports = {
    getRandomStringWithoutNumbers,
    getRandomPassword
  };

// Alternatively you can use CommonJS syntax:
// require('./commands')