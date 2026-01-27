import allowedOrigins from "./allowedOrigins.js";

export const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      // Allow requests with no origin 
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
