/* eslint-disable prettier/prettier */
import { CatsResolver } from './cats.resolvers';
import { CatsService } from './cats.service';
import { Model } from 'mongoose';
import { Cat } from './interfaces.ts/cat.interface';

describe('CatsController', () => {
  let catsController;
  let catsService;

  beforeEach(() => {
    const catModel = {} as Model<Cat>;
    catsService = new CatsService(catModel);
    catsController = new CatsResolver(catsService);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      // Arrange
      const expectedCats = [
        {
          _id: {
            $oid: '659cfb12e67c61b0c11fa471',
          },
          name: 'mizi',
          age: 10,
          breed: 'ello',
        },
      ];
      jest.spyOn(catsService, 'findAll').mockImplementation(() => expectedCats);

      // Act
      const actualCats = await catsController.findAll();

      // Assert
      expect(actualCats).toEqual(expectedCats);
    });
  });

  describe('findCatById', () => {
    it('should return a cat by id', async () => {
      // Arrange
      const catId = '659d946898d7fcafc2a067bf';
      const expectedCat = {
        _id: {
          $oid: catId
        },
        name: "mizi",
        age: 10,
        breed: "ello"
      };
      jest.spyOn(catsService, 'findById').mockImplementation(() => expectedCat);

      // Act
      const actualCat = await catsController.cat(catId);

      // Assert
      expect(actualCat).toEqual(expectedCat);
    });
    it('should throw an error for a non-existing cat id', async () => {
        const wrongCatId = 'non-existing-id';
        jest.spyOn(catsService, 'findById').mockImplementation(() => {
          throw new Error('Cat not found');
        });
  
        await expect(catsController.cat(wrongCatId)).rejects.toThrow('Cat not found');
      });
  });
});
