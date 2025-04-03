import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import {
  validatorCompiler,
  serializerCompiler,
  type ZodTypeProvider,
  jsonSchemaTransform
} from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { createSubscriptionsRoute } from "./routes/createSubscriptionsRoute"
import { env } from "./env";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyCors, {
  origin: "http://localhost:5173",
});

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "API",
      version: "0.0.1",
      description: "API information"
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: "/docs"
})

app.register(createSubscriptionsRoute)


app.listen({ port: env.PORT }).then(() => {
  console.log("🚀 HTTP server is running!");
});
