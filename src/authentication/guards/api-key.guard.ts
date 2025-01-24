import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Validate, validateOrReject } from "class-validator";
import { Observable } from "rxjs";


@Injectable()

export class ApiKeyGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean>{
        const API_KEY = process.env.API_KEY
        const request = context.switchToHttp().getRequest();
        const api_key = request.headers['X-API-KEY'];

        if(!api_key){
            throw new UnauthorizedException('API key not found');
        }

        if (api_key !== API_KEY) {
            throw new UnauthorizedException('Invalid API key');
        }

        return true;
    }
}