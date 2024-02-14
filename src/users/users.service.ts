/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Pedro Lopez',
      email: 'pedro@pedro.com',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'Carmen Lopez',
      email: 'carmen@pedro.com',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Alex Lopez',
      email: 'alex@pedro.com',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'Nerea Lopez',
      email: 'nerea@pedro.com',
      role: 'ENGINEER',
    },
    {
      id: 5,
      name: 'Paula Lopez',
      email: 'paula@pedro.com',
      role: 'ADMIN',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if(rolesArray.length === 0) throw new NotFoundException('User role not found')
      return rolesArray
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if(!user) throw new NotFoundException('User not found')

    return user;
  }

  create(user: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(
    id: number,
    updatedUser: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUser };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
