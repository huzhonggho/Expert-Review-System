import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { jwtConstants } from '../../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('token'),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.userId,
      username: payload.username,
      userType: payload.userType,

      expertId: payload.expertId,
      // expertName: payload.expertName,
      expertName: '',
      affiliate: payload.affiliate,
      duty: payload.duty,
      reviewId: payload.reviewId,
    };
  }
}
