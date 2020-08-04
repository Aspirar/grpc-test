const { expect } = require('chai');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

let client;

before(() => {
	const packageDefinition = protoLoader.loadSync('./service.proto', {
		keepCase: true,
		longs: String,
		enums: String,
		defaults: true,
		oneofs: true,
	});
	const helloworldProto = grpc.loadPackageDefinition(packageDefinition).helloworld;
	client = new helloworldProto.Greeter('localhost:50051', grpc.credentials.createInsecure());
});

describe('gRPC server', () => {
	it('returns greeting', (done) => {
		client.sayHello({ name: 'test' }, (err, response) => {
			if (err) return done(err);
			expect(response.message).to.equal('Hello test');
			done();
		});
	});
});
