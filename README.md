# Playlist Gen
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

A Public Playlist for all the coder so that we can share our song and vote on it 

## Getting Started
To get started with this project, follow the instructions below:

### Prerequisites
- Node.js (latest LTS version recommended)
- npm or Yarn
- MongoDB (for local development)
- Spotify Developer Account
- Clerk Account

### Installation
Clone this repository to your local machine:
```bash
git clone https://github.com/lakshya-roonwal/playlist-gen.git
cd playlist-gen
```

Install the project dependencies:
```bash
npm install
or
yarn install
or 
pnpm install
```

3. Environment Variables
Change the ```env.example``` to ```.env```
```bash
# Spotify Auth
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REDIRECT_URI=http://localhost:3000/api/auth/callback

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Database
MONGO_URL=mongodb://127.0.0.1:27017/your_database_name
```
## License

[MIT](https://choosealicense.com/licenses/mit/)

## **Contact**

If you have any questions or need support, you can reach out to:
- Twitter: [@lakshyaroonwal](https://twitter.com/lakshyaroonwal)

**Contributions are appriciated**
