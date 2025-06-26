# Pantomagic

Ever fantasised about living the Norwegian dream? Try this pantomagic virtual "panteautomat" which goes to show how the norwegians can get money back from collecting bottles from last weekends party or from what they found laying around in nature.

## Pantomagic Panteautomat Game

A mobile-friendly Next.js (React) game where you drag bottles and cans into a panteautomat (bottle deposit machine) to earn money.

## Features

- Drag-and-drop bottles/cans into the machine
- Realistic bag and bottle/can images
- High score with localStorage persistence
- Mobile-friendly and responsive

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

### Try it on your phone:

- Make sure your computer and phone are on the same WiFi network.
- Find your computer's local IP address (e.g. `192.168.1.42`).
- Open [http://192.168.1.42:3000](http://192.168.1.42:3000) in your phone's browser.
- You may need to allow network access in your firewall or terminal if prompted.

## Building for Production / Hosting

1. **Build the app:**

   ```bash
   npm run build
   # or
   yarn build
   ```

2. **Start the production server:**

   ```bash
   npm start
   # or
   yarn start
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

3. **Deploying:**

   - You can host the app on Vercel, Netlify, or any Node.js-compatible server.
   - For static export (limited interactivity), you can try:

     ```bash
     npm run export
     # or
     yarn export
     ```

     This will output static files in the `out/` directory.

## Project Structure

- `app/` — Main Next.js app code (components, logic, styles)
- `public/gameprops/` — Images for bottles, cans, bag, and machine
- `README.md` — This file

## Customization

- Adjust bag/bottle/can visuals in `app/components/Bag.tsx` and `public/gameprops/`
- Game logic and UI are modular and easy to extend

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## License

MIT

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
