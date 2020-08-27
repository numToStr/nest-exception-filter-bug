declare const process: {
    env: Record<string, string>;
};

export const { PORT = 5000, NODE_ENV } = process.env;

export const isDev = NODE_ENV === "development";
export const isProd = NODE_ENV === "production";
