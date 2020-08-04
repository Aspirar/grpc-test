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

function sayHello(call, callback) {
	callback(null, { message: `Hello ${call.request.name}` });
}

const server = new grpc.Server();
server.addService(helloworldProto.Greeter.service, { sayHello });
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
	server.start();
});
