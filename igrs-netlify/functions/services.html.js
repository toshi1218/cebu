export async function onRequest() {
    return new Response("Gone", {
        status: 410,
        headers: { "Content-Type": "text/plain; charset=utf-8" }
    });
}
