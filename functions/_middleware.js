export async function onRequest(context) {
  // Test: Force redirect to verify middleware is working
  return Response.redirect('https://igrs.online/test-middleware-working', 301);
}
