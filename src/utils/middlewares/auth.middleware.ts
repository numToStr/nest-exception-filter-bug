import {
    Injectable,
    NestMiddleware,
    ForbiddenException,
    UnauthorizedException,
} from "@nestjs/common";
import { FastifyReply, FastifyRequest } from "fastify";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(
        req: FastifyRequest & { USER: unknown },
        _: FastifyReply,
        next: () => void
    ): void {
        try {
            const header = req.headers.authorization;

            if (!header) {
                throw new ForbiddenException();
            }

            const [, token] = header.split(" ");

            req.USER = token;

            next();
        } catch {
            throw new UnauthorizedException(
                "Unauthorized Access! Please login."
            );
        }
    }
}
