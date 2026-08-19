const dbUrl = process.env.DATABASE_URL as string
if (!dbUrl) {
    throw new Error("DATABASE_URL not defined, verify the environment")
}
export default dbUrl