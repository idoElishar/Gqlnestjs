/* eslint-disable prettier/prettier */
import { CatsResolver } from './cats.resolvers';
import { CatsService } from './cats.service';
import { Model } from 'mongoose';
// import { CatSchema} from './cats.schema';
import { Cat } from './interfaces.ts/cat.interface';

describe('CatsController', () => {
  let usersController;
  let usersService;

  beforeEach(() => {
    const userModel = {} as Model<Cat>;
    usersService = new CatsService(userModel);
    usersController = new CatsResolver(usersService);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      // Arrange
      const expectedUsers = [
        {
            
                "_id": {
                  "$oid": "659cfb12e67c61b0c11fa471"
                },
                "name": "mizi",
                "age": 10,
                "breed": "ello"
              
        },
      ];
      jest
        .spyOn(usersService, 'findAll')
        .mockImplementation(() => expectedUsers);

      // Act
      const actualUsers = await usersController.findAll();

      // Assert
      expect(actualUsers).toEqual(expectedUsers);
    });
  });
});
