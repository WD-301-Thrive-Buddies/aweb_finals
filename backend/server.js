import Express from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import multer from "multer";

const port = process.env.PORT || 4000;

var app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use(cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization"
}));

var CONNECTION_STRING = process.env.DB_URL;
var DATABASENAME = "homecare";

var database;

async function connectDB() {
  try {
    const client = await MongoClient.connect(CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    database = client.db(DATABASENAME);
    console.log("Database connection established!");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

connectDB().then(() => {
  app.listen(port, () => {
    console.log("Server Running!");
  });
});
// ARTICLES

app.get("/articles", async (req, res) => {
  if (!database) return res.status(500).json({ error: "Database not connected" });

  try {
    const result = await database.collection("articles").find({}).toArray();
    res.json(result);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    res.status(500).json({ error: "Failed to retrieve testimonials" });
  }
});


// TESTIMONIALS
app.get("/testimonials", async (req, res) => {
  if (!database) return res.status(500).json({ error: "Database not connected" });

  try {
    const result = await database.collection("testimonials").find({}).toArray();
    res.json(result);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    res.status(500).json({ error: "Failed to retrieve testimonials" });
  }
});

app.post("/testimonials", multer().none(), async (req, res) => {
  if (!database) return res.status(500).json({ error: "Database not connected" });

  const { name, testimonial, image, role } = req.body;

  if (!name || !testimonial || !image || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    await database.collection("testimonials").insertOne({ name, testimonial, image, role });

    res.json({ success: true, message: "Testimonial Added Successfully" });
  } catch (error) {
    console.error("Error adding testimonial:", error);
    res.status(500).json({ error: "Failed to add testimonial" });
  }
});

app.put("/testimonials", async (req, res) => {
  if (!database) return res.status(500).json({ error: "Database not connected" });

  try {
    const id = req.query.id;
    if (!id) return res.status(400).json({ error: "ID is required" });

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid testimonial ID format" });
    }

    const { name, testimonial, image, role } = req.body;

    if (!name || !testimonial || !image || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const result = await database.collection("testimonials").updateOne(
      { _id: new ObjectId(id) }, 
      { $set: { name, testimonial, image, role } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "Testimonial not found or unchanged" });
    }

    res.json({ success: true, message: "Updated successfully" });
  } catch (error) {
    console.error("Error updating testimonial:", error);
    res.status(500).json({ error: "Failed to update testimonial" });
  }
});

app.delete("/testimonials", async (req, res) => {
  if (!database) return res.status(500).json({ error: "Database not connected" });

  try {
    const id = req.query.id;
    if (!id) return res.status(400).json({ error: "ID is required" });

    const result = await database.collection("testimonials").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "No matching testimonial found" });
    }

    res.json({ success: true, message: "Deleted successfully!" });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    res.status(500).json({ error: "Failed to delete testimonial" });
  }
});

// CONTACT
app.get("/contacts", async (req, res) => {
  if (!database) return res.status(500).json({ error: "Database not connected" });

  try {
    const messages = await database.collection("contacts").find({}).toArray();
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to retrieve messages" });
  }
});

app.post("/contacts", multer().none(), async (req, res) => {
  if (!database) return res.status(500).json({ error: "Database not connected" });

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    await database.collection("contacts").insertOne({ name, email, message });
    res.json({ success: true, message: "Message Sent Successfully" });
  } catch (error) {
    console.error("Error adding message:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

app.delete("/contacts", async (req, res) => {
  if (!database) return res.status(500).json({ error: "Database not connected" });

  try {
    const id = req.query.id;
    if (!id) return res.status(400).json({ error: "ID is required" });

    const result = await database.collection("contacts").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "No matching message found" });
    }

    res.json({ success: true, message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ error: "Failed to delete message" });
  }
});

// AUTH

app.post("/login", async (req, res) => {
  if (!database) return res.status(500).json({ error: "Database not connected" });

  try {
    const user = await database.collection("users").findOne({
      username: req.body.username
    });

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    if (user.password !== req.body.password) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    res.json({ success: true, message: "Login successful", user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

