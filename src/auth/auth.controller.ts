import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UserDto } from './dto/register.dto';
import { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './getuser.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ){}

    @Post('register')
    async createUser(@Body() userDto: UserDto){
        return this.authService.createUser(userDto)
    }
    @Post('login')
    async userLogin(@Body() loginDto: LoginDto, @Res({passthrough: true}) response: Response){
        return this.authService.userLogin(loginDto, response)
    }

    @Post('test')
    @UseGuards(AuthGuard())
    async test(@Req() request: Request){
        console.log(request.user);
    }

    @Get('user')
    @UseGuards(AuthGuard())
    async getUser(@GetUser() user: User){
        return user;
    }











    // @Post('logout')
    // async userLogout(@Res({passthrough: true}) response: Response){
    //     return this.authService.userLogout(response);
    // }

    // @Get('user')
    // async getUser(@Req() request: Request){
    //     return this.authService.getUser(request);
    // }

}
