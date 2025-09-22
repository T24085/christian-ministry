import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowRight,
  BookOpen,
  CalendarClock,
  Check,
  CloudUpload,
  Heart,
  Home,
  Image,
  LogIn,
  Mail,
  Menu,
  MessageCircleHeart,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from "lucide-react"

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Spaces", href: "#spaces" },
  { label: "Writing", href: "#writing" },
  { label: "Security", href: "#security" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Join", href: "#join" },
]

const INTRO_POINTS = [
  "Every profile opens with a beautiful welcome page that feels like a living scrapbook for your family.",
  "Write blog-style letters to your spouse and siblings, schedule posts for the future, and keep track of every milestone.",
  "Approve email addresses or let relatives sign in with Google—Firebase protects every private room you create.",
]

const INTRO_FEATURES = [
  {
    title: "Family profile home",
    description:
      "Introduce your story, add a gallery, and invite friends and mentors to follow along.",
    icon: Home,
  },
  {
    title: "Spouse sanctuary",
    description: "Tender letters and inside jokes stay locked away for the one you married.",
    icon: Heart,
  },
  {
    title: "Sibling circles",
    description: "Give each sibling a personal feed filled with memories meant only for them.",
    icon: Users,
  },
  {
    title: "Keepsake imagery",
    description: "Pair every post with photos from Firebase Storage or a shared Drive folder.",
    icon: Image,
  },
]

const STORY_SPACES = [
  {
    key: "profile",
    name: "Family Profile Home",
    tagline: "A warm welcome for everyone you invite",
    description:
      "Capture the milestones, traditions, and promises that define your family. Post public updates, curate a gallery, and keep a timeline that loved ones can revisit whenever they miss you.",
    highlights: [
      "Timeline prompts for weddings, births, and everyday victories.",
      "Hero banners and galleries fueled by Firebase Storage or Google Drive.",
      "Comment threads and guestbooks for mentors, pastors, or best friends.",
    ],
    entries: [
      {
        title: "The promise we made in 2008",
        meta: "Visible to friends & mentors",
        body: "We tucked handwritten vows into this post so our community can celebrate how it all began.",
      },
      {
        title: "When we became parents",
        meta: "Pinned to the family timeline",
        body: "Photos from the hospital, audio of our first lullaby, and the letter we wrote to future-us.",
      },
    ],
  },
  {
    key: "spouse",
    name: "Spouse Sanctuary",
    tagline: "Keep your vows alive with letters that last",
    description:
      "This is your secret haven. Schedule notes for anniversaries, attach playlists, and document the moments only the two of you understand.",
    highlights: [
      "Passwordless Google sign-in keeps the doorway simple and secure.",
      "Scheduled releases for anniversaries, deployments, and future milestones.",
      "Audio, photos, and written posts housed together for a richer story.",
    ],
    entries: [
      {
        title: "For the days when we feel far",
        meta: "Visible only to Marcus",
        body: "Open this when the road stretches long. It holds the reminders that keep us tethered.",
      },
      {
        title: "Read this on our 25th anniversary",
        meta: "Scheduled for May 14, 2032",
        body: "A playlist, a prayer, and the promises we still chase—waiting quietly until it is time.",
      },
    ],
  },
  {
    key: "siblings",
    name: "Sibling Circles",
    tagline: "Personal rooms for every brother and sister",
    description:
      "Spin up an individual feed for each sibling. Share private notes, upload embarrassing childhood photos, and leave advice for the years ahead.",
    highlights: [
      "Approve different email lists so each sibling sees only what is meant for them.",
      "Create joint memories for all siblings or keep posts one-to-one.",
      "Let them respond with their own stories and keep the thread alive.",
    ],
    entries: [
      {
        title: "To Michelle — the protector",
        meta: "Visible only to Michelle",
        body: "Thank you for the years you watched the door. I saved the stories I was too young to tell before.",
      },
      {
        title: "To Caleb — the dreamer",
        meta: "Shared with Caleb & Jordan",
        body: "You taught us to chase the wild ideas. This is the map we drew in crayon and the path we actually took.",
      },
    ],
  },
]

const WRITING_TOOLS = [
  {
    title: "Story templates",
    description: "Guided prompts help you write about firsts, lasts, and everything in between.",
    icon: BookOpen,
  },
  {
    title: "Future deliveries",
    description: "Schedule posts to unlock later so your words arrive exactly when they are needed.",
    icon: CalendarClock,
  },
  {
    title: "Shared reflections",
    description: "Invite your spouse or siblings to co-author replies and keep the dialogue alive.",
    icon: MessageCircleHeart,
  },
  {
    title: "Media keepsakes",
    description: "Upload images, audio notes, or video links for posts that feel tangible.",
    icon: Image,
  },
]

const SECURITY_FEATURES = [
  {
    title: "Google & email sign-in",
    description:
      "Families authenticate through Firebase using Google accounts or secure email links—no forgotten passwords here.",
    icon: LogIn,
  },
  {
    title: "Approved lists per room",
    description: "Drop addresses for your spouse and each sibling to control every doorway.",
    icon: Mail,
  },
  {
    title: "Granular permissions",
    description: "Firestore security rules keep reads and writes locked to the people you trust.",
    icon: ShieldCheck,
  },
  {
    title: "Photo & file storage",
    description: "Use Firebase Storage or connect a shared Drive folder for sentimental imagery.",
    icon: CloudUpload,
  },
]

const TESTIMONIALS = [
  {
    quote:
      "Until Death Do Us Part gave us a place to keep writing vows to each other. The scheduled letters turned deployments into a steady stream of hope.",
    name: "Elena & Marcus",
    detail: "Married 18 years, military family",
  },
  {
    quote:
      "My siblings and I now have a daily ritual of checking our private rooms. We share playlists, scanned Polaroids, and prayers before the sun comes up.",
    name: "The Rivera Sisters",
    detail: "Three sisters, two states",
  },
  {
    quote:
      "As a grief counselor, I recommend this to families who want to prepare legacy letters. The access controls are simple enough for my seniors to manage.",
    name: "Dana Washington",
    detail: "Licensed grief counselor",
  },
  {
    quote:
      "The Google sign-in meant our tech-shy parents could jump in without stress. Now Dad drops voice notes for each of us every Sunday night.",
    name: "Anthony & Jordan",
    detail: "Brothers rebuilding connection",
  },
]

const CTA_POINTS = [
  "Unlimited drafts across profile, spouse, and sibling rooms.",
  "Invite collaborators with secure Google or email authentication.",
  "Store photos and keepsakes alongside every entry.",
]

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSpace, setActiveSpace] = useState(STORY_SPACES[0].key)

  const selectedSpace = STORY_SPACES.find((space) => space.key === activeSpace) ?? STORY_SPACES[0]

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-rose-50 text-slate-900">
      <div
        className="pointer-events-none absolute inset-x-0 top-[-320px] h-[620px] bg-[radial-gradient(circle_at_top,_rgba(244,114,182,0.35),_transparent_65%)]"
        aria-hidden="true"
      />

      <header className="sticky top-0 z-40 border-b border-white/70 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#home" className="flex items-center gap-3 font-semibold">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-rose-500 to-amber-400 text-white">
              UD
            </span>
            <span>
              <span className="block text-base font-semibold">Until Death Do Us Part</span>
              <span className="block text-xs font-normal text-rose-500">Legacy storytelling for families</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <Button
                key={link.href}
                asChild
                variant="ghost"
                className="rounded-full px-4 text-sm font-medium text-slate-700 hover:text-rose-600"
              >
                <a href={link.href}>{link.label}</a>
              </Button>
            ))}
            <Button className="rounded-full bg-rose-500 px-5 text-white hover:bg-rose-600" asChild>
              <a href="#join">Start for free</a>
            </Button>
          </nav>

          <Button
            variant="ghost"
            className="md:hidden"
            aria-label="Toggle navigation"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-rose-100 bg-white/95 px-4 py-4 shadow-sm md:hidden">
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Button
                  key={link.href}
                  variant="ghost"
                  className="justify-start rounded-lg text-base"
                  asChild
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <a href={link.href}>{link.label}</a>
                </Button>
              ))}
              <Button className="rounded-lg bg-rose-500 text-white hover:bg-rose-600" asChild>
                <a href="#join">Start for free</a>
              </Button>
            </div>
          </div>
        )}
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-24 px-4 pb-24 pt-20 sm:px-6 lg:px-8">
        <section id="home" className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-1 text-sm font-medium text-rose-600">
              <Sparkles className="h-4 w-4" /> Beta invitations are open now
            </span>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                Hold onto the words that last a lifetime.
              </h1>
              <p className="text-lg leading-relaxed text-slate-600">
                Until Death Do Us Part is a dedicated home for couples and families to write their legacy. Create a
                profile, invite your spouse and siblings, and build private rooms filled with letters, photos, and
                prayers they can revisit forever.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button className="rounded-full bg-rose-500 px-6 text-white hover:bg-rose-600" size="lg">
                Create a family profile
              </Button>
              <Button
                variant="outline"
                className="rounded-full border-rose-200 px-6 text-rose-600 hover:bg-rose-50"
                size="lg"
              >
                <LogIn className="h-4 w-4" /> Continue with Google
              </Button>
            </div>
            <dl className="grid gap-6 sm:grid-cols-3">
              <div>
                <dt className="text-sm font-medium text-slate-500">Private spaces</dt>
                <dd className="mt-1 text-2xl font-semibold text-rose-600">Profile, spouse, siblings</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-slate-500">Stories preserved</dt>
                <dd className="mt-1 text-2xl font-semibold text-rose-600">12k+ letters</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-slate-500">Invite methods</dt>
                <dd className="mt-1 text-2xl font-semibold text-rose-600">Email or Google</dd>
              </div>
            </dl>
          </div>

          <Card className="relative overflow-hidden border-rose-100 bg-white/80 shadow-xl backdrop-blur">
            <div className="absolute right-[-40px] top-[-40px] h-48 w-48 rounded-full bg-rose-100/70" aria-hidden="true" />
            <CardHeader>
              <CardTitle className="text-xl text-slate-900">Open your story in minutes</CardTitle>
              <CardDescription className="text-sm text-slate-600">
                Draft a welcome message, approve emails, and drop your favorite images from Firebase Storage or a shared
                Drive folder.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Family name" defaultValue="The Rivera Family" />
              <Input placeholder="Primary contact email" type="email" defaultValue="elena.rivera@example.com" />
              <Textarea rows={4} placeholder="Welcome message">
We built this home so you always have a place to feel loved. Come read whenever you miss our voices.
              </Textarea>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-dashed border-rose-200 p-4 text-sm text-slate-600">
                  <p className="font-semibold text-slate-800">Spouse room</p>
                  <p className="mt-1">
                    Invite with Google in a click and save anniversary letters in one protected feed.
                  </p>
                </div>
                <div className="rounded-xl border border-dashed border-rose-200 p-4 text-sm text-slate-600">
                  <p className="font-semibold text-slate-800">Sibling circles</p>
                  <p className="mt-1">
                    Approve each sibling’s email so only they can read the notes written for them.
                  </p>
                </div>
              </div>
              <div className="rounded-2xl border border-dashed border-rose-200 bg-rose-50/70 p-4 text-sm text-slate-600">
                <p className="font-semibold text-rose-600">Firebase ready</p>
                <p className="mt-1">
                  Authentication, Firestore, and Storage come together so every promise stays private and backed up.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full rounded-full bg-rose-500 text-white hover:bg-rose-600">
                Save &amp; continue <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </section>

        <section className="grid gap-10 rounded-3xl border border-rose-100 bg-white/70 p-8 shadow-sm lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-slate-900">What is Until Death Do Us Part?</h2>
            <p className="text-lg text-slate-600">
              It is a sacred digital home where your family can keep writing together. Capture your love story,
              celebrate the people who shaped you, and prepare letters for tomorrow’s milestones.
            </p>
            <ul className="space-y-3 text-sm text-slate-600">
              {INTRO_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                    <Check className="h-3 w-3" />
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {INTRO_FEATURES.map((feature) => (
              <Card key={feature.title} className="bg-white/80">
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base text-slate-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-slate-600">{feature.description}</CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="spaces" className="space-y-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold text-slate-900">Three rooms to hold every chapter</h2>
            <p className="mt-4 text-lg text-slate-600">
              Toggle between your shared profile home, the private spouse sanctuary, and individual sibling circles. Each
              room keeps posts, media, and permissions separate so stories feel personal and safe.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
            <div className="flex snap-x snap-mandatory gap-3 overflow-auto rounded-2xl border border-rose-100 bg-white/70 p-3 lg:flex-col lg:overflow-visible">
              {STORY_SPACES.map((space) => (
                <Button
                  key={space.key}
                  variant={space.key === activeSpace ? "default" : "outline"}
                  className={`flex-1 rounded-xl border-rose-200 px-4 py-4 text-left text-sm font-semibold shadow-sm transition ${
                    space.key === activeSpace
                      ? "bg-rose-500 text-white hover:bg-rose-500"
                      : "bg-white text-slate-700 hover:bg-rose-50"
                  }`}
                  onClick={() => setActiveSpace(space.key)}
                >
                  <div className="space-y-1">
                    <p>{space.name}</p>
                    <p className="text-xs font-normal opacity-80">{space.tagline}</p>
                  </div>
                </Button>
              ))}
            </div>

            <Card className="bg-white/80 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-rose-600">{selectedSpace.name}</CardTitle>
                <CardDescription className="text-base text-slate-600">{selectedSpace.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3 text-sm text-slate-600">
                  {selectedSpace.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3">
                      <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                        <Check className="h-3 w-3" />
                      </span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <div className="grid gap-4 sm:grid-cols-2">
                  {selectedSpace.entries.map((entry) => (
                    <div key={entry.title} className="rounded-2xl border border-rose-100 bg-rose-50/70 p-5 shadow-sm">
                      <p className="text-xs font-medium uppercase tracking-wide text-rose-500">{entry.meta}</p>
                      <h3 className="mt-2 text-lg font-semibold text-slate-900">{entry.title}</h3>
                      <p className="mt-2 text-sm text-slate-600">{entry.body}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="writing" className="space-y-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold text-slate-900">Writing tools that feel effortless</h2>
            <p className="mt-4 text-lg text-slate-600">
              Draft posts together, schedule future letters, and keep every update accompanied by a keepsake image or
              audio note.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {WRITING_TOOLS.map((tool) => (
              <Card key={tool.title} className="bg-white/80">
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                    <tool.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base text-slate-900">{tool.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-slate-600">{tool.description}</CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-white/80 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-slate-900">Preview a scheduled letter</CardTitle>
              <CardDescription className="text-sm text-slate-600">
                Compose private posts, attach imagery, and choose the perfect release moment for your spouse or siblings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Post title" defaultValue="For the day you need a reminder" />
              <Textarea rows={5} defaultValue={`Hey love,\n\nIf the world feels heavy today, open the photos in this post and remember how brave you are. I scheduled this for the night before your next deployment so you never feel alone.\n\nForever,\nMe`} />
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-dashed border-rose-200 bg-rose-50/70 p-4 text-sm text-slate-600">
                  <p className="font-semibold text-slate-800">Release date</p>
                  <p className="mt-1">May 14, 2026 at 7:00 PM</p>
                </div>
                <div className="rounded-xl border border-dashed border-rose-200 bg-rose-50/70 p-4 text-sm text-slate-600">
                  <p className="font-semibold text-slate-800">Audience</p>
                  <p className="mt-1">Spouse sanctuary</p>
                </div>
                <div className="rounded-xl border border-dashed border-rose-200 bg-rose-50/70 p-4 text-sm text-slate-600">
                  <p className="font-semibold text-slate-800">Attachments</p>
                  <p className="mt-1">3 photos · 1 audio prayer</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="security" className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-600">
              <ShieldCheck className="h-4 w-4" /> Guarded with Firebase
            </span>
            <h2 className="text-3xl font-semibold text-slate-900">Set approvals once and trust every doorway</h2>
            <p className="text-lg text-slate-600">
              Decide exactly who can read each room of your story. Every invitation is paired with Firebase
              Authentication, Firestore access rules, and optional audit trails.
            </p>
            <div className="grid gap-4">
              {SECURITY_FEATURES.map((feature) => (
                <div key={feature.title} className="flex items-start gap-3 rounded-xl bg-white/80 p-4 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{feature.title}</p>
                    <p className="text-sm text-slate-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card className="bg-white/80 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-slate-900">Approved email list</CardTitle>
              <CardDescription className="text-sm text-slate-600">
                Grant, update, or revoke access to each sacred space whenever you need to.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700" htmlFor="spouse-email">
                  Spouse email
                </label>
                <Input id="spouse-email" type="email" defaultValue="marcus.rivera@gmail.com" className="mt-2" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700" htmlFor="sibling-emails">
                  Sibling emails
                </label>
                <Textarea
                  id="sibling-emails"
                  rows={3}
                  placeholder="Add one email per line"
                  defaultValue={`michelle.rivera@example.com\ncaleb.rivera@example.com`}
                  className="mt-2"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700" htmlFor="trusted-keepers">
                  Trusted keepers (friends or mentors)
                </label>
                <Input id="trusted-keepers" type="text" placeholder="Add optional guardians" className="mt-2" />
              </div>
              <div className="rounded-xl border border-dashed border-rose-200 bg-rose-50/70 p-4 text-sm text-slate-600">
                Every change is logged in Firestore so you always know who can enter each space.
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full rounded-full bg-rose-500 text-white hover:bg-rose-600">Update permissions</Button>
            </CardFooter>
          </Card>
        </section>

        <section id="testimonials" className="space-y-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold text-slate-900">Families are already writing their forever</h2>
            <p className="mt-4 text-lg text-slate-600">
              Hear from couples, siblings, and counselors who use Until Death Do Us Part to keep their promises alive.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {TESTIMONIALS.map((testimonial) => (
              <Card key={testimonial.name} className="flex flex-col justify-between bg-white/80">
                <CardContent className="space-y-4 pt-6 text-slate-600">
                  <p className="text-sm leading-relaxed">“{testimonial.quote}”</p>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-1 text-left">
                  <p className="text-sm font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="text-xs uppercase tracking-wide text-rose-500">{testimonial.detail}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section id="join" className="overflow-hidden rounded-3xl bg-gradient-to-r from-rose-500 via-rose-500/90 to-amber-500 px-8 py-16 text-white shadow-2xl">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold">Begin your shared legacy today</h2>
              <p className="text-lg opacity-90">
                Open a free account to start writing. When you are ready for more storage or additional collaborators,
                upgrade in a click—your history stays right where you left it.
              </p>
              <ul className="space-y-3 text-sm opacity-95">
                {CTA_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                      <Check className="h-4 w-4" />
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <Button className="rounded-full bg-white px-6 text-rose-600 hover:bg-rose-100" size="lg">
                  Create profile
                </Button>
                <Button
                  variant="ghost"
                  className="rounded-full border border-white/30 px-6 text-white hover:bg-white/10"
                  size="lg"
                >
                  Talk to onboarding <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Card className="bg-white/10 text-rose-50">
              <CardHeader>
                <CardTitle className="text-xl text-white">What’s included</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-rose-50">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" /> Firebase Authentication &amp; Google sign-in
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4" /> Spouse-only sanctuary with encrypted posts
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" /> Unlimited sibling circles and guest access lists
                </div>
                <div className="flex items-center gap-2">
                  <Image className="h-4 w-4" /> Photo keepsakes from Storage or shared Drive folders
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/70 bg-white/80">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Until Death Do Us Part. Crafted with devotion.</p>
          <div className="flex flex-wrap items-center gap-4">
            <a className="hover:text-rose-600" href="#home">
              Home
            </a>
            <a className="hover:text-rose-600" href="#spaces">
              Spaces
            </a>
            <a className="hover:text-rose-600" href="#security">
              Security
            </a>
            <a className="hover:text-rose-600" href="#join">
              Get started
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
