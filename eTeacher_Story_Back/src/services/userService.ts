import { TwinoidUser } from "../models/twinoidUser"
import { AppDataSource } from "../data-source";

export function login(username: string, password: string){
    return AppDataSource.getRepository(TwinoidUser).findOne({
        where: {
            "username":username,
            "password":password
        }
    })
}