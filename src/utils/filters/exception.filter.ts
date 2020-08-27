import { FastifyReply } from "fastify";
import {
    Catch,
    ArgumentsHost,
    HttpException,
    UnprocessableEntityException,
} from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    catch(exception: Error, host: ArgumentsHost): unknown {
        // Goal:
        // I need to catch the UnhandledPromiseRejection or any other which are not nestjs exceptions
        // So, I am checking if the excptions are instance of HttpException,
        // If true, then it means that it is a nestjs Exception [https://docs.nestjs.com/exception-filters]
        // else, I am creating a Exception which I am sending to the client
        const h = host.switchToHttp();
        const res = h.getResponse<FastifyReply>();

        // All nestjs exceptions are instanceof HttpException
        // So we can easily delegate those exception to nestjs
        if (exception instanceof HttpException) {
            return super.catch(exception, host);
        }

        // IMPORTANT:
        // If its unknown exception i.e. UnhandledPromiseRejection or FirebaseAuthError

        const r = new UnprocessableEntityException(exception.message);
        const rr = r.getResponse();

        return res.status(r.getStatus()).send(rr);
    }
}
