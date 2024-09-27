# NestJS gRPC project

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
npm i -g @nestjs/cli@latest
npx nest new nestjs-grpc
cd nestjs-grpc
npx nest g app auth
mv ./apps/nestjs-grpc ./apps/api-gateway
npx nest g resource users
npm i --save @nestjs/microservices
npm i --save @grpc/grpc-js @grpc/proto-loader
npm i --save ts-proto
sudo apt install -y protobuf-compiler
npm install @bufbuild/buf
npx nest g lib common
npx nest g resource users apps/api-gateway/src
```

## Codegen

``` bash
protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=./ --ts_proto_opt=nestJs=true ./proto/auth.proto
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## References

[**gRPC** - gRPC framework](https://grpc.io/)
[**gRPC** - NestJS gRPC Microservices Tutorial - YouTube](https://www.youtube.com/watch?v=UkWcjVWs2UQ)
[**gRPC** - NestJS gRPC Microservices Tutorial - GitHub](https://github.com/mguay22/nestjs-grpc/tree/main)
[**gRPC** - Getting hands-on gRPC client generation for typescript](https://medium.com/@heartfor.it/getting-hands-on-grpc-client-generation-for-typescript-fed50b4ebe2b)
[**Protobuf** - Protobuf — не только сериализация. Генерация кода и другие прикладные аспекты](https://dou.ua/lenta/articles/protobuf-guide/)
