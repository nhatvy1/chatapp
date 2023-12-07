import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { RegisterDto } from './dto/register.dto'
import { AuthService } from './auth.service'
import { Response } from 'src/utils/response.type'
import { LoginDto } from './dto/login.dto'
import { JwtRefreshGuard } from './guards/jwt-auth-refresh.guard'
import { GetCurrentUser } from 'src/decorators/auth.user.decorator'
import { TokenVerify } from './interfaces/token.interface'
import { FileInterceptor } from '@nestjs/platform-express'
import { Request } from 'express'
import { CloudinaryService } from '../cloudinary/cloudinary.service'

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('avatar'))
  async register(
    @UploadedFile() avatar: Express.Multer.File,
    @Body() body: RegisterDto,
  ) {
    const result = await this.authService.register(body, avatar)
    return Response({ statusCode: HttpStatus.OK, message: 'Success', result })
  }

  @Post('login')
  async login(@Body() signInDto: LoginDto) {
    const result = await this.authService.login(signInDto)
    return Response({ statusCode: HttpStatus.OK, message: 'Success', result })
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh-token')
  refreshToken(
    @GetCurrentUser('refreshToken')
    tokenVerify: TokenVerify,
  ) {
    return this.authService.refreshToken(tokenVerify)
  }

  @Post('upload-file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const { name, password } = req.body
    try {
      const resultImage = await this.cloudinaryService.uploadImage(file)
      return { msg: 'thanh cong', result: resultImage }
    } catch (e) {
      console.log(e)
      return { msg: 'That bai' }
    }
  }
}
