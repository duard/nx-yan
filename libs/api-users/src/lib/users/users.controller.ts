import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getMany(
    @Query()
    query: {
      page: number;
      limit: number;
      sort: string;
      search: string;
      searchBy: string;
    }
  ) {
    return this.userService.getUsers(query);
  }
}
