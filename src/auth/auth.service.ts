import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/register.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly userRepo: Repository<User>,
        private jwtService: JwtService
    ){}

    async createUser(userDto: UserDto){

        const {firstname, lastname, email, password} = userDto;
        const hashedPasword = await bcrypt.hash(password, 12);
        
        const newUser = new User();

        newUser.FirstName = firstname;
        newUser.LastName = lastname;
        newUser.Email = email;
        newUser.Password = hashedPasword;

        return await this.userRepo.save(newUser);
    }

    async userLogin(loginDto: LoginDto, response: Response): Promise<User>{
        const { email, password} = loginDto;

        //console.log(email);
        const userFound = await this.userRepo.findOne({Email: email});

        if(!userFound){
            throw new NotFoundException('Email does not exists');
        }

        const passwordFound = await bcrypt.compare(password, userFound.Password);
        if(!passwordFound){
            throw new NotFoundException('Password does not match');
        }
        const payload = { email: userFound.Email, id: userFound.UserId };
        const jwtToken = await this.jwtService.signAsync(payload);
        response.cookie('jwt', jwtToken, {httpOnly: true});

        return userFound;


    }

    async userLogout(response: Response){
        response.clearCookie('jwt');
        return 'Logout Successfully';
    }

    async getUser(request: Request){
        const cookie = request.cookies['jwt'];
        const cookieData = this.jwtService.verifyAsync(cookie);
        const userData = this.userRepo.findOne(cookieData['sub']);
        return userData;
    }




}
