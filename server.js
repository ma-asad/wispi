import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
import express from "express";
import session from "express-session";
import bcrypt from "bcrypt";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";


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
      const newUser = {
        email,
        fullName,
        username,
        password: hashedPassword,
        bio: "",
        profilePicture: "./database/user_pfp/default.svg",
        followingCount: 0,
        followersCount: 0,
        accountCreated: new Date(),
      };

      // Save the user to the database
      const result = await usersCollection.insertOne(newUser);
      console.log("Signup successful:", result);

      // Create a session for the user
      req.session.userId = result.insertedId;
      req.session.username = username;
      req.session.loginTime = new Date();
      console.log("session Id: ", req.session.userId); // to remove

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
        console.log("session Id: ", req.session.userId); // to remove

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

  app.get("/api/user", async (req, res) => {
    // Check if the user is logged in
    if (!req.session.userId) {
      res.status(401).json({ success: false, message: "Not logged in" });
      return;
    }

    // Fetch the user's data from the database
    const user = await usersCollection.findOne({
      _id: new ObjectId(req.session.userId),
    });

    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    res.json(user);
  });

  // Configure multer for file uploads
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/database/user_pfp/");
    },
    filename: (req, file, cb) => {
      const username = req.session.username;
      const ext = path.extname(file.originalname);
      cb(null, `${username}${ext}`);
    },
  });
  const upload = multer({ storage });

  app.post(
    "/api/update-profile",
    upload.single("profile-picture"),
    async (req, res) => {
      // Check if the user is logged in
      if (!req.session.userId) {
        res.status(401).json({ success: false, message: "Not logged in" });
        return;
      }

      try {
        const { bio } = req.body;
        const userId = req.session.userId;
        const username = req.session.username;

        // Update the user's profile picture if a file was uploaded
        let profilePicture;
        if (req.file) {
          const { filename, path: filePath } = req.file;
          profilePicture = `/database/user_pfp/${filename}`;

          // Update the user's profile picture in the database
          await usersCollection.updateOne(
            { _id: new ObjectId(userId) },
            { $set: { profilePicture } }
          );
        }

        // Update the user's bio in the database
        await usersCollection.updateOne(
          { _id: new ObjectId(userId) },
          { $set: { bio } }
        );

        res
          .status(200)
          .json({ success: true, message: "Profile updated successfully" });
      } catch (error) {
        console.error("Error updating profile:", error);
        res
          .status(500)
          .json({
            success: false,
            message: "An error occurred while updating the profile",
          });
      }
    }
  );
}

run();
