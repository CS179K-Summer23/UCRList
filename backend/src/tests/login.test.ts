import request from 'supertest';
import app from '../app'; 
import { MongoClient } from 'mongodb';
import httpMocks from 'node-mocks-http';
import {usersignup} from '../controllers/user'

interface loginBody {
	email: string;
	password: string;
}

describe('User Router', () => {
  describe('POST /api/user/login', () => {
    it('should return 400 with missing email or password', async () => {
        // define the login request body with missing email
        const loginRequestBody: loginBody = {
          email: "",
          password: "test1234"
        };
  
        // make a POST request to the login endpoint with missing email
        const response1 = await request(app)
          .post('/api/user/login')
          .send(loginRequestBody)
          .expect(400);

          expect(response1.body).toMatchObject({"error": "Missing email or password"});

      // define the login request body with missing password
      const loginRequestBody2: loginBody = {
        email: "test@test.com",
        password: ""
      };

      // make a POST request to the login endpoint with missing password
      const response2 = await request(app)
        .post('/api/user/login')
        .send(loginRequestBody2)
        .expect(400);

      expect(response2.body).toMatchObject({"error": "Missing email or password"});
    });

  });
});

interface signUpBody{
  username: string,
  email: string,
  password: string
}

describe('User Router', () => {
  describe('POST /api/user/signup', () => {
    it('should return 400 with Please enter username, email, or password', async () => {
        // define the login request body with missing email
        const signUpRequestBody: signUpBody = {
          username: "",
          email: "",
          password: ""
        };
  
        // make a POST request to the signup endpoint with missing parameters
        const response1 = await request(app)
          .post('/api/user/signup')
          .send(signUpRequestBody)
          .expect(400);

          expect(response1.body).toMatchObject({"error": "Please enter username, email, or password"});
      });
      // define the signup request body with missing username
    it('should return 400 with Please enter username, email, or password', async () => {
        const signUpRequestBody2: signUpBody = {
          username: "",
          email: "test@test.com",
          password: "newuser"
        };

        // make a POST request to the login endpoint with missing password
        const response2 = await request(app)
          .post('/api/user/signup')
          .send(signUpRequestBody2)
          .expect(400);

        expect(response2.body).toMatchObject({"error": "Please enter username, email, or password"});
    });
  });
});

/*interface signUpBody{
  username: string,
  email: string,
  password: string
}

describe('User Router', () => {
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
  
  describe('POST /api/user/signup', () => {
    it('Signup existing username', async () => {
      const request = httpMocks.createRequest({
        method: 'POST',
        url: '/user/signup',
        body: {
          username: "Kenneth",
          email: "test@test.com",
          password: "newuser"
        },

      });
      console.log(request);

      const response = httpMocks.createResponse();
      const next = jest.fn();

      await usersignup(request, response, next);
      expect(response.statusCode).toBe(409);
  },7000000);
  });
});*/