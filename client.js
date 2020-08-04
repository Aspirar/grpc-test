const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('./service.proto', {
	keepCase: true,
	longs: String,
	enums: String,
	defaults: true,
	oneofs: true,
});
const helloworldProto = grpc.loadPackageDefinition(packageDefinition).helloworld;

async function run() {
	const client = new helloworldProto.Greeter('localhost:50051', grpc.credentials.createInsecure());
	const user = process.argv.length >= 3 ? process.argv[2] : 'World';
	client.sayHello({ name: user }, (err, response) => {
		console.log('Greeting:', response.message);
	});
}

run();
