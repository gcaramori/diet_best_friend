import { describe, expect, beforeEach, it } from 'vitest';
import FakeFoodsRepo from '../repository/fakes/FakeFoodRepository';
import CreateFoodService from './CreateFood';
import ListAllFoodsService from './ListAllFoods';
import FakeRedisCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeRedisCacheProvider";

let fakeFoodsRepo: FakeFoodsRepo;
let fakeCacheProvider: FakeRedisCacheProvider;
let createFoodService: CreateFoodService;
let listAllFoodsService: ListAllFoodsService;

describe('list all foods', () => {
    beforeEach(() => {
        fakeFoodsRepo = new FakeFoodsRepo;
        fakeCacheProvider = new FakeRedisCacheProvider;

        createFoodService = new CreateFoodService(
            fakeFoodsRepo,
            fakeCacheProvider
        );
        listAllFoodsService = new ListAllFoodsService(
            fakeFoodsRepo,
            fakeCacheProvider
        );
    });

    it('should be able to list all foods', async () => {
        const iterable = Array.from({ length: 5 }, (_, index) => index);

        const foods = await Promise.all(
            iterable.map(async index =>
                createFoodService.execute({
                    name: `Food_${index}`,
                    brand: 'FoodBrand',
                    portion_size: '100 gramas',
                    portion: 1,
                    calories: 300,
                    extra_information: {
                        vitamin_a: 1000
                    }
                })
            )
        );

        const allFoods = await listAllFoodsService.execute();
        
        expect(allFoods).toEqual(foods);
    });
});