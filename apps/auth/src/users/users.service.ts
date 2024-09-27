import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateUserDto, PaginationDto, UpdateUserDto, User, Users } from '@app/common';
import { Observable, Subject } from 'rxjs';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService implements OnModuleInit {
    private readonly users: User[] = [];

    onModuleInit() {}

    create(createUserDto: CreateUserDto): User {
        const user: User = {
            ...createUserDto,
            subscribed: false,
            socialMedia: {},
            id: randomUUID(),
        };
        this.users.push(user);
        return user;
    }

    findAll(): Users {
        return { users: this.users };
    }

    findOne(id: string) {
        return this.users.find((o) => o.id === id);
    }

    update(id: string, updateUserDto: UpdateUserDto): User {
        const index = this.users.findIndex((o) => o.id === id);
        if (index < 0) throw new NotFoundException(`User not found by id: ${id}.`);
        this.users[index] = { ...this.users[index], ...updateUserDto, id };
        return this.users[index];
    }

    remove(id: string): User {
        const index = this.users.findIndex((o) => o.id === id);
        if (index < 0) throw new NotFoundException(`User not found by id: ${id}.`);
        const deleted = this.users.splice(index, 1);
        return deleted[0];
    }

    queryUsers(paginationDtoStream: Observable<PaginationDto>): Observable<Users> {
        const subject = new Subject<Users>();
        const onNext = (paginationDto: PaginationDto) => {
            const start = paginationDto.page * paginationDto.skip;
            subject.next({
                users: this.users.slice(start, start + paginationDto.skip),
            });
        };
        const onComplete = () => subject.complete();
        paginationDtoStream.subscribe({
            next: onNext,
            complete: onComplete,
        });
        return subject.asObservable();
    }
}
