import pino from "pino";
import pkg from "../../../package.json";
import { isDev } from "../../config/keys";

export const logger = pino({
    name: pkg.name,
    timestamp: true,
    level: "info",
    formatters: {
        level(l) {
            return { level: l };
        },
    },
    prettyPrint: isDev,
    redact: {
        paths: [
            "req.body.otp",
            "req.body.password",
            "req.headers.authorization",
        ],
        censor: "**CURSED**",
    },
});
