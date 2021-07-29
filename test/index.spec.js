import app from '../src/index';
import request from 'supertest';
import config from './configtest';
import jwt_decode from 'jwt-decode';

const getRandomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min)) + min;
};

let token = '';
let requirement_id = '';

describe('POST /auth/signup', function () {
	it('response with json with a token and status 200', (done) => {
		request(app)
			.post('/auth/signup')
			.send({
				username: config.TEST_USER + getRandomInt(1, 1000),
				password: config.TEST_PASSWORD,
				name: config.TEST_NAME + ' ' + getRandomInt(1, 1000),
				pictureUrl: config.TEST_PICTURE_URL,
			})
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err, res) => {
				if (err) return done(err);
				token = res.body.token;
				done();
			});
	});
});

describe('POST /auth/signin', function () {
	it('response with json with a token and status 200', (done) => {
		request(app)
			.post('/auth/signin')
			.send({
				username: config.TEST_USER,
				password: config.TEST_PASSWORD,
			})
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200, done);
	});
});

describe('GET /requirements', function () {
	it('response with json container a list of all requirements', (done) => {
		request(app)
			.get('/requirements')
			.set('Accept', 'application/json')
			.set('x-access-token', token) //config.TEST_TOKEN
			.expect('Content-Type', /json/)
			.expect(200, done);
	});
});

describe('POST /requirements', function () {
	it('response with status 201 on success', (done) => {
		request(app)
			.post('/requirements')
			.send({
				title: 'Test requirement',
				description: 'Test requirement description',
				author_id: jwt_decode(token).id,
			})
			.set('Accept', 'application/json')
			.set('x-access-token', token)
			.expect('Content-Type', /json/)
			.expect(201)
			.end((err, res) => {
				if (err) return done(err);
				requirement_id = res.body._id;
				done();
			});
	});
});

describe('GET /requirements/:requirementId', function () {
	it('response with json containing a single requirement', (done) => {
		request(app)
			.get(`/requirements/${requirement_id}`)
			.set('Accept', 'application/json')
			.set('x-access-token', token)
			.expect('Content-Type', /json/)
			.expect(200, done);
	});

	/* it('response with json "Requirement not found - status 404"', (done) => {
		request(app)
			.get(`/requirements/${requirement_id.slice(0, -1) + '1'}`)
			.set('Accept', 'application/json')
			.set('x-access-token', token)
			.expect('Content-Type', /json/)
			.expect(404)
			.expect('"Requirement not found"')
			.end((err) => {
				if (err) return done(err);
				done();
			});
	}); */
});

describe('GET /comments/byrequirementid/:requirement_id', function () {
	it('response with json containing a list of comments for requirement_id', (done) => {
		request(app)
			.get(`/comments/byrequirementid/${requirement_id}`)
			.set('Accept', 'application/json')
			.set('x-access-token', token)
			.expect('Content-Type', /json/)
			.expect(200, done);
	});
});

describe('POST /comments', function () {
	it('response with status 200 on success and JSON with saved comment', (done) => {
		request(app)
			.post('/comments')
			.send({
				author_id: jwt_decode(token).id,
				requirement_id: `${requirement_id}`,
				comment: 'Test comment test',
			})
			.set('Accept', 'application/json')
			.set('x-access-token', token)
			.expect('Content-Type', /json/)
			.expect(201)
			.end((err, res) => {
				if (err) return done(err);
				requirement_id = res.body._id;
				done();
			});
	});
});

describe('GET /votes/byrequirement/:requirement_id', function () {
	it('response with json containing a list of votes for requirement_id', (done) => {
		request(app)
			.get(`/votes/byrequirement/${requirement_id}`)
			.set('Accept', 'application/json')
			.set('x-access-token', token)
			.expect('Content-Type', /json/)
			.expect(200, done);
	});
});

describe('POST /votes', function () {
	it('response with status 200 on success and JSON with saved votes', (done) => {
		request(app)
			.post('/votes')
			.send({
				author_id: jwt_decode(token).id,
				requirement_id: `${requirement_id}`,
			})
			.set('Accept', 'application/json')
			.set('x-access-token', token)
			.expect('Content-Type', /json/)
			.expect(201, done);
	});
});
