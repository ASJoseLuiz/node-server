import { randomUUID } from "node:crypto";
export class DatabaseMemory {

    #videos = new Map()

    create(video) {
        const id = randomUUID()

        this.#videos.set(id, video)
    }

    update(id, video) {
        this.#videos.set(id, video)
    }

    delete(id, video) {
        this.#videos.delete(id)
    }

    list(search) {
        return Array.from(this.#videos.entries())
        .map(([id, data]) => ({
            id,
            ...data,
        }))
        .filter(video => {
            if (search) {
                return video.title.includes(search);
            }
            return true;
        });
    }
}