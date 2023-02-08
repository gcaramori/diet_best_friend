import UpdateFoodService from "./UpdateFood";
import CreateFoodService from "./CreateFood";
import FakeFoodsRepo from "../repository/fakes/FakeFoodRepository";
import FakeRedisCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeRedisCacheProvider";
import { describe, expect, beforeEach, it } from 'vitest';

let updateFoodService: UpdateFoodService;
let createFoodService: CreateFoodService;
let fakeFoodsRepo: FakeFoodsRepo;
let fakeRedisCacheProvider: FakeRedisCacheProvider;

describe('updating a existing food', () => {
    beforeEach(() => {
        fakeFoodsRepo = new FakeFoodsRepo;
        fakeRedisCacheProvider = new FakeRedisCacheProvider;

        createFoodService = new CreateFoodService(
            fakeFoodsRepo,
            fakeRedisCacheProvider
        );
        updateFoodService = new UpdateFoodService(
            fakeFoodsRepo,
            fakeRedisCacheProvider
        );
    });

    it('should be able to update a food', async() => {
        const createdFood = await createFoodService.execute({
            name: 'Batata chips',
            brand: 'Pringles',
            portion_size: '100 gramas',
            portion: 1,
            calories: 300,
            extra_information: {}
        })

        const updatedFood = await updateFoodService.execute({
            id: createdFood?.id,
            payload: {
                brand: "Elma Chips"
            }
        });

        expect(updatedFood.brand).not.toBe('Pringles');
    });
});