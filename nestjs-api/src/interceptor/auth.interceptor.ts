import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Request } from 'express';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private authService: AuthService) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers?.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private isRabbitMQMessage(request: Request): boolean {
    // TODO: is request from RabbitMQ? adapt logic
    return request.headers?.['x-rabbitmq-message'] === 'true';
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: Request = context.switchToHttp().getRequest();

    if (this.isRabbitMQMessage(req)) {
      // TODO: logic for rabbitmq credentials
      return next.handle().pipe();
    } else {
      const token = this.extractTokenFromHeader(req);

      if (token) {
        const { userId, username } = this.authService.decodeToken(token);
        req.sessionData = { userId, username };
      }
    }

    return next.handle().pipe();
  }
}
