import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { JWT_SECRET } from 'src/utils/constants';

type JwtPayload = {
  id: string;
};

export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    } as StrategyOptions);
  }

  async validate(payload: JwtPayload) {
    return payload;
  }
}