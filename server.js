import { fastify } from "fastify";
import { DatabaseMemory } from "./database-memory.js";

const server = fastify();
const database = new DatabaseMemory();

server.post("/videos", async (request, reply) => {
    
    const { title, description, duration } = request.body

    console.log(request.body)

    database.create({
        title,
        description, 
        duration,
    });

    return reply.status(201).send(); // status code 201: criação de algo
});

server.get("/videos", async (request, reply) => {
    
    const search = request.query.search
    
    const listaDeVideos = database.list(search)

    return listaDeVideos
});

server.put("/videos/:id", async (request, reply) => {
    const videoId = request.params.id
    const { title, description, duration } = request.body

    database.update(videoId, {
        title,
        description,
        duration,
    })

    return reply.status(204).send()
});

server.delete("/videos/:id", async (request, reply) => {
    const videoId = request.params.id

    database.delete(videoId)

    return reply.status(204).send()
});

server.listen({ port: 3333 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log("server listening at address", address);
});


