import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AuthMiddleware } from "../utils/middlewares/auth.middleware";
import { AppController } from "./app.controller";

@Module({
    controllers: [AppController],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer): MiddlewareConsumer {
        return consumer.apply(AuthMiddleware).forRoutes(AppController);
    }
}
