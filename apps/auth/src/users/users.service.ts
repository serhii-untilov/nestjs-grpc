import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, User } from '@app/common';

@Injectable()
export class UsersService {
    private readonly users: User[] = [];
    private _nextId: number = 0;

    public get nextId() {
        this._nextId++;
        return this._nextId;
    }

    create(createUserDto: CreateUserDto) {
        const user: User = {
            ...createUserDto,
            refreshToken: '',
            isActive: true,
            socialMedia: {},
            id: this.nextId,
        };
        this.users.push(user);
        return user;
    }

    findAll() {
        return `This action returns all users`;
    }

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
