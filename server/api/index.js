export default defineEventHandler(async (event) => {
    return { status: 200, body: 'API is up and running!' };
});