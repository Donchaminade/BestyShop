// api/tiktok-oembed.ts
// This is a Vercel Serverless Function that acts as a proxy for the TikTok oEmbed API.
// It's needed to bypass CORS restrictions when calling the API from the client-side.

export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request) {
  const { searchParams } = new URL(request.url);
  const videoUrl = searchParams.get('url');

  if (!videoUrl) {
    return new Response(JSON.stringify({ error: 'URL parameter is missing' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const response = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(videoUrl)}`);

    if (!response.ok) {
      throw new Error(`TikTok API responded with status: ${response.status}`);
    }

    const data = await response.json();

    // Add CORS headers to allow client-side access
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Adjust in production if needed
        'Access-Control-Allow-Methods': 'GET',
      },
    });
  } catch (error) {
    console.error('oEmbed fetch error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(JSON.stringify({ error: 'Failed to fetch oEmbed data', details: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
