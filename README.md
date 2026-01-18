## placemark-svelte

[![GitHub Release](https://img.shields.io/badge/release-v2.0.0-blue)](https://github.com/schweigerjonas/placemark-svelte/releases/tag/v2.0.0)

**placemark-svelte** is a modern, reactive web interface built with [SvelteKit](https://svelte.dev/). It serves as the primary frontend for the [placemark-core](https://github.com/schweigerjonas/placemark-core) backend application at [release 4.0.0](https://github.com/schweigerjonas/placemark-core/releases/tag/v4.0.0) and later, consuming its REST API to provide a seamless user experience for managing points of interest.

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Development](#development)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [NodeJS](https://nodejs.org/en) (LTS Version recommended)
- A running instance of **placemark-core** (v3.0.0+)

### Installation

Clone the repository:

```bash
git clone git@github.com:schweigerjonas/placemark-svelte.git
cd placemark-svelte
```

Install dependencies:

```bash
npm install
```

## Development

To run in development mode (with hot module replacement):

```bash
npm run dev -- --open
```

The server will typically start on <http://localhost:5173>.

## Deployment

The application is deployed live at:

> <https://placemark-sve.netlify.app/>

The backend API is deployed live at:

> <https://placemark-core.onrender.com/>

_Note: In order for the frontend to work properly, it is necessary that the backend instance is spun up. This may take 1-2 minutes upon first visiting the website._
