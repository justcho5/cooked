import dotenv from "dotenv";
dotenv.config();

const { PORT } = process.env;
const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

// export environment variables
export { PORT, MONGODB_URI };
