import type { CommunityPost } from "../types/community.ts";


export const communityPosts: CommunityPost[] = [
  {
    id: 1,
    userName: "Rahul Sharma",
    userAvatar: "https://i.pravatar.cc/150?img=12",
    category: "Trading Cards",
    image:
      "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=800&q=80",
    caption:
      "Finally added this beautiful vintage Pokémon card to my collection!",
    likes: 124,
    comments: 18,
    createdAt: "2026-08-12",
  },
  {
    id: 2,
    userName: "Sneha Roy",
    userAvatar: "https://i.pravatar.cc/150?img=45",
    category: "Watches",
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&q=80",
    caption:
      "Found this amazing limited edition watch at a collector's meetup.",
    likes: 89,
    comments: 12,
    createdAt: "2026-08-11",
  },
  {
    id: 3,
    userName: "Arjun Mehta",
    userAvatar: "https://i.pravatar.cc/150?img=33",
    category: "Cameras",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    caption:
      "Vintage cameras have a completely different charm. What do you think?",
    likes: 76,
    comments: 9,
    createdAt: "2026-08-10",
  },
  {
    id: 4,
    userName: "Priya Das",
    userAvatar: "https://i.pravatar.cc/150?img=47",
    category: "Coins",
    image:
      "https://images.unsplash.com/photo-1605792657660-596af9009e82?auto=format&fit=crop&w=800&q=80",
    caption:
      "Sharing a few coins from my growing historical collection.",
    likes: 102,
    comments: 15,
    createdAt: "2026-08-09",
  },
];