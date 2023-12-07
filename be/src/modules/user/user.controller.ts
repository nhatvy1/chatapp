import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { Response } from 'src/utils/response.type'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  async getUserList() {
    const result = await this.userService.findAll()
    return Response({
      statusCode: HttpStatus.OK,
      message: 'success',
      result,
    })
  }
}
