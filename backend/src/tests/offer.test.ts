import { getOffer, createOffer } from '../controllers/offers';
import { rating } from '../controllers/offers';
import offerModel from '../models/offer';
import * as OffersController from '../controllers/offers';
import { MongoClient } from 'mongodb';
//import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import UserModel from '../models/user';
import httpMocks from 'node-mocks-http';

describe('User Test', () => {
	let connection;
	let db;
	const uri =
		'mongodb+srv://gruiz031:U0WUKyxlFU1M0hgD@cluster0.cacviy0.mongodb.net/ucr_list?retryWrites=true&w=majority';

	beforeAll(async () => {
		connection = await MongoClient.connect(uri);
		db = await connection.db('ucr_list');
	});

	afterAll(async () => {
		await connection.close();

	});

	it('Get Offer Test', async () => {
		const request = httpMocks.createRequest({
			session: {
				userId: 'gruiz031@ucr.edu',
			},
		});
		const response = httpMocks.createResponse();
		const next = jest.fn();
		await getOffer(request, response, next);
		//console.log(response);
		expect(response.statusCode).toBe(200);
	});

	it('Create Offer Test', async () => {
		const request = httpMocks.createRequest({
			method: 'POST',
			url: '/offers',
			body: {
				title: 'Create Mock Offer',
				username: 'Mock User',
				description: 'Mock Offer Description',
				imgURL: '',
				price: '55',
				category: '',
			},
			session: {
				userId: 'skang121@ucr.edu',
			},
		});
		console.log(request);

		const response = httpMocks.createResponse();
		const next = jest.fn();
		await createOffer(request, response, next);
		// console.log(response);
		// console.log(request);
		expect(response.statusCode).toBe(200);
	});
});
	describe('Rating Test', () => {
		let connection;
		const uri =
		'mongodb+srv://gruiz031:U0WUKyxlFU1M0hgD@cluster0.cacviy0.mongodb.net/ucr_list?retryWrites=true&w=majority';
	
		beforeAll(async () => {
		connection = await MongoClient.connect(uri);
		});
	
		afterAll(async () => {
		  await connection.close();

	});
  
	it('Add new rating', async () => {
  const request = httpMocks.createRequest({
			method: 'PUT',
			url: '/offers/rating',
			body: {
			star: 4,
			comment: 'Good product',
			offerId: '641200397bc49cb4936f9236',
			postUsername: 'MockUser'
		 	},
			session: {
		 		 userID: 'c@gmail.com',
			},
		  });
	  
		  const response = httpMocks.createResponse();
		  const next = jest.fn();
		  await rating(request, response, next);
		  expect(response.statusCode).toBe(200);
		}, 700000);
	  
		it('Update existing rating', async () => {
		  const request = httpMocks.createRequest({
			method: 'PUT',
			url: '/offers/rating',
			body: {
			  star: 5,
			  comment: 'Excellent product',
			  offerId: '640d291b7353b7b93125a701',
			  postUsername: 'MockUser'
			},
			session: {
			  userID: 'c@gmail.com',
			},
		  });
	  
		  const response = httpMocks.createResponse();
		  const next = jest.fn();
		  await rating(request, response, next);
		  expect(response.statusCode).toBe(200);
		}, 700000);
	  
		it('Invalid offerId', async () => {
		  const request = httpMocks.createRequest({
			method: 'PUT',
			url: '/offers/rating',
			body: {
			  star: 4,
			  comment: 'Good product',
			  offerId: 'invalid_offer_id',
			  postUsername: 'MockUser'
			},
			session: {
			  userID: 'c@gmail.com',
			},
		  });
	  
		  const response = httpMocks.createResponse();
		  const next = jest.fn();
		  await rating(request, response, next);
		  expect(next).toHaveBeenCalledWith(expect.objectContaining({
			message: 'Invalid offer id',
			status: 400
		  }));
		});
	  
	 });