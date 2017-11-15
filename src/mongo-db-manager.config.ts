let mongoDbStringConfig = process.env.QSDT_MONGO_STR || "mongodb://localhost";
export const mongoDBConnection = mongoDbStringConfig;