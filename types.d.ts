type ServerResponse<T> =
    { successMessage: string, data: T; status: "Success"; statusCode: number } |
    { errorMessage: string; status: "Error"; statusCode: number };

type Metadata<T extends object> = {
    [K in keyof T]: T[K];
} & {
    metadata: {
        hasNextPage: boolean;
        totalPages: number;
    };
};

type Info = {
    count: number,
    pages: number,
    next: string,
    prev: string
}

type Character = {
    id: number,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    origin: {
        name: string,
        url: string
    },
    location: {
        name: string,
        url: string
    },
    image: string,
    episode: string[],
    url: string,
    created: string
}

type Result = {
    info: Info,
    results: Character[]
}