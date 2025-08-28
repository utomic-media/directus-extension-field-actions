# Contributing

Thanks for your interest in contributing to this project 🚀

We welcome issues being submitted for bugs, feature requests, and small enhancements. Please make sure to open an issue before creating a PR.

## Getting Started

### Prerequisites

Before you begin, make sure you have the following installed:

- Node.js
- pnpm
- Docker and Docker Compose

### Download the Project

```bash
git clone https://github.com/utomic-media/directus-extension-field-actions.git
cd directus-extension-field-actions
pnpm install
```

### Development Environment

#### Extension Development

Run the following command in the project root to start the development builder for the extension:

```bash
pnpm dev
```

This will watch for changes and automatically rebuild the extension during development.

#### Playground Environment

A playground Directus instance is available for testing the extension. It automatically loads and reloads the extension when changes are detected. However there's no HMR in the browser. This means you manually need to reload the page, in order to get the latest changes.

To start the playground environment:

```bash
cd playground
docker compose up
```

The playground will be available at the configured URL with the demo credentials (see `docker-compose.yml`).

### Database

The playground database contains a basic demo instance with sample data for testing purposes.


**Important**: Only commit relevant changes that are necessary for test cases to the git repository. Avoid pushing unnecessary database changes or temporary test data.

## Development Workflow

1. Start the extension builder: `pnpm dev`
2. Start the playground: `cd playground && docker compose up`
3. Make your changes to the extension code
4. Test your changes in the playground environment

## Submitting Changes

1. Create an issue
2. Fork the repository
3. Create a feature branch from `main`
4. Make your changes following the development workflow above
5. Submit a Pull Request with a clear description of your changes and link the issue

Thank you for contributing! 🎉