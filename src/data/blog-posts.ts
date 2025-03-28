export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Top 5 Fishing Baits for Spring Bass",
    excerpt:
      "Discover the most effective baits for catching bass during the spring season.",
    content: `
# Top 5 Fishing Baits for Spring Bass

Spring is a prime time for bass fishing as the water temperature rises and bass become more active. Choosing the right bait can make all the difference in your fishing success. Here are our top 5 recommended baits for spring bass fishing:

## 1. Soft Plastic Worms

Soft plastic worms are incredibly versatile and effective, especially in spring. Their subtle movement in the water mimics natural prey and can entice even the most cautious bass. Try using darker colors in murky water and more translucent colors in clear water.

## 2. Spinner Baits

Spinner baits are excellent search baits that allow you to cover a lot of water quickly. The flash and vibration they produce can trigger reaction strikes from bass, making them particularly effective in slightly stained water.

## 3. Jerk Baits

As water temperatures start to rise in spring, jerk baits become increasingly effective. Their erratic, stop-and-go action imitates wounded baitfish, which is irresistible to hungry bass emerging from their winter slowdown.

## 4. Jigs

Jigs are perhaps the most versatile bass lures and work exceptionally well in spring when bass are near structure. A jig with a craw trailer can be deadly when fished slowly around rocks, fallen trees, or weed edges.

## 5. Topwater Frogs

Later in spring when bass are in shallow water and potentially guarding nests, topwater frogs can produce exciting strikes. They're particularly effective around lily pads, grass mats, and other surface vegetation.

Remember to adjust your retrieval speed and technique based on water temperature and bass activity level. In early spring when the water is still cool, slower presentations often work better.

Happy fishing!
    `,
    author: "Michael Thompson",
    date: "March 15, 2025",
    image: "https://m.media-amazon.com/images/I/81RSjCK8atL._AC_SL1200_.jpg",
    category: "Fishing Tips",
    tags: ["bass", "spring fishing", "baits", "techniques"],
  },
  {
    id: "2",
    title: "Understanding Different Types of Fishing Lures",
    excerpt:
      "A comprehensive guide to choosing the right lure for your fishing conditions.",
    content: `
# Understanding Different Types of Fishing Lures

Choosing the right lure can be overwhelming with so many options available. In this guide, we'll break down the main categories of fishing lures and when to use them.

## Spinners and Spinnerbaits

Characterized by metal blades that spin around a wire shaft, these lures create flash and vibration in the water. They're excellent for covering large areas and can be effective for many species including bass, pike, and trout.

## Crankbaits

These hard-bodied lures are designed to dive and wobble when retrieved. Available in various diving depths, crankbaits are versatile lures that can be used in many different fishing scenarios. They're particularly effective when fish are actively feeding.

## Soft Plastic Baits

Including worms, grubs, crawfish imitations, and more, soft plastics are among the most versatile lures. They can be rigged in numerous ways and are effective for nearly all predatory fish species. Their natural movement in water makes them irresistible to many fish.

## Topwater Lures

Designed to float and create disturbance on the water's surface, topwater lures can produce spectacular strikes. They're most effective in warmer months, during early morning or evening, or in low-light conditions.

## Jigs

Consisting of a weighted head and a hook disguised by hair, feathers, or a soft plastic body, jigs are excellent for presenting baits near the bottom. They're extremely versatile and can be used year-round for various species.

## Spoons

These simple metal lures wobble and flash as they're retrieved, imitating injured baitfish. They're effective in both freshwater and saltwater and can be used at various depths.

## Choosing the Right Lure

Consider these factors when selecting a lure:
- Water clarity and conditions
- Target fish species
- Time of day and weather
- Water depth and temperature
- Available natural food sources

Remember, there's no perfect lure for all situations. Experimentation and adaptation are key to successful fishing.
    `,
    author: "Sarah Rodriguez",
    date: "February 28, 2025",
    image: "https://m.media-amazon.com/images/I/81RSjCK8atL._AC_SL1200_.jpg",
    category: "Equipment",
    tags: ["lures", "equipment", "basics", "fishing tackle"],
  },
  {
    id: "3",
    title: "Night Fishing Techniques for Summer Bass",
    excerpt:
      "Learn how to catch more bass after dark during hot summer months.",
    content: `
# Night Fishing Techniques for Summer Bass

When summer temperatures soar, bass often become more active during the night. Night fishing presents unique challenges but can result in catching larger bass and more of them. Here's how to maximize your success.

## Why Fish at Night?

During hot summer months, bass often feed more actively at night when water temperatures are cooler. Additionally, there's typically less boat traffic and fishing pressure, creating a more peaceful experience and less skittish fish.

## Essential Gear for Night Fishing

- Headlamp or flashlights (preferably with red lens options)
- Glow-in-the-dark line markers or bobbers
- Reflective line
- Rod lights
- Extra batteries
- Bug spray
- Safety equipment

## Top Lures for Night Fishing

### Dark-Colored Soft Plastics

Large worms, creature baits, and crawfish imitations in dark colors (black, blue, or purple) create better silhouettes against the night sky when viewed from below.

### Noisy Topwater Lures

Buzzbaits, poppers, and walking baits that create noise and surface disturbance help bass locate your lure in the dark.

### Spinnerbaits with Large Colorado Blades

The thump and vibration from these lures help bass find them using their lateral line sense.

### Black Light-Reactive Lures

Some specialized night fishing lures glow under black light, making them more visible to both you and the fish.

## Techniques and Locations

Focus on areas where bass naturally feed at night:
- Points and drop-offs near shallow flats
- Lighted docks and marinas
- Bridge pilings
- Rocky shorelines

Use slower retrieves than you would during the day, giving bass more time to locate and strike your lure.

## Safety First

Always fish with a partner at night if possible. Inform someone of your location and expected return time. Keep your boat lights on and wear a life jacket. Prepare your boat and gear before darkness falls to minimize on-water complications.

Night fishing for bass offers a different and often rewarding experience that can help you catch more and bigger fish during the hot summer months.
    `,
    author: "David Chen",
    date: "January 12, 2025",
    image:
      "https://castaicfishing.com/wp-content/uploads/2020/07/nighttime-bass-fishing-sharer.webp",
    category: "Techniques",
    tags: ["night fishing", "summer", "bass", "advanced techniques"],
  },
];

export const getBlogPostById = (id: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.id === id);
};
