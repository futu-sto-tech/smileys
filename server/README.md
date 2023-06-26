# Smileys Server

Smileys Server provides a Rest API and WebSockets for Futurice Smileys project.

## Getting Started

To set up Smileys Server locally or deploy it to a server, follow these steps:

**Prerequisites**: Ensure that you have the following software installed:

- Node.js (version 12 or higher)
- npm (Node Package Manager)
- flyctl (Fly command-line utility)

### Run Locally

Create a file named .env and get the contents from 1password and run

    npm run dev

### Deploy

Deploy Development

    flyctl deploy --config fly-development.toml

Deploy Production

    flyctl deploy --config fly-production.toml
