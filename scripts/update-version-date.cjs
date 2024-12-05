const fs = require('fs');
const path = require('path');

// Function to format the date
function formatDate(date) {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  
  // Format hours and minutes
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12 || 12; // Convert to 12-hour format
  
  return `${day} ${month} ${year} ${hours}:${minutes} ${ampm}`;
}

// Get the current date and time
const now = new Date();
const formattedDate = formatDate(now);

// Path to package.json
const packageJsonPath = path.resolve(__dirname, '../package.json');

// Read and parse package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Update the version-date field
packageJson['version date'] = formattedDate;

// Write the updated package.json back to the file
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log(`Updated version-date to: ${formattedDate}`);
