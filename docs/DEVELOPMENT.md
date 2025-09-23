# CAFU Email Unsubscribe System Development Guide

This guide provides detailed information for developers who want to extend, modify, or maintain the CAFU Email Unsubscribe System.

## Development Environment Setup

### Prerequisites

1. Node.js and npm
   - Install Node.js LTS version
   - Verify installation:
     ```bash
     node --version
     npm --version
     ```

2. Code Editor
   - Recommended: Visual Studio Code
   - Useful extensions:
     - ESLint
     - Prettier
     - Redis
     - Thunder Client (for API testing)

3. Redis Tools
   - Upstash Redis Dashboard access
   - Redis CLI (optional for local testing)

### Local Development

1. Clone and Setup
   ```bash
   git clone [repository-url]
   cd [repository-name]
   npm install
   ```

2. Environment Configuration
   ```bash
   cp .env.sample .env
   ```
   Edit `.env` with your credentials:
   ```
   UPSTASH_REDIS_REST_URL=your_redis_url
   UPSTASH_REDIS_REST_TOKEN=your_redis_token
   ```

3. Start Development Server
   ```bash
   npm run dev
   ```

## Project Structure

### Key Files and Their Purposes

```
/
├── api/
│   ├── test.js           # Health check endpoint
│   └── unsubscribe.js    # Main unsubscribe logic
├── docs/                 # Documentation
├── unsubscribe.html     # Frontend interface
├── package.json         # Project configuration
├── vercel.json          # Vercel deployment config
└── .env.sample          # Environment template
```

## Code Organization

### API Endpoints (api/)

Each endpoint is a separate file implementing:
- Request handling
- Input validation
- Business logic
- Error handling
- Response formatting

### Frontend (unsubscribe.html)

The frontend follows a simple structure:
- HTML structure
- Embedded CSS
- Vanilla JavaScript
- No build process required

## Modifying the System

### 1. Adding New API Endpoints

Create a new file in the `api/` directory:

```javascript
// api/new-endpoint.js
const { Redis } = require('@upstash/redis');

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

module.exports = async function handler(req, res) {
  // CORS handling
  if (req.method === 'OPTIONS') {
    res.writeHead(200, corsHeaders);
    return res.end();
  }

  // Add CORS headers
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  try {
    // Your endpoint logic here
    
    return res.status(200).json({
      success: true,
      message: 'Operation successful'
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
};
```

### 2. Modifying Frontend

The unsubscribe page can be customized by:

1. Updating Styles
```css
/* Add to style section */
.custom-class {
  /* Your styles */
}
```

2. Adding New Features
```javascript
// Add to script section
function newFeature() {
  // Your feature code
}
```

3. Modifying HTML Structure
```html
<div class="new-section">
  <!-- New content -->
</div>
```

### 3. Adding Redis Operations

Example of adding new Redis functionality:

```javascript
// Store additional data
await redis.hset('custom_data', {
  [key]: JSON.stringify(data)
});

// Create new sorted set
await redis.zadd('custom_timeline', {
  score: Date.now(),
  member: key
});

// Retrieve data with pattern
const keys = await redis.keys('pattern:*');
```

## Testing

### Manual Testing

1. API Endpoints
```bash
# Test new endpoint
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"key":"value"}' \
  http://localhost:3000/api/new-endpoint
```

2. Frontend
- Access http://localhost:3000/unsubscribe?email=test@example.com
- Test all user interactions
- Verify error handling
- Check responsive design

### Automated Testing

Recommended test structure:

```javascript
// test/api.test.js
describe('API Endpoints', () => {
  describe('POST /api/unsubscribe', () => {
    it('should unsubscribe valid email', async () => {
      // Test implementation
    });

    it('should handle invalid email', async () => {
      // Test implementation
    });
  });
});
```

## Deployment

### 1. Development to Staging

```bash
# Deploy to staging
vercel
```

### 2. Staging to Production

```bash
# Deploy to production
vercel --prod
```

### 3. Environment Management

```bash
# Add new environment variable
vercel env add CUSTOM_VARIABLE

# Remove environment variable
vercel env rm CUSTOM_VARIABLE
```

## Best Practices

### 1. Code Style

- Use consistent indentation (2 spaces)
- Follow ESLint configuration
- Add JSDoc comments for functions
- Use meaningful variable names

### 2. Error Handling

```javascript
try {
  // Operation that might fail
} catch (error) {
  console.error('Context:', {
    operation: 'operationName',
    input: data,
    error: error.message
  });
  throw new Error('User-friendly error message');
}
```

### 3. Redis Operations

- Use appropriate data structures
- Implement retry logic for failures
- Clean up test/temporary data
- Monitor memory usage

### 4. Security

- Validate all inputs
- Sanitize outputs
- Use environment variables
- Implement rate limiting
- Follow CORS best practices

## Monitoring and Debugging

### 1. Logging

```javascript
// Structured logging
console.log('Operation:', {
  type: 'unsubscribe',
  email: email,
  timestamp: new Date().toISOString(),
  success: true
});
```

### 2. Performance Monitoring

- Monitor Redis operations
- Track API response times
- Watch error rates
- Monitor resource usage

### 3. Debugging

- Use Vercel logs
- Check Redis operations
- Verify environment variables
- Test network connectivity

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Add tests
5. Submit pull request

### Commit Messages

Follow conventional commits:
```
feat: add new feature
fix: resolve bug
docs: update documentation
test: add tests
refactor: improve code structure
```

## Support and Resources

- Vercel Documentation: https://vercel.com/docs
- Upstash Redis: https://docs.upstash.com/redis
- Node.js: https://nodejs.org/docs
- Project Issues: [GitHub Issues URL]
