import { connect, ConnectOptions, set } from "mongoose";

export async function connectMongoDB(): Promise<void> {
    set(`strictQuery`, false);
    await connect(process.env.DATABASE_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions).then((c) => {
        console.info(
            `\x1b[32m%s\x1b[0m`,
            "[ Database ]",
            `> Connected to DB ${c.connection.name}!`
        );
    });
}
