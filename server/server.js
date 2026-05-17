const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const dotenv = require("dotenv");

const path = require("path");


// ====================================
// LOAD ENV
// ====================================

dotenv.config();


// ====================================
// EXPRESS APP
// ====================================

const app = express();


// ====================================
// IMPORT ROUTES
// ====================================

const authRoutes =
  require("./routes/authRoutes");

const resumeRoutes =
  require("./routes/resumeRoutes");

// ====================================
// MIDDLEWARE
// ====================================

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);


// ====================================
// STATIC FOLDER
// ====================================

app.use(
  "/uploads",
  express.static(
    path.join(
      __dirname,
      "uploads"
    )
  )
);


// ====================================
// HOME ROUTE
// ====================================

app.get("/", (req, res) => {

  res.send(
    "AI Interview Platform Backend Running"
  );
});


// ====================================
// API ROUTES
// ====================================

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/resume",
  resumeRoutes
);


// ====================================
// MONGODB CONNECTION
// ====================================

mongoose
  .connect(
    process.env.MONGO_URI
  )
  .then(() => {

    console.log(
      "MongoDB Connected Successfully"
    );

  })
  .catch((err) => {

    console.log(
      "MongoDB Connection Error"
    );

    console.log(err.message);

  });


// ====================================
// GLOBAL ERROR HANDLER
// ====================================

app.use(
  (
    err,
    req,
    res,
    next
  ) => {

    console.log(
      "Global Server Error:"
    );

    console.log(err.message);

    res.status(500).json({
      success: false,
      message:
        "Internal Server Error",
    });
  }
);


// ====================================
// SERVER
// ====================================

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );
});
