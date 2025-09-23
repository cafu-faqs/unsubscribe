const { Redis } = require('@upstash/redis');

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Vercel serverless function to handle unsubscribe requests
module.exports = async function handler(req, res) {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(200, corsHeaders);
    return res.end();
  }

  // Add CORS headers to all responses
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Log the unsubscribe request
    console.log(`Unsubscribe request received for email: ${email}`);

    const timestamp = new Date().toISOString();
    const unsubscribeData = {
      email,
      timestamp,
      status: 'unsubscribed'
    };

    // Store email in Redis hash
    await redis.hset('unsubscribed_emails', {
      [email]: JSON.stringify(unsubscribeData)
    });

    // Add to sorted set for time-based queries
    await redis.zadd('unsubscribe_timeline', {
      score: Date.now(),
      member: email
    });

    return res.status(200).json({ 
      success: true,
      message: `Successfully unsubscribed ${email}`,
      timestamp
    });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    // Log detailed error for debugging
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      email: req.body?.email
    });
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
