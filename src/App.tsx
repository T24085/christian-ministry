import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Play, ShoppingBag, Heart, Menu, X, BookOpenText, Youtube, Send, Church } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- QUICK START ---
// 1) Replace YOUTUBE_VIDEO_IDS and PLAYLIST_ID with her real video IDs or a playlist ID.
// 2) Update the brand, verses, bio, and shop items below.
// 3) When ready, connect the newsletter + contact form to your backend, Netlify Forms, or Formspree.

const YOUTUBE_VIDEO_IDS = [
  "a1SQSEiYDDs",
  "NWdkLn6uDN4",
  "VP9tIEi843Y",
  "fcaq3lyE_U8",
  "zuCdBaIPDms",
  "LdsZUj3bGvw",
];

// Leave empty by default so the video gallery doesn't render a broken playlist embed.
const PLAYLIST_ID = ""; // optional: set to a YouTube playlist ID to show a large embed on the Gallery page

const BRAND = {
  name: "Walking in Faith",
  tagline: "Sharing the Gospel—one video at a time.",
  verse: "\"Your word is a lamp to my feet and a light to my path.\" — Psalm 119:105",
  heroCtaText: "Watch the Latest",
};

const SHOP_ITEMS = [
  { id: 1, title: "Faith Over Fear Tee", price: "$24", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop", tag: "New" },
  { id: 2, title: "Prayer Journal", price: "$18", img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop", tag: "Best Seller" },
  { id: 3, title: "Cross Necklace", price: "$29", img: "https://images.unsplash.com/photo-1524024973431-2ad916746881?q=80&w=800&auto=format&fit=crop", tag: "Gift" },
];

const NAV = [
  { key: "home", label: "Home", icon: <Church className="w-4 h-4"/> },
  { key: "videos", label: "Video Gallery", icon: <Youtube className="w-4 h-4"/> },
  { key: "shop", label: "Shop", icon: <ShoppingBag className="w-4 h-4"/> },
  { key: "about", label: "About", icon: <BookOpenText className="w-4 h-4"/> },
  { key: "contact", label: "Contact", icon: <Mail className="w-4 h-4"/> },
  { key: "donate", label: "Donate", icon: <Heart className="w-4 h-4"/> },
];

export default function Site() {
  const [page, setPage] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800">
      <Header page={page} setPage={setPage} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <AnimatePresence mode="wait">
          {page === "home" && (
            <motion.div key="home" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <Hero setPage={setPage} />
              <FeaturedVideos onOpen={(id)=>setActiveVideo(id)} />
              <Newsletter />
              <Testimonies />
            </motion.div>
          )}
          {page === "videos" && (
            <motion.div key="videos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <VideoGallery onOpen={(id)=>setActiveVideo(id)} />
            </motion.div>
          )}
          {page === "shop" && (
            <motion.div key="shop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Shop />
            </motion.div>
          )}
          {page === "about" && (
            <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <About />
            </motion.div>
          )}
          {page === "contact" && (
            <motion.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Contact />
            </motion.div>
          )}
          {page === "donate" && (
            <motion.div key="donate" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Donate />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <VideoModal videoId={activeVideo} onClose={()=>setActiveVideo(null)} />
      <Footer setPage={setPage} />
    </div>
  );
}

function Header({ page, setPage, mobileOpen, setMobileOpen }: {
  page: string;
  setPage: (page: string) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white grid place-content-center font-semibold">WF</div>
            <div>
              <div className="font-bold">{BRAND.name}</div>
              <div className="text-xs text-slate-500 -mt-0.5">{BRAND.tagline}</div>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((n) => (
              <Button key={n.key} variant={page===n.key?"default":"ghost"} className="rounded-2xl" onClick={()=>setPage(n.key)}>
                <span className="mr-2">{n.icon}</span>{n.label}
              </Button>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <Button variant="ghost" className="md:hidden" onClick={()=>setMobileOpen(!mobileOpen)} aria-label="Toggle Menu">
            {mobileOpen ? <X/> : <Menu/>}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="md:hidden overflow-hidden border-t">
            <div className="px-4 py-2 grid gap-1">
              {NAV.map((n) => (
                <Button key={n.key} variant={page===n.key?"default":"ghost"} className="justify-start rounded-xl" onClick={()=>{setPage(n.key); setMobileOpen(false);}}>
                  <span className="mr-2">{n.icon}</span>{n.label}
                </Button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero({ setPage }: { setPage: (page: string) => void }) {
  return (
    <section className="grid lg:grid-cols-2 gap-8 items-center">
      <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">{BRAND.name}</h1>
        <p className="mt-3 text-lg text-slate-600 max-w-prose">{BRAND.tagline}</p>
        <p className="mt-4 italic text-slate-500">{BRAND.verse}</p>
        <div className="mt-6 flex gap-3">
          <Button className="rounded-2xl" onClick={()=>setPage("videos")}><Play className="w-4 h-4 mr-2"/>{BRAND.heroCtaText}</Button>
          <Button variant="outline" className="rounded-2xl" onClick={()=>setPage("shop")}><ShoppingBag className="w-4 h-4 mr-2"/>Shop</Button>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <div className="aspect-video rounded-2xl overflow-hidden shadow">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_IDS[0] || "NWdkLn6uDN4"}`}
            title="Featured video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </motion.div>
    </section>
  );
}

function FeaturedVideos({ onOpen }: { onOpen: (id:string)=>void }) {
  return (
    <section className="mt-14">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Recent Messages</h2>
        <Button variant="ghost" className="rounded-2xl" onClick={()=>onOpen(YOUTUBE_VIDEO_IDS[1] || "dQw4w9WgXcQ")}>
          <Play className="w-4 h-4 mr-2"/>Play one
        </Button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(YOUTUBE_VIDEO_IDS.length ? YOUTUBE_VIDEO_IDS : ["dQw4w9WgXcQ","ysz5S6PUM-U","aqz-KE-bpKQ"]).slice(0,6).map((id) => (
          <Card key={id} className="rounded-2xl overflow-hidden">
            <CardContent className="p-0">
              <button className="w-full text-left" onClick={()=>onOpen(id)}>
                <img src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`} alt="Video thumbnail" className="w-full aspect-video object-cover"/>
              </button>
              <div className="p-4">
                <div className="font-semibold truncate">Video Title (auto from YouTube later)</div>
                <div className="text-sm text-slate-500">Click to watch</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function VideoGallery({ onOpen }: { onOpen: (id:string)=>void }) {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-6">Video Gallery</h2>

      {/* Optional Playlist Embed */}
      {PLAYLIST_ID && (
        <div className="mb-8">
          <div className="aspect-video rounded-2xl overflow-hidden shadow">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/videoseries?list=${PLAYLIST_ID}`}
              title="YouTube Playlist"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(YOUTUBE_VIDEO_IDS.length ? YOUTUBE_VIDEO_IDS : ["dQw4w9WgXcQ","ysz5S6PUM-U","aqz-KE-bpKQ","e-ORhEE9VVg","J---aiyznGQ","kXYiU_JCYtU"]).map((id) => (
          <Card key={id} className="rounded-2xl overflow-hidden">
            <CardContent className="p-0">
              <button className="w-full text-left" onClick={()=>onOpen(id)}>
                <img src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`} alt="Video thumbnail" className="w-full aspect-video object-cover"/>
              </button>
              <div className="p-4">
                <div className="font-semibold truncate">Video Title</div>
                <div className="text-sm text-slate-500">YouTube</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Shop() {
  return (
    <section>
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold">Shop</h2>
          <p className="text-slate-600">Support the ministry with uplifting merch.</p>
        </div>
        <Button className="rounded-2xl"><ShoppingBag className="w-4 h-4 mr-2"/>View Cart</Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SHOP_ITEMS.map((item) => (
          <Card key={item.id} className="rounded-2xl overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative">
                <img src={item.img} alt={item.title} className="w-full aspect-square object-cover"/>
                <span className="absolute top-3 left-3 text-xs bg-white/90 rounded-full px-2 py-1 shadow">{item.tag}</span>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-base">{item.title}</CardTitle>
              <div className="flex items-center justify-between mt-2">
                <div className="font-semibold">{item.price}</div>
                <Button className="rounded-xl" variant="outline">Add to Cart</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="text-xs text-slate-500 mt-4">Tip: Hook this up to Shopify, Etsy, or Stripe Checkout later.</p>
    </section>
  );
}

function About() {
  return (
    <section className="grid lg:grid-cols-2 gap-8">
      <div>
        <h2 className="text-3xl font-bold">About the Ministry</h2>
        <p className="mt-4 text-slate-600">Hi! I’m <strong>YOUR WIFE’S NAME</strong>. I create weekly YouTube messages to encourage believers and share the hope of Jesus. This site gathers those messages in one place and offers ways to support the work.</p>
        <div className="mt-6 p-5 rounded-2xl bg-slate-100">
          <h3 className="font-semibold">Statement of Faith</h3>
          <ul className="list-disc pl-5 mt-2 text-slate-700 space-y-1">
            <li>The Bible is the inspired and authoritative Word of God.</li>
            <li>Salvation is by grace through faith in Jesus Christ.</li>
            <li>We are called to love God and love people.</li>
          </ul>
        </div>
      </div>
      <div>
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Speaking & Collaborations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-slate-600">
            <p>Invite me to share a message at your church, event, or podcast. I also welcome collaborations with Christian creators and small businesses.</p>
            <Button className="rounded-2xl" variant="outline"><Mail className="w-4 h-4 mr-2"/>Request Info</Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl mt-6">
          <CardHeader>
            <CardTitle>Scripture of the Day</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-700 italic">“Be strong and courageous… for the Lord your God is with you wherever you go.” — Joshua 1:9</CardContent>
        </Card>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="grid lg:grid-cols-2 gap-8">
      <div>
        <h2 className="text-3xl font-bold">Contact</h2>
        <p className="mt-2 text-slate-600">Have a testimony to share, a question, or a prayer request? We’d love to hear from you.</p>
        <form className="mt-6 grid gap-3" onSubmit={(e)=>{e.preventDefault(); alert("Thanks! We’ll reply soon.");}}>
          <Input placeholder="Your name" required className="rounded-xl"/>
          <Input type="email" placeholder="Your email" required className="rounded-xl"/>
          <Textarea placeholder="Your message or prayer request" rows={6} required className="rounded-xl"/>
          <Button type="submit" className="rounded-2xl"><Send className="w-4 h-4 mr-2"/>Send</Button>
        </form>
      </div>
      <div>
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Mailing Address</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-600">
            <p>PO Box 123 • Your City, ST 00000</p>
            <p className="mt-2">Business inquiries: <a className="underline" href="mailto:hello@example.com">hello@example.com</a></p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl mt-6">
          <CardHeader>
            <CardTitle>Invite to Speak</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-600">
            <p>Use the form to outline your event date, location, audience size, and topic focus. We’ll respond promptly.</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function Donate() {
  return (
    <section className="max-w-2xl">
      <h2 className="text-3xl font-bold">Partner With Us</h2>
      <p className="mt-2 text-slate-600">If the messages bless you, prayerfully consider supporting the ministry.</p>
      <div className="mt-6 grid sm:grid-cols-3 gap-4">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base">One-time Gift</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full rounded-2xl" onClick={()=>alert("Connect to Stripe Checkout or PayPal")}>Give</Button>
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base">Monthly Partner</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full rounded-2xl" variant="outline" onClick={()=>alert("Set up recurring via Stripe Billing")}>Subscribe</Button>
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base">Prayer Support</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full rounded-2xl" variant="ghost" onClick={()=>window.scrollTo({top:0, behavior:'smooth'})}>Share a Request</Button>
          </CardContent>
        </Card>
      </div>
      <p className="text-xs text-slate-500 mt-4">* All gifts are appreciated. Consult a tax professional regarding deductibility.</p>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="mt-16">
      <Card className="rounded-2xl overflow-hidden">
        <CardContent className="p-6 md:p-10 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="text-2xl font-bold">Get Encouragement in Your Inbox</h3>
            <p className="text-slate-600 mt-2">Join for new videos, devotionals, and shop updates. No spam—unsubscribe anytime.</p>
            <form className="mt-4 flex gap-2" onSubmit={(e)=>{e.preventDefault(); alert("Subscribed!");}}>
              <Input type="email" placeholder="Your email" required className="rounded-2xl"/>
              <Button type="submit" className="rounded-2xl"><Mail className="w-4 h-4 mr-2"/>Subscribe</Button>
            </form>
          </div>
          <div className="hidden md:block">
            <div className="aspect-video rounded-xl bg-gradient-to-br from-indigo-100 to-pink-100 grid place-content-center">
              <Play className="w-10 h-10"/>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function Testimonies() {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-4">Testimonies</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {["A.","B.","C."].map((n, i)=> (
          <Card key={i} className="rounded-2xl">
            <CardContent className="p-5 text-slate-700">
              <p>“These messages lifted my faith during a hard season.”</p>
              <p className="mt-3 text-sm text-slate-500">— Sister {n}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function VideoModal({ videoId, onClose }: { videoId: string | null, onClose: ()=>void }) {
  return (
    <AnimatePresence>
      {videoId && (
        <motion.div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 grid place-items-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div className="w-full max-w-3xl" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e)=>e.stopPropagation()}>
            <div className="aspect-video rounded-xl overflow-hidden shadow-xl">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className="flex justify-end mt-3">
              <Button variant="secondary" className="rounded-xl" onClick={onClose}>Close</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Footer({ setPage }: { setPage: (page: string) => void }) {
  return (
    <footer className="mt-16 border-t">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid md:grid-cols-4 gap-6 text-sm">
        <div>
          <div className="font-bold">{BRAND.name}</div>
          <p className="text-slate-500 mt-2">{BRAND.tagline}</p>
        </div>
        <div>
          <div className="font-semibold">Explore</div>
          <ul className="mt-2 text-slate-600 space-y-1">
            {NAV.map(n => (
              <li key={n.key}><button className="hover:underline" onClick={()=>setPage(n.key)}>{n.label}</button></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-semibold">Ministry</div>
          <ul className="mt-2 text-slate-600 space-y-1">
            <li><button className="hover:underline" onClick={()=>setPage("about")}>Statement of Faith</button></li>
            <li><button className="hover:underline" onClick={()=>setPage("donate")}>Partner / Give</button></li>
            <li><a className="hover:underline" href="#" onClick={(e)=>e.preventDefault()}>Privacy</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold">Stay Connected</div>
          <form className="mt-2 flex gap-2" onSubmit={(e)=>{e.preventDefault(); alert("Subscribed!");}}>
            <Input type="email" placeholder="Email address" className="rounded-xl"/>
            <Button type="submit" className="rounded-xl">Join</Button>
          </form>
        </div>
      </div>
      <div className="text-center text-xs text-slate-500 pb-8">© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</div>
    </footer>
  );
}