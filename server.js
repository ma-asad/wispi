import { MongoClient, ServerApiVersion } from "mongodb";
import express from "express";
import session from "express-session";
import bcrypt from "bcrypt";
import cors from "cors";

const port = 3000;
const uri =
  "mongodb+srv://asad:LcKJMBT6krGoMnt0@wispi.sy0u7sr.mongodb.net/?retryWrites=true&w=majority&appName=Wispi";
const app = express();

// Set up CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.static("./public"));

// Set up session management
app.use(
  session({
    secret: "ineedtochangethis",
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, // 1 week
    resave: true,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  console.log("Session: ", req.session);
  next();
});

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true,
  },
});

const db = client.db("Wispi");
const usersCollection = db.collection("users");
const wispisCollection = db.collection("wispis");

async function run() {
  try {
    await client.connect();
    startServer();
    setupRoutes();
  } catch (e) {
    await client.close();
    console.error(e);
  }
}

function startServer() {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

function setupRoutes() {
  app.post("/api/signup", async (req, res) => {
    console.log("Signup request received", req.body);
    try {
      const { email, fullName, username, password } = req.body;
      const errors = [];

      // Check if the email already exists
      const existingEmailUser = await usersCollection.findOne({ email });
      if (existingEmailUser) {
        errors.push("Email already exists");
      }

      // Check if the username already exists
      const existingUsernameUser = await usersCollection.findOne({ username });
      if (existingUsernameUser) {
        errors.push("Username already exists");
      }

      if (errors.length > 0) {
        res.status(400).json({ success: false, message: errors.join(", ") });
        return;
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = { email, fullName, username, password: hashedPassword };

      // Save the user to the database
      const result = await usersCollection.insertOne(newUser);
      console.log("Signup successful:", result);

      // Create a session for the user
      req.session.userId = result.insertedId;
      req.session.username = username;
      req.session.loginTime = new Date();

      // Save the session data
      req.session.save((err) => {
        if (err) {
          console.error("Error saving session:", err);
          return res.status(500).json({
            success: false,
            message: "An error occurred during signup",
          });
        }

        res.status(200).json({ success: true, message: "Signup successful" });
      });
    } catch (error) {
      console.error("Error during signup:", error);
      res
        .status(500)
        .json({ success: false, message: "An error occurred during signup" });
    }
  });

  app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;

    // Find the user with the given username or email
    const user = await usersCollection.findOne({
      $or: [{ username }, { email: username }],
    });

    if (user) {
      // Compare the provided password with the hashed password in the database
      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (isPasswordCorrect) {
        // Create a session for the user
        req.session.userId = user._id;
        req.session.username = username;
        req.session.loginTime = new Date();

        // Save the session data
        req.session.save((err) => {
          if (err) {
            console.error("Error saving session:", err);
            return res.status(500).json({
              success: false,
              message: "An error occurred during login",
            });
          }

          res.status(200).json({ success: true, message: "Login successful" });
        });
      } else {
        res.status(400).json({ success: false, message: "Incorrect password" });
      }
    } else {
      res.status(400).json({ success: false, message: "User not found" });
    }
  });

  app.post("/api/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send("Failed to log out.");
      }

      res.status(200).send("Logged out successfully.");
      console.log("Logged out successfully");
    });
  });

  // Middleware to check if the session exists
  app.use((req, res, next) => {
    if (req.session) {
      console.log("Session exists");
    } else {
      console.log("Session does not exist");
    }
    next();
  });

  // Middleware to check if the user is logged in
  app.use((req, res, next) => {
    if (req.session.userId) {
      console.log("User is logged in");
    } else {
      console.log("User is not logged in");
    }
    next();
  });

  // Add this route
  app.get("/api/isLoggedIn", (req, res) => {
    if (req.session.userId) {
      res.json(true);
    } else {
      res.json(false);
    }
  });

  // Middleware to redirect logged in users
  app.use(["/api/login", "/api/signup"], (req, res, next) => {
    if (req.session.userId) {
      res.redirect("#/feed"); // Redirect to the home page
    } else {
      next();
    }
  });
}

run();
