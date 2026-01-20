# Wedding RSVP

A beautiful wedding RSVP website built with Next.js, TypeScript, and Tailwind CSS. Features a public RSVP form and an admin dashboard to view and export guest responses.

## Features

- 🎉 **Landing Page** - Beautiful wedding details page
- 📝 **RSVP Form** - Easy-to-use form for guests to submit their RSVP
- ✅ **Confirmation Page** - Instant confirmation with event details after RSVP
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
2. Go to the SQL Editor and run the following SQL to create the tables:

```sql
-- Create guest_list table (pre-approved guests)
CREATE TABLE guest_list (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  enabled BOOLEAN NOT NULL DEFAULT true,
  is_inc BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create rsvps table
CREATE TABLE rsvps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  attending BOOLEAN NOT NULL DEFAULT false,
  attendance_type TEXT NOT NULL DEFAULT 'both' CHECK (attendance_type IN ('church', 'reception', 'both')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for guest_list
CREATE INDEX idx_guest_list_first_name ON guest_list(first_name);
CREATE INDEX idx_guest_list_last_name ON guest_list(last_name);
CREATE INDEX idx_guest_list_enabled ON guest_list(enabled);
CREATE INDEX idx_guest_list_is_inc ON guest_list(is_inc);
CREATE INDEX idx_guest_list_created_at ON guest_list(created_at);
CREATE INDEX idx_guest_list_updated_at ON guest_list(updated_at);

-- Create indexes for rsvps
CREATE INDEX idx_rsvps_email ON rsvps(email);
CREATE INDEX idx_rsvps_first_name ON rsvps(first_name);
CREATE INDEX idx_rsvps_last_name ON rsvps(last_name);
CREATE INDEX idx_rsvps_attendance_type ON rsvps(attendance_type);
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
│   │   ├── rsvps.ts      # Admin CRUD for RSVPs
│   │   └── guests.ts    # Guest list CRUD operations
│   ├── api/
│   │   └── rsvp/
│   │       └── route.ts  # API route for RSVP
│   ├── admin/            # Admin dashboard pages
│   │   ├── page.tsx      # Admin login page
│   │   ├── rsvps/        # RSVP list page
│   │   └── guests/       # Guest list page
│   ├── rsvp/             # RSVP form page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── components/
│   ├── AdminDashboard.tsx # RSVP list component
│   ├── AdminLayout.tsx   # Admin layout with sidebar
│   ├── GuestList.tsx      # Guest list component
│   ├── Hero.tsx          # Hero section component
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

### `/admin` - Admin Login
Protected login page (password required) to access the admin dashboard.

### `/admin/rsvps` - RSVP List
Admin page to view all RSVPs, see statistics, edit/delete RSVPs, and export data as CSV.

### `/admin/guests` - Guest List
Admin page to manage the pre-approved guest list with CRUD functionality.

## Database Schema

### `guest_list` Table

The `guest_list` table stores pre-approved guests:

- `id` (UUID) - Primary key
- `first_name` (TEXT) - Guest first name
- `last_name` (TEXT) - Guest last name
- `enabled` (BOOLEAN) - Whether the guest is enabled to RSVP (default: true)
- `is_inc` (BOOLEAN) - Whether the guest is an INC (Iglesia Ni Cristo) member (default: false)
- `created_at` (TIMESTAMP) - When the guest was added
- `updated_at` (TIMESTAMP) - When the guest was last edited

### `rsvps` Table

The `rsvps` table stores RSVP submissions:

- `id` (UUID) - Primary key
- `first_name` (TEXT) - Guest first name
- `last_name` (TEXT) - Guest last name
- `email` (TEXT) - Guest email
- `attending` (BOOLEAN) - Whether the guest is attending
- `attendance_type` (TEXT) - Type of attendance: 'church', 'reception', or 'both' (defaults to 'both')
- `created_at` (TIMESTAMP) - When the RSVP was submitted
- `updated_at` (TIMESTAMP) - When the RSVP was last edited (auto-updates when admins save changes)

## Guest List Feature

The application includes a comprehensive guest list validation and management feature:

### Guest Validation (RSVP Form)
- **Pre-approved Guests Only**: Only guests in the `guest_list` table who are **enabled** can submit RSVPs
- **Case-Insensitive Matching**: Name matching is case-insensitive for user convenience
- **Strict Validation**: If a guest is not in the list OR is disabled, the RSVP is rejected with the same error message: "Your name is not in our guest list"
  - This prevents revealing whether a guest exists but is disabled (for privacy/security)
- **No Auto-Add**: Guests NOT in the pre-approved list are never automatically added

### Admin Guest List Management (`/admin/guests`)
- **Enable/Disable Guests**: Toggle individual guests between enabled and disabled status
  - Disabled guests cannot submit RSVPs but remain in the database for record-keeping
- **Count Dashboard**: View real-time counts of Total, Enabled, and Disabled guests
- **Full CRUD Operations**: Create, Read, Update, and Delete guest entries
- **CSV Import**: Bulk import guests from a CSV file (format: `first_name, last_name`)
  - All imported guests are enabled by default
  - Existing guests are automatically skipped
  - Import results show counts and any errors
- **CSV Export**: Export the entire guest list with all fields including status

## Church Reminders Feature

The application displays contextual worship etiquette reminders for non-INC guests attending the church ceremony:

### How It Works
- **Automatic Display**: Church reminders appear on the RSVP confirmation page only for guests who:
  - Are attending the church ceremony (`church` or `both` attendance types)
  - AND are tagged as `is_inc = false` in the guest list
- **INC Members**: Do not see these reminders as they are already familiar with the worship practices
- **Graceful Fallback**: If guest data cannot be resolved, the reminder section is safely omitted

### Admin Management
- The `is_inc` field can be edited via the Guest List admin page (`/admin/guests`)
- Field appears as a checkbox labeled "INC Member" in both edit mode and table view
- Exported CSV files include the INC Member status

### Reminder Content
The current reminders inform non-INC guests that during the worship service, Iglesia Ni Cristo members are expected to:
- Close their eyes during prayers
- Respond with "Yes" or "Amen" in unison as led by the minister

The reminder component (`components/ChurchReminders.tsx`) is designed to be easily extensible for additional reminders in the future.

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


