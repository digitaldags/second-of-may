# Wedding RSVP

A beautiful wedding RSVP website built with Next.js, TypeScript, and Tailwind CSS. Features a public RSVP form and an admin dashboard to view and export guest responses.

## Features

- 🎉 **Landing Page** - Beautiful wedding details page
- 📝 **RSVP Form** - Easy-to-use form for guests to submit their RSVP
- 🔐 **Admin Dashboard** - Protected dashboard to view and export RSVPs
- 🎨 **Elegant Design** - Beige and maroon color theme with modern UI
- ✅ **Form Validation** - Client and server-side validation
- 📊 **CSV Export** - Export RSVP data as CSV for easy analysis

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Testing**: Jest + React Testing Library
- **Code Quality**: ESLint + Prettier

## Prerequisites

- Node.js 18+ and npm
- A Supabase account and project

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to the SQL Editor and run the following SQL to create the `rsvps` table:

```sql
CREATE TABLE rsvps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  attending BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX idx_rsvps_email ON rsvps(email);

-- Create indexes for sorting/filtering
CREATE INDEX idx_rsvps_created_at ON rsvps(created_at);
CREATE INDEX idx_rsvps_updated_at ON rsvps(updated_at);
```

3. Go to Project Settings > API to get your project URL and anon key

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
ADMIN_PASSWORD=your_admin_password
```

**Note**: The `ADMIN_PASSWORD` is optional. If not set, it defaults to `'admin'`. Make sure to set a strong password in production!

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production application
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## Project Structure

```
wedding-rsvp/
├── app/
│   ├── actions/          # Server actions
│   │   ├── admin.ts      # Admin authentication
│   │   ├── rsvp.ts       # RSVP submission
│   │   └── rsvps.ts      # Admin CRUD for RSVPs
│   ├── api/
│   │   └── rsvp/
│   │       └── route.ts  # API route for RSVP
│   ├── admin/            # Admin dashboard page
│   ├── rsvp/             # RSVP form page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── components/
│   ├── AdminDashboard.tsx # Admin dashboard component
│   └── RSVPForm.tsx      # RSVP form component
├── lib/
│   ├── supabase.ts       # Supabase client
│   └── types.ts          # TypeScript types
└── __tests__/            # Test files
```

## Pages

### `/` - Landing Page
The main landing page with wedding details and a link to the RSVP form.

### `/rsvp` - RSVP Form
Public page where guests can submit their RSVP with name, email, and attendance status.

### `/admin` - Admin Dashboard
Protected page (password required) to view all RSVPs, see statistics, and export data as CSV.

## Database Schema

The `rsvps` table has the following structure:

- `id` (UUID) - Primary key
- `name` (TEXT) - Guest name
- `email` (TEXT) - Guest email
- `attending` (BOOLEAN) - Whether the guest is attending
- `created_at` (TIMESTAMP) - When the RSVP was submitted
- `updated_at` (TIMESTAMP) - When the RSVP was last edited (auto-updates when admins save changes)

## Customization

### Update Wedding Details

Edit `app/page.tsx` to update the wedding date, location, and other details.

### Change Color Theme

The beige/maroon theme is defined in `tailwind.config.ts`. Modify the `wedding` color palette to customize the colors.

### Admin Password

Set the `ADMIN_PASSWORD` environment variable to change the admin login password.

## Testing

The project includes unit tests for form validation and server actions. Run tests with:

```bash
npm test
```

## Deployment

1. Build the application: `npm run build`
2. Set environment variables in your hosting platform
3. Deploy to Vercel, Netlify, or your preferred hosting service

For Vercel deployment:
- Connect your GitHub repository
- Add environment variables in the Vercel dashboard
- Deploy automatically on push

## Docker Commands
- `docker build -t wedding-rsvp .`
- `docker run --rm -p 3000:3000 \
     -e SUPABASE_URL=your_supabase_url \
     -e SUPABASE_KEY=your_supabase_key \
     -e ADMIN_PASSWORD=your_admin_password \
     wedding-rsvp`
## License

MIT


