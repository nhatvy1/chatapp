import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { Response } from 'src/utils/response.type'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { GetCurrentUser } from 'src/decorators/auth.user.decorator'

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  async getUserList(@GetCurrentUser() user: any) {
    const result = await this.userService.findAll(user)
    return Response({
      statusCode: HttpStatus.OK,
      message: 'success',
      result,
    })
  }
}
