// const express = require("express");
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json()); // For parsing JSON data

// // MongoDB connection
// mongoose.connect("mongodb://localhost:27017/usersDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // User Schema
// const userSchema = new mongoose.Schema({
//   username: String,
//   email: String,
//   password: String,
// });

// const User = mongoose.model("User", userSchema);

// // Register route
// app.post("/api/register", async (req, res) => {
//   const { username, email, password } = req.body;

//   if (!username || !email || !password) {
//     return res
//       .status(400)
//       .json({ success: false, message: "All fields are required" });
//   }

//   try {
//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user
//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword,
//     });

//     await newUser.save(); // Save user to MongoDB

//     res.json({ success: true });
//   } catch (error) {
//     console.error("Error saving user:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // Login route
// app.post("/api/login", async (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res
//       .status(400)
//       .json({ success: false, message: "All fields are required" });
//   }

//   try {
//     const user = await User.findOne({ username });

//     if (!user) {
//       return res
//         .status(400)
//         .json({ success: false, message: "User not found" });
//     }

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid credentials" });
//     }

//     // If login is successful
//     res.json({ success: true });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });




// // Start the server
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(Server is running on port ${PORT});
// });



const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // For parsing JSON data

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/userDDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User Schema (Collection: users)
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema); // This will create the 'users' collection

// Academic Credentials Schema (Collection: AcademicCredentials)
const academicCredentialSchema = new mongoose.Schema({
  srn: String,
  prn: String,
  hallTicketNo: Number,
  cgpa: Number,
  sgpa: Number,
  studentName: String,
  collegeName: String,
  hash: String, // Hash generated and stored on the blockchain
});

const AcademicCredential = mongoose.model('AcademicCredential', academicCredentialSchema); // This will create the 'AcademicCredentials' collection

// Register route
app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save(); // Save user to MongoDB

    res.json({ success: true });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Login route
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // If login is successful
    res.json({ success: true });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Store academic credentials in the AcademicCredentials collection
app.post('/api/store-academic-credentials', async (req, res) => {
  const { srn, prn, hallTicketNo, cgpa, sgpa, studentName, collegeName, hash } = req.body;

  if (!srn || !prn || !hallTicketNo || !cgpa || !sgpa || !studentName || !collegeName ) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    // Create a new academic credential record
    const newCredential = new AcademicCredential({
      srn,
      prn,
      hallTicketNo,
      cgpa,
      sgpa,
      studentName,
      collegeName,
    
    });

    await newCredential.save(); // Save the academic credential to the 'AcademicCredentials' collection
    res.json({ success: true, message: 'Academic credentials stored successfully' });
  } catch (error) {
    console.error("Error saving academic credentials:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});



// Fetch all academic credentials
app.get('/api/get-academic-credentials', async (req, res) => {
  try {
    const credentials = await AcademicCredential.find();
    res.json({ success: true, data: credentials });
  } catch (error) {
    console.error("Error fetching academic credentials:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// TransactionHash Schema (Collection: TransactionHashes)
const transactionHashSchema = new mongoose.Schema({
  srn: String,
  transactionHash: String,
});

const TransactionHash = mongoose.model('TransactionHash', transactionHashSchema); // This will create the 'TransactionHashes' collection

// Update the save-transaction-hash route
app.post('/api/save-transaction-hash', async (req, res) => {
  const { srn, transactionHash } = req.body;

  try {
      // Create a new transaction hash record
      const newTransaction = new TransactionHash({
          srn,
          transactionHash,
      });

      await newTransaction.save(); // Save the transaction hash in the 'TransactionHashes' collection
      res.status(200).json({ success: true, message: 'Transaction hash saved successfully' });
  } catch (error) {
      console.error('Error saving transaction hash:', error);
      res.status(500).json({ success: false, message: 'Error saving transaction hash' });
  }
});


// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});