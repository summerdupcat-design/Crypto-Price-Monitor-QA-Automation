# Crypto Price Monitor QA Automation

A WebSocket-based crypto market data validation framework for real-time crypto ticker testing.

## Overview

This project is designed to validate real-time crypto market data from exchange WebSocket streams.

It focuses on QA scenarios such as:

- WebSocket connection validation
- Real-time ticker message handling
- Timestamp validation
- Price validation
- Bid/Ask spread validation
- Duplicate message detection
- Configurable validation rules
- State-based validation per trading pair
- Jest-based automated testing
- GitHub Actions CI integration

## Tech Stack

- Node.js
- WebSocket (`ws`)
- Jest
- GitHub Actions

## Architecture

```text
Exchange WebSocket
        ↓
WebSocket Client
        ↓
Message Handler
        ↓
Validator Manager
        ↓
Validators
  ├── TimestampValidator
  ├── PriceValidator
  ├── BidAskValidator
  └── DuplicateValidator
        ↓
Reporter
        ↓
Console Output

# Run Project
```npm install
node src/app.js```

# Run Test
```npm test```

# Test Result
Current test coverage:
```Test Suites: 4 passed, 4 total
Tests:       13 passed, 13 total```

# CI
This project uses GitHub Actions to automatically run Jest tests on every push to the main branch.