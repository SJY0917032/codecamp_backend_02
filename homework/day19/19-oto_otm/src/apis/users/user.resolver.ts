import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateUserInput } from "./dto/createUserInput";
import { UpdateUserInput } from "./dto/updateUserInput";
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";

@Resolver()
export class UserResolver {
    constructor(private readonly userService: UserService){}

    @Query(() => [User])
    async fetchUsers(){
        return await this.userService.findAll()
    }
    @Query(() => [User])
    async fetchUsersWithDeleted(){
        return await this.userService.findAllWithDeleted()
    }

    @Query(() => User)
    async fetchUser(
        @Args('userId') userId: string,
    ){
        return await this.userService.find({userId})
    }

    @Mutation(() => User)
    async createUser(
        @Args('createUserInput') createUserInput: CreateUserInput
    ){
        return await this.userService.create({createUserInput})
    }

    @Mutation(() => User)
    async updateUser(
        @Args('userId') userId: string,
        @Args('updateUserInput') updateUserInput: UpdateUserInput,
    ){
        await this.userService.checkIsDeleted({userId})
        return this.userService.update({userId, updateUserInput})
    }

    @Mutation(() => User)
    async restoreUser(
        @Args('userId') userId: string,//
    ){
        await this.userService.checkIsDeleted({userId})
        return this.userService.restore({userId})
    }

    @Mutation(() => Boolean)
    async deleteUser(
        @Args('userId') userId: string, //
    ){
        return this.userService.delete({userId})
    }

}