import { connect, ConnectOptions, set } from "mongoose";

export default async function connectMongoDB(): Promise<void> {
    set(`strictQuery`, false);
    const c = await connect(process.env.DATABASE_URI!);
    console.info(
        `\x1b[32m%s\x1b[0m`,
        "[ Database ]",
        `> Connected to DB ${c.connection.name}!`
    );
}
