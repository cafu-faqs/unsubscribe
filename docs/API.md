# CAFU Email Unsubscribe System API Documentation

## Base URL

For local development:
```
http://localhost:3000
```

For production:
```
https://[your-vercel-domain].vercel.app
```

## Authentication

Currently, the API endpoints do not require authentication. They are protected through CORS policies and input validation.

## Rate Limiting

While there is no explicit rate limiting implemented, it's recommended to implement rate limiting in production to prevent abuse.

## Endpoints

### 1. Unsubscribe Email

Processes an unsubscribe request for a specified email address.

```
POST /api/unsubscribe
```

#### Headers
```
Content-Type: application/json
```

#### Request Body
```json
{
  "email": "user@example.com"
}
```

#### Success Response

**Code**: 200 OK
```json
{
  "success": true,
  "message": "Successfully unsubscribed user@example.com",
  "timestamp": "2023-09-23T09:30:00.000Z"
}
```

#### Error Responses

**Code**: 400 Bad Request
```json
{
  "error": "Email is required"
}
```

**Code**: 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "message": "Error message here",
  "details": "Stack trace (development only)"
}
```

#### Implementation Details

The endpoint:
1. Validates the email format
2. Stores the email in Redis hash set
3. Records the unsubscribe timestamp
4. Returns success/error response

### 2. Health Check

Verifies the API and Redis connection status.

```
GET /api/test
```

#### Success Response

**Code**: 200 OK
```json
{
  "success": true,
  "message": "API and Redis connection working",
  "test": {
    "written": "2023-09-23T09:30:00.000Z",
    "retrieved": "2023-09-23T09:30:00.000Z",
    "match": true
  }
}
```

#### Error Response

**Code**: 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "message": "Error message here",
  "details": "Stack trace (development only)"
}
```

#### Implementation Details

The endpoint:
1. Attempts to write test data to Redis
2. Retrieves the written test data
3. Verifies data integrity
4. Cleans up test data
5. Returns test results

## CORS Configuration

The API implements CORS headers for cross-origin requests:

```javascript
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};
```

## Data Structures

### Redis Schema

1. Unsubscribed Emails Hash
```
Key: unsubscribed_emails
Field: email
Value: {
  "email": "user@example.com",
  "timestamp": "2023-09-23T09:30:00.000Z",
  "status": "unsubscribed"
}
```

2. Unsubscribe Timeline
```
Key: unsubscribe_timeline
Score: timestamp (Unix timestamp)
Member: email
```

## Error Handling

The API implements consistent error handling:

1. Input Validation
   - Email format validation
   - Required field checking

2. Redis Operations
   - Connection errors
   - Operation timeouts
   - Data integrity checks

3. Response Format
   - Success responses include success flag
   - Error responses include error message
   - Development mode includes stack traces

## Testing

### Manual Testing

1. Test unsubscribe endpoint:
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}' \
  http://localhost:3000/api/unsubscribe
```

2. Test health check endpoint:
```bash
curl http://localhost:3000/api/test
```

### Automated Testing

Recommended test cases:

1. Unsubscribe Endpoint
   - Valid email submission
   - Invalid email format
   - Missing email field
   - Duplicate unsubscribe request

2. Health Check Endpoint
   - Redis connection success
   - Redis connection failure
   - Data integrity verification

## Best Practices

1. Error Handling
   - Always validate input
   - Provide meaningful error messages
   - Log errors for debugging
   - Sanitize error details in production

2. Data Management
   - Implement data retention policies
   - Regular backup of unsubscribe data
   - Monitor Redis storage usage
   - Implement cleanup procedures

3. Security
   - Validate email formats
   - Implement rate limiting
   - Use HTTPS in production
   - Monitor for abuse patterns

## Future Enhancements

1. Authentication
   - Add API key authentication
   - Implement request signing
   - Add role-based access control

2. Rate Limiting
   - Implement per-IP rate limits
   - Add retry-after headers
   - Monitor usage patterns

3. Monitoring
   - Add request logging
   - Implement metrics collection
   - Set up alerting system
   - Add performance monitoring
