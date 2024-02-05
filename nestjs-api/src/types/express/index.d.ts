import { SessionData } from 'src/auth/dto/auth.dto';

export {};

declare global {
  namespace Express {
    export interface Request {
      sessionData?: SessionData;
    }
  }
}
