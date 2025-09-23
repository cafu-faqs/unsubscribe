# CAFU Email Unsubscribe System

A system for handling email unsubscribe requests for CAFU marketing emails.

## Features

- Unsubscribe page with email validation
- Redis-based storage of unsubscribed emails
- API endpoint for processing unsubscribe requests
- CORS support for cross-origin requests
- Error handling and user feedback
- Test endpoint for verifying system health

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your Upstash Redis credentials:
   ```
   UPSTASH_REDIS_REST_URL=your_redis_url
   UPSTASH_REDIS_REST_TOKEN=your_redis_token
   ```

4. For local development:
   ```bash
   npm run dev
   ```

## Deployment

1. Install Vercel CLI if not already installed:
   ```bash
   npm i -g vercel
   ```

2. Deploy to Vercel:
   ```bash
   vercel deploy --prod
   ```

3. Add environment variables in Vercel project settings:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

## Testing

1. Test API Health:
   ```
   GET /api/test
   ```
   This endpoint verifies both API functionality and Redis connection.

2. Test Unsubscribe Flow:
   - Visit `/unsubscribe?email=test@example.com`
   - Click "Confirm Unsubscribe"
   - Verify success message

## API Endpoints

### GET /api/test
Test endpoint to verify API and Redis connection.

Response:
```json
{
  "success": true,
  "message": "API and Redis connection working",
  "test": {
    "written": "timestamp",
    "retrieved": "timestamp",
    "match": true
  }
}
```

### POST /api/unsubscribe
Endpoint to process unsubscribe requests.

Request body:
```json
{
  "email": "user@example.com"
}
```

Response:
```json
{
  "success": true,
  "message": "Successfully unsubscribed user@example.com",
  "timestamp": "ISO timestamp"
}
```

## Email Template Integration

The unsubscribe link in email templates should use the following format:
```html
https://your-vercel-domain.vercel.app/unsubscribe?email=%%EMAIL%%
```

Replace `%%EMAIL%%` with your email service's variable for the recipient's email address.

## Error Handling

The system includes comprehensive error handling:
- Invalid email validation
- Redis connection issues
- API errors
- User feedback for all error states

## Data Storage

Unsubscribed emails are stored in Redis using:
- Hash set: `unsubscribed_emails` for quick lookups
- Sorted set: `unsubscribe_timeline` for time-based queries

## Security

- CORS headers for API protection
- Environment variables for sensitive data
- Input validation for email addresses
- Error message sanitization in production

## Monitoring

Monitor the system using:
1. Vercel deployment logs
2. Redis metrics in Upstash dashboard
3. API test endpoint for health checks
