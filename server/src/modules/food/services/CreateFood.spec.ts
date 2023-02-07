import { describe, expect, beforeEach, it } from 'vitest';
import CreateFoodService from './CreateFood';
import FakeFoodsRepo from '../repository/fakes/FakeFoodRepository';
import FakeRedisCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeRedisCacheProvider";

let createFoodService: CreateFoodService;
let fakeFoodsRepo: FakeFoodsRepo;
let fakeRedisCacheProvider: FakeRedisCacheProvider;

describe('creating a new food', () => {
    beforeEach(() => {
        fakeFoodsRepo = new FakeFoodsRepo;   
        fakeRedisCacheProvider = new FakeRedisCacheProvider;

        createFoodService = new CreateFoodService(
            fakeFoodsRepo,
            fakeRedisCacheProvider  
        );
    });

    it('should be able to create a new food', async() => {
        const food = await createFoodService.execute({
          name: 'Batata chips',
          brand: 'Pringles',
          portion_size: '100 gramas',
          portion: 1,
          calories: 300,
          extra_information: {}
        });

        expect(food).toHaveProperty('id');
    });
});