import pino from "pino";
// db() should be imported before APP
import { APP } from "./server";
import { PORT } from "../config/keys";
import { logger } from "../utils/fns/logger";

// eslint-disable-next-line
(async () => {
    // When deploying to a Docker (or other type of) container using 0.0.0.0 or :: would be the easiest method for exposing the application.
    await (await APP()).listen(Number(PORT), "::");
})();

function crashHandler(msg: string) {
    return pino.final(logger, (err, finalLogger) => {
        finalLogger.error(err, msg);

        throw err;
    });
}

process.on("uncaughtException", crashHandler("uncaughtException"));

process.on("unhandledRejection", error => {
    crashHandler("unhandledRejection")(error as Error);
});

process.on("SIGINT", error => {
    crashHandler("unhandledRejection")(new Error(error));
});

process.on("SIGTERM", error => {
    crashHandler("unhandledRejection")(new Error(error));
});
