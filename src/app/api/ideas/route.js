import axios from 'axios';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const pageNumber = searchParams.get('page[number]');
  const pageSize = searchParams.get('page[size]');
  const append = searchParams.getAll('append[]');
  const sort = searchParams.get('sort');

  try {
    const response = await axios.get('https://suitmedia-backend.suitdev.com/api/ideas', {
      params: {
        'page[number]': pageNumber,
        'page[size]': pageSize,
        'append[]': append,
        sort,
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch ideas' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}