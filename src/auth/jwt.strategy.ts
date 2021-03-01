import { Injectable, NotFoundException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Repository } from "typeorm";
import { MyJwtPaylod } from "./jwtpayload.interface";
import { User } from "./user.entity";

@Injectable()
export class MyJwtStrategy extends PassportStrategy(Strategy){

    constructor(@InjectRepository(User) private readonly userRepo: Repository<User>){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secret'
        });
    }

     async validate(payload: MyJwtPaylod): Promise<User>{
         const { email, id } = payload;
        const userFound = this.userRepo.findOne(id);
        if(!userFound){
            throw new NotFoundException('User not found')
        }
        return userFound;
    }






}