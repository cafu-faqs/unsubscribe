# CAFU Email Unsubscribe System Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Repository Structure](#repository-structure)
3. [Technology Stack](#technology-stack)
4. [Core Components](#core-components)
5. [Setup & Installation](#setup--installation)
6. [API Documentation](#api-documentation)
7. [Extension Guide](#extension-guide)
8. [Best Practices](#best-practices)
9. [Monitoring & Maintenance](#monitoring--maintenance)
10. [Security Considerations](#security-considerations)

## Project Overview

The CAFU Email Unsubscribe System is a specialized service designed to handle email unsubscribe requests for CAFU marketing emails. This system provides a seamless way for users to opt out of marketing communications while maintaining a reliable record of unsubscribe requests.

### Key Features
- User-friendly unsubscribe page with email validation
- Redis-based storage for efficient data management
- RESTful API endpoints for processing requests
- Comprehensive error handling and user feedback
- Cross-origin request support
- System health monitoring capabilities

## Repository Structure

```
/
├── api/
│   ├── test.js         # Health check endpoint
│   └── unsubscribe.js  # Main unsubscribe endpoint
├── docs/               # Documentation directory
├── unsubscribe.html    # Frontend unsubscribe page
├── package.json        # Project dependencies
├── vercel.json         # Vercel deployment config
└── .env.sample         # Environment variables template
```

## Technology Stack

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript
- Responsive Design

### Backend
- Node.js
- Vercel Serverless Functions
- RESTful API Architecture

### Database
- Upstash Redis
  - Hash sets for email storage
  - Sorted sets for timeline tracking

### Deployment
- Vercel Platform
- Environment Variable Management
- Automated Deployment Pipeline

### Dependencies
```json
{
  "dependencies": {
    "@vercel/node": "^2.15.6",
    "@upstash/redis": "^1.22.0"
  },
  "devDependencies": {
    "vercel": "^31.0.0"
  }
}
```

## Core Components

### 1. Frontend Interface (unsubscribe.html)

The unsubscribe page provides a clean, user-friendly interface with:
- Automatic email extraction from URL parameters
- Real-time validation and feedback
- Responsive design for all devices
- Clear success/error messaging
- CAFU branding integration

### 2. Backend API

#### Unsubscribe Endpoint (/api/unsubscribe)
- Processes POST requests for unsubscribe operations
- Implements email validation
- Manages Redis data storage
- Provides detailed response messages
- Includes comprehensive error handling

#### Test Endpoint (/api/test)
- Performs system health checks
- Validates Redis connectivity
- Tests data operations
- Returns detailed status information

### 3. Data Storage Architecture

The system uses two Redis data structures:

1. Hash Set (unsubscribed_emails)
   - Key: email address
   - Value: JSON string containing:
     - Email
     - Timestamp
     - Status

2. Sorted Set (unsubscribe_timeline)
   - Score: timestamp
   - Member: email address
   - Enables time-based queries

## Setup & Installation

### Prerequisites
- Node.js (Latest LTS version)
- npm or yarn
- Upstash Redis account
- Vercel account (for deployment)

### Local Development Setup

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd [repository-name]
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment:
   ```bash
   cp .env.sample .env
   ```
   Add your Upstash Redis credentials:
   ```
   UPSTASH_REDIS_REST_URL=your_redis_url
   UPSTASH_REDIS_REST_TOKEN=your_redis_token
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

### Production Deployment

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy to Vercel:
   ```bash
   npm run deploy
   ```

3. Configure environment variables in Vercel dashboard:
   - UPSTASH_REDIS_REST_URL
   - UPSTASH_REDIS_REST_TOKEN

## API Documentation

### POST /api/unsubscribe

Processes unsubscribe requests for specified email addresses.

#### Request
```json
{
  "email": "user@example.com"
}
```

#### Success Response (200 OK)
```json
{
  "success": true,
  "message": "Successfully unsubscribed user@example.com",
  "timestamp": "2023-09-23T09:30:00.000Z"
}
```

#### Error Response (400 Bad Request)
```json
{
  "error": "Email is required"
}
```

### GET /api/test

Verifies system health and Redis connectivity.

#### Success Response (200 OK)
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

## Extension Guide

### 1. Email Template Integration

Add unsubscribe links to email templates:
```html
https://[your-domain]/unsubscribe?email=%%EMAIL%%
```
Replace `%%EMAIL%%` with your email service's variable for recipient email.

### 2. Custom Styling

The unsubscribe page can be customized by modifying:
- CSS variables in unsubscribe.html
- CAFU branding elements
- Layout and responsive breakpoints

### 3. Additional Features

Potential extension points:
1. Email resubscribe functionality
2. Admin dashboard
3. Analytics integration
4. Custom notification systems

## Best Practices

### Code Standards
- Use consistent error handling patterns
- Implement proper request validation
- Follow REST API conventions
- Maintain comprehensive logging

### Testing
1. Regular health checks via /api/test
2. Email validation testing
3. Redis connection verification
4. Error handling validation

### Security
1. Environment variable protection
2. Input sanitization
3. Error message sanitization
4. CORS header management

## Monitoring & Maintenance

### System Health
1. Regular endpoint testing
2. Redis connection monitoring
3. Error log review
4. Performance metrics tracking

### Data Management
1. Regular Redis backups
2. Unsubscribe list maintenance
3. Storage optimization
4. Rate limiting implementation

## Security Considerations

### 1. Data Protection
- Secure storage of email addresses
- Limited exposure of system details
- Protected environment variables
- Sanitized error messages

### 2. Access Control
- CORS policy implementation
- Rate limiting
- Input validation
- Request method restrictions

### 3. Monitoring
- Error logging
- Access logging
- Performance monitoring
- Security audit trails

### 4. Compliance
- Data retention policies
- Privacy considerations
- Regulatory compliance
- Documentation maintenance
