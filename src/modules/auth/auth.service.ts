import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(user: any): Promise<any> {
    const payload = {
      userId: user.userId,
      username: user.username,
      userType: user.userType,

      expertId: user.expertId,
      // expertName: user.expertName,
      expertName: '',
      affiliate: user.affiliate,
      duty: user.duty,
      reviewId: user.reviewId,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
