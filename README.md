# Trip Planner

A modern web application for planning and organizing travel itineraries. Built with Next.js, TypeScript, Tailwind CSS, and Firebase.

## Features

- Interactive map integration with Mapbox
- Day-by-day itinerary planning
- Weather information for destinations
- User authentication and profile management
- Save and share trip plans
- Responsive design for all devices

## Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Firebase account
- Mapbox account
- OpenWeatherMap API key

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/trip-planner.git
cd trip-planner
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your environment variables:
```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Mapbox Configuration
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_access_token

# OpenWeatherMap Configuration
NEXT_PUBLIC_OPENWEATHERMAP_API_KEY=your_openweathermap_api_key
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
  ├── app/
  │   ├── components/    # Reusable UI components
  │   ├── hooks/        # Custom React hooks
  │   ├── services/     # API and external service integrations
  │   ├── styles/       # Global styles and Tailwind config
  │   ├── types/        # TypeScript type definitions
  │   └── utils/        # Utility functions and helpers
  └── public/           # Static assets
```

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for production
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Firebase](https://firebase.google.com/) - Backend and authentication
- [Mapbox](https://www.mapbox.com/) - Maps and location services
- [OpenWeatherMap](https://openweathermap.org/) - Weather data
- [React Beautiful DnD](https://github.com/atlassian/react-beautiful-dnd) - Drag and drop for itinerary items

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
