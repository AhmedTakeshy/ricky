"use server"

type Props = {
    page: string
    status?: string
    gender?: string
}

export async function getAllCharacters({ page, gender, status }: Props): Promise<ServerResponse<Result>> {
    const pageNum = page ? page : '1';
    const url = `${process.env.API_BASE_URL}?page=${pageNum}${gender ? `&gender=${gender}` : ''}${status ? `&status=${status}` : ''}`;

    try {
        const response = await fetch(url);
        const data: Result = await response.json();
        if (!response.ok) {
            return {
                errorMessage: 'Failed to fetch characters',
                status: 'Error',
                statusCode: 500
            };
        }
        return {
            successMessage: 'Characters fetched successfully',
            data: data,
            status: 'Success',
            statusCode: 200
        };
    } catch (error) {
        return {
            errorMessage: (error as Error).message,
            status: 'Error',
            statusCode: 500
        };
    }
}