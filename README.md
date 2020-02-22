# Ink

Experimental [Electron](https://electronjs.org/) application (using [nextron](https://github.com/saltyshiomix/nextron)) for our "Git for Music" P2P collaboration and tracking platform.

## Usage

Install all dependencies via `npm install && npm run install-app-deps --unsafe-perm` (tried with Node.js 12.4). Run the development server with `npm run dev`, and build packages with `npm run build`. You may need to specify respective packaging targets.

Prior to launching, you need to specify some environmental configuration. Please have a look at `.env.example` and [its respective documentation](docs/setup.md).

#### Troubleshooting

If some errors occur, especially due to native dependencies, try to reinstall and rebuild all dependencies via `npm ci` and/or `npm run install-app-deps`. The latter script will rebuild all native dependencies for the respective Electron environment.
