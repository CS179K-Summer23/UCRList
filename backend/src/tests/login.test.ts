import request from 'supertest';
import app from '../app'; 

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