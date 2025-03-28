import { BlogPost, BlogCategory, BlogComment } from "../types/blog";

// Mock blog authors
const blogAuthors = [
  {
    id: "author1",
    name: "Jane Smith",
    avatar: "/images/authors/jane-smith.jpg",
    bio: "Jane is a fashion enthusiast with over 10 years of experience in the industry.",
  },
  {
    id: "author2",
    name: "John Doe",
    avatar: "/images/authors/john-doe.jpg",
    bio: "John is a tech expert who loves to write about the latest gadgets and technology trends.",
  },
  {
    id: "author3",
    name: "Emily Johnson",
    avatar: "/images/authors/emily-johnson.jpg",
    bio: "Emily is a lifestyle blogger who shares tips on sustainable living and wellness.",
  },
];

// Mock blog posts
const blogPosts: BlogPost[] = [
  {
    id: "post1",
    title: "Top 10 Summer Fashion Trends",
    slug: "top-10-summer-fashion-trends",
    excerpt:
      "Discover the hottest fashion trends for this summer season that will keep you stylish and comfortable.",
    content: `
# Top 10 Summer Fashion Trends

Summer is here, and it's time to refresh your wardrobe with the latest fashion trends. This season is all about bold colors, comfortable fabrics, and sustainable choices.

## 1. Linen Everything

Linen has become the go-to fabric for summer. It's breathable, sustainable, and gives that effortlessly chic look. From linen shirts to dresses and pants, this fabric is dominating summer collections.

## 2. Vibrant Colors

Say goodbye to neutrals this season. Bold, vibrant colors are taking center stage. Think electric blues, sunset oranges, and neon greens. Don't be afraid to mix and match these bright hues for a fun summer look.

## 3. Oversized Shirts

The oversized shirt trend continues to reign supreme. Pair a loose-fitting button-down with shorts or wear it as a beach cover-up. Versatility is key with this trend.

## 4. Crochet Items

Handcrafted crochet pieces are making a big comeback. From tops to beach bags, this trend adds a touch of nostalgia and craftsmanship to your summer wardrobe.

## 5. Platform Sandals

Give your summer footwear a lift with platform sandals. They're comfortable, stylish, and add height without the discomfort of heels.

## 6. Sustainable Swimwear

Eco-friendly swimwear made from recycled materials is not just better for the planet but also trending this summer. Look for brands that prioritize sustainability without compromising on style.

## 7. Maxi Dresses

Flowy, comfortable maxi dresses are perfect for hot summer days. They're easy to style and can transition from day to night with the right accessories.

## 8. Statement Sunglasses

Make a statement with bold, oversized sunglasses. They not only protect your eyes but also add a touch of glamour to any summer outfit.

## 9. Natural Accessories

Accessories made from natural materials like straw, wood, and raffia are everywhere this summer. Think straw hats, wooden jewelry, and raffia bags.

## 10. Wide-Leg Pants

Comfort meets style with wide-leg pants. They're breezy, flattering, and can be dressed up or down for any summer occasion.

Remember, the best fashion trend is wearing what makes you feel comfortable and confident. Mix and match these trends to create a summer wardrobe that reflects your personal style.
    `,
    featuredImage: "/images/blog/summer-fashion.jpg",
    category: "fashion",
    tags: ["summer", "fashion", "trends", "style"],
    author: blogAuthors[0],
    publishDate: new Date("2024-06-15"),
    comments: [
      {
        id: "comment1",
        author: "Sarah Miller",
        email: "sarah@example.com",
        content:
          "Love these trends! Can't wait to try the linen looks this summer.",
        date: new Date("2024-06-16"),
      },
      {
        id: "comment2",
        author: "Michael Brown",
        email: "michael@example.com",
        content:
          "Great article! Would love to see some specific brand recommendations for sustainable swimwear.",
        date: new Date("2024-06-17"),
        replies: [
          {
            id: "reply1",
            author: "Jane Smith",
            email: "jane@example.com",
            content:
              "Thanks for the suggestion, Michael! I'll put together a list of my favorite sustainable swimwear brands in an upcoming post.",
            date: new Date("2024-06-18"),
          },
        ],
      },
    ],
    featured: true,
  },
  {
    id: "post2",
    title: "The Future of Smart Home Technology",
    slug: "future-of-smart-home-technology",
    excerpt:
      "Explore how smart home technology is revolutionizing our daily lives and what innovations to expect in the coming years.",
    content: `
# The Future of Smart Home Technology

Smart home technology has come a long way in the past decade, transforming our living spaces into connected, intelligent environments. From voice-controlled assistants to automated security systems, these technologies are making our homes more convenient, efficient, and secure.

## Current Smart Home Landscape

Today's smart homes feature a variety of connected devices:

- **Smart Speakers and Voice Assistants**: Devices like Amazon Echo and Google Home have become central hubs for controlling other smart devices through voice commands.
- **Connected Lighting**: Smart bulbs and lighting systems that can be controlled remotely, programmed on schedules, or respond to specific triggers.
- **Smart Thermostats**: Devices that learn your preferences and automatically adjust temperature settings for comfort and energy efficiency.
- **Security Systems**: Connected doorbell cameras, motion sensors, and smart locks that enhance home security and allow remote monitoring.
- **Smart Appliances**: Refrigerators, washers, dryers, and other appliances that can be controlled remotely and provide status updates.

## Emerging Trends

As we look to the future, several exciting trends are emerging in smart home technology:

### 1. AI-Powered Predictive Automation

Future smart homes will go beyond simple automation to predictive behaviors. AI systems will learn your habits and preferences to anticipate your needs before you even need to ask. Your home might start brewing coffee when it detects you've awakened, adjust lighting based on your mood detected through voice analysis, or prepare your home for your arrival by analyzing your location and traffic patterns.

### 2. Enhanced Energy Management

Smart homes will become increasingly efficient at managing energy consumption. Advanced systems will integrate with solar panels, home batteries, and the power grid to optimize energy usage, potentially reducing costs and environmental impact. They'll adjust consumption based on real-time electricity pricing and weather forecasts.

### 3. Health Monitoring Integration

The next generation of smart homes will incorporate health monitoring capabilities. Smart mirrors might analyze your skin condition, toilets could perform basic health analysis, and beds could monitor sleep quality and vital signs. This data could be securely shared with healthcare providers for improved preventative care.

### 4. Seamless Connectivity and Interoperability

One of the biggest challenges in current smart home setups is the lack of universal compatibility between devices from different manufacturers. The future will bring improved standards for interoperability, allowing devices to work together seamlessly regardless of brand.

### 5. Enhanced Security and Privacy

As homes become more connected, security and privacy concerns grow as well. Future smart home technology will incorporate advanced encryption, biometric authentication, and granular privacy controls to protect your data and home from unauthorized access.

## Challenges to Overcome

Despite the promising future, several challenges need to be addressed:

- **Privacy Concerns**: Smart homes collect vast amounts of personal data, raising questions about who has access to this information and how it's used.
- **Security Vulnerabilities**: Connected devices can create entry points for hackers if not properly secured.
- **Digital Divide**: As homes become more technology-dependent, ensuring equitable access to these innovations becomes important.
- **Obsolescence**: With rapidly evolving technology, managing the lifecycle and eventual obsolescence of smart devices is a consideration.

The future of smart home technology is bright and full of possibilities. As these technologies continue to evolve, they promise to make our homes more responsive, efficient, and attuned to our needs than ever before.
    `,
    featuredImage: "/images/blog/smart-home.jpg",
    category: "technology",
    tags: ["smart home", "technology", "IoT", "automation"],
    author: blogAuthors[1],
    publishDate: new Date("2024-06-10"),
    comments: [
      {
        id: "comment3",
        author: "David Wilson",
        email: "david@example.com",
        content:
          "I'm particularly interested in the health monitoring aspects. Do you think there are privacy concerns with that type of data collection?",
        date: new Date("2024-06-11"),
      },
    ],
    featured: true,
  },
  {
    id: "post3",
    title: "5 Easy Ways to Create a Sustainable Home",
    slug: "5-easy-ways-sustainable-home",
    excerpt:
      "Simple and practical tips to make your home more eco-friendly and reduce your environmental footprint.",
    content: `
# 5 Easy Ways to Create a Sustainable Home

Creating an eco-friendly home doesn't have to be complicated or expensive. By making a few simple changes to your daily habits and home setup, you can significantly reduce your environmental footprint while creating a healthier living space.

## 1. Reduce Energy Consumption

One of the most effective ways to make your home more sustainable is to minimize energy usage:

- **Switch to LED bulbs**: They use up to 75% less energy than traditional incandescent bulbs and last much longer.
- **Install a programmable thermostat**: This can reduce your heating and cooling costs by automatically adjusting temperatures when you're away or sleeping.
- **Unplug electronics when not in use**: Many devices continue to draw power even when turned off. Use power strips to easily disconnect multiple devices at once.
- **Opt for ENERGY STAR appliances**: When it's time to replace appliances, choose energy-efficient models that consume less electricity and water.

## 2. Conserve Water

Water conservation is another critical aspect of sustainable living:

- **Fix leaks promptly**: Even small leaks can waste significant amounts of water over time.
- **Install low-flow fixtures**: Low-flow showerheads and faucet aerators can reduce water usage without sacrificing performance.
- **Collect rainwater**: Use rain barrels to collect water for gardens and plants.
- **Choose drought-resistant plants**: Native plants adapted to your local climate typically require less water and maintenance.

## 3. Reduce, Reuse, Recycle

Minimizing waste is fundamental to sustainable living:

- **Set up a comprehensive recycling station**: Make it easy to sort paper, plastic, glass, and metal.
- **Start composting**: Kitchen scraps and yard waste can be turned into nutrient-rich soil for your garden.
- **Choose reusable alternatives**: Replace disposable items with reusable ones, such as cloth napkins, glass food containers, and reusable shopping bags.
- **Repurpose items**: Before discarding something, consider if it can be repurposed or upcycled into something useful.

## 4. Use Eco-Friendly Materials

The materials in your home can have a significant environmental impact:

- **Choose non-toxic cleaning products**: Many conventional cleaning products contain harmful chemicals. Opt for eco-friendly alternatives or make your own using simple ingredients like vinegar and baking soda.
- **Select sustainable furniture and decor**: Look for items made from reclaimed wood, bamboo, or other sustainable materials.
- **Use low-VOC or no-VOC paints**: These paints release fewer volatile organic compounds, improving indoor air quality.
- **Consider natural flooring options**: Materials like bamboo, cork, or reclaimed wood are renewable and often more environmentally friendly than synthetic alternatives.

## 5. Create Green Spaces

Adding plants to your home and yard provides multiple benefits:

- **Grow indoor plants**: They improve air quality by filtering toxins and producing oxygen.
- **Plant a vegetable garden**: Growing your own food reduces transportation emissions and packaging waste.
- **Create wildlife-friendly yards**: Native plants, bird feeders, and water sources can support local biodiversity.
- **Reduce lawn size**: Replace portions of your lawn with native plants, vegetable gardens, or wildflower meadows that require less water and maintenance.

Remember, sustainability is a journey rather than a destination. Start with changes that feel manageable, and gradually incorporate more eco-friendly practices into your home and lifestyle. Even small steps make a difference when it comes to creating a more sustainable future.
    `,
    featuredImage: "/images/blog/sustainable-home.jpg",
    category: "lifestyle",
    tags: ["sustainability", "eco-friendly", "green living", "home"],
    author: blogAuthors[2],
    publishDate: new Date("2024-06-05"),
    comments: [
      {
        id: "comment4",
        author: "Lisa Johnson",
        email: "lisa@example.com",
        content:
          "These are great tips! I've been trying to reduce plastic use in my home and it's made a big difference already.",
        date: new Date("2024-06-06"),
      },
      {
        id: "comment5",
        author: "Robert Chen",
        email: "robert@example.com",
        content:
          "I never thought about collecting rainwater. Is there any special equipment needed for that?",
        date: new Date("2024-06-07"),
        replies: [
          {
            id: "reply2",
            author: "Emily Johnson",
            email: "emily@example.com",
            content:
              "Hi Robert! You can start with a simple rain barrel connected to your gutter downspout. Many garden centers sell them, or you can find DIY guides online to make your own from food-grade containers.",
            date: new Date("2024-06-08"),
          },
        ],
      },
    ],
    featured: false,
  },
  {
    id: "post4",
    title: "E-commerce Strategies for Small Businesses",
    slug: "ecommerce-strategies-small-businesses",
    excerpt:
      "Effective e-commerce strategies that small businesses can implement to compete in the digital marketplace.",
    content: `
# E-commerce Strategies for Small Businesses

In today's digital economy, having a strong e-commerce presence is essential for small businesses looking to grow and compete. While established giants like Amazon dominate the landscape, small businesses can carve out their own success through strategic approaches tailored to their unique strengths.

## Understanding Your Niche

The first step to e-commerce success is identifying and understanding your specific niche:

- **Market Research**: Analyze your target audience's needs, behaviors, and preferences. Tools like Google Analytics, social media insights, and customer surveys can provide valuable data.
- **Competitor Analysis**: Study similar businesses to identify gaps in the market that you can fill.
- **Unique Value Proposition**: Clearly define what makes your business different from competitors. Is it product quality, specialized knowledge, exceptional service, or something else?

## Building an Effective Online Store

Your e-commerce website is your digital storefront and should be designed with care:

- **User Experience (UX)**: Create a website that's intuitive, responsive, and easy to navigate across all devices.
- **Product Presentation**: Use high-quality images, detailed descriptions, and if possible, videos or 360° views of products.
- **Simplified Checkout**: Reduce cart abandonment by streamlining the checkout process. Offer guest checkout options and multiple payment methods.
- **Site Speed**: Optimize your website's loading speed, as even small delays can significantly impact conversion rates.

## Marketing Strategies for Small E-commerce Businesses

With limited budgets, small businesses need to be strategic about their marketing efforts:

### Content Marketing

Develop valuable content that positions you as an authority in your field:
- Blog posts addressing customer pain points
- How-to guides and tutorials
- Behind-the-scenes content showcasing your process
- Customer stories and testimonials

### Social Media Marketing

Leverage social platforms where your target audience spends time:
- Consistent posting schedule with engaging content
- Building community through conversations, not just promotions
- User-generated content campaigns
- Live videos for product demonstrations or Q&A sessions

### Email Marketing

Email remains one of the most effective marketing channels:
- Welcome sequences for new subscribers
- Abandoned cart recovery emails
- Personalized product recommendations
- Exclusive offers for subscribers

### Search Engine Optimization (SEO)

Improve your visibility in search results:
- Keyword research for product descriptions and content
- Local SEO strategies for businesses with physical locations
- Technical SEO to ensure your site is easily crawlable
- Quality backlinks from reputable sites

## Customer Retention Strategies

Acquiring new customers costs more than retaining existing ones. Focus on:

- **Loyalty Programs**: Reward repeat customers with points, discounts, or exclusive offers.
- **Personalized Experience**: Use data to tailor recommendations and communications.
- **Exceptional Customer Service**: Respond quickly to inquiries and resolve issues promptly.
- **Post-Purchase Follow-up**: Request feedback, provide care instructions, or suggest complementary products.

## Leveraging Technology

The right technology can level the playing field:

- **Automation**: Use tools to automate repetitive tasks like inventory management, email marketing, and order fulfillment.
- **Analytics**: Regularly review data to understand customer behavior and optimize accordingly.
- **AI and Personalization**: Implement AI-powered recommendation engines to enhance the shopping experience.
- **Mobile Commerce**: Ensure your site is optimized for mobile, including one-click purchasing and mobile payment options.

## Sustainable Growth Strategies

Plan for long-term success:

- **Scalable Infrastructure**: Choose e-commerce platforms and systems that can grow with your business.
- **Inventory Management**: Balance stock levels to avoid both stockouts and excess inventory.
- **Diversification**: Consider multiple revenue streams, such as subscription models or service add-ons.
- **Strategic Partnerships**: Collaborate with complementary businesses to expand your reach.

Remember, successful e-commerce isn't about competing directly with large corporations but leveraging your unique strengths as a small business: personalization, agility, community connection, and specialized expertise. By focusing on these advantages and implementing targeted strategies, small businesses can thrive in the digital marketplace.
    `,
    featuredImage: "/images/blog/ecommerce-strategy.jpg",
    category: "business",
    tags: ["e-commerce", "small business", "digital marketing", "online sales"],
    author: blogAuthors[1],
    publishDate: new Date("2024-06-01"),
    comments: [],
    featured: false,
  },
  {
    id: "post5",
    title: "Travel Essentials: What to Pack for Your Next Adventure",
    slug: "travel-essentials-packing-guide",
    excerpt:
      "A comprehensive packing guide to ensure you have everything you need for a smooth and enjoyable travel experience.",
    content: `
# Travel Essentials: What to Pack for Your Next Adventure

Packing for a trip can be both exciting and stressful. Pack too little, and you might find yourself without necessities; pack too much, and you'll be burdened with heavy luggage. This guide will help you strike the perfect balance, ensuring you have everything you need without overpacking.

## The Basics: Documents and Money

No matter where you're headed, these items are non-negotiable:

- **Passport and Visas**: Ensure your passport is valid for at least six months beyond your return date. Check visa requirements well in advance.
- **Travel Insurance Information**: Carry both digital and physical copies of your policy.
- **Payment Methods**: Bring a mix of payment options - credit cards, debit cards, and some local currency.
- **Reservation Confirmations**: Have digital or printed copies of all hotel, transportation, and activity bookings.
- **Emergency Contacts**: Include embassy information, local emergency numbers, and contacts back home.

## Clothing and Footwear

Adapt this list based on your destination's climate and your planned activities:

### Clothing Strategy:
- **Layer-friendly pieces**: Thin layers are versatile for various weather conditions.
- **Neutral colors**: Items that can be mixed and matched to create multiple outfits.
- **Wrinkle-resistant fabrics**: To maintain a neat appearance without access to an iron.

### Basic Clothing Checklist:
- Underwear and socks (1 pair per day plus 2-3 extras)
- 3-5 T-shirts or casual tops
- 2-3 long-sleeve shirts or light sweaters
- 1-2 pairs of pants/jeans
- 1-2 pairs of shorts or skirts (weather-dependent)
- 1 lightweight jacket or fleece
- 1 raincoat or travel umbrella
- 1 formal outfit (if needed)
- Sleepwear
- Swimwear (if applicable)
- Exercise clothes (if you plan to work out)

### Footwear:
- Comfortable walking shoes (already broken in)
- Sandals or flip-flops (for beach/shower)
- Dressier shoes (if needed, limit to one pair)

## Toiletries and Personal Care

Travel-sized versions of your essentials:

- Toothbrush and toothpaste
- Shampoo and conditioner
- Body wash or soap
- Deodorant
- Skincare products
- Sunscreen
- Lip balm with SPF
- Insect repellent
- Hand sanitizer
- First aid kit (bandages, antiseptic wipes, pain relievers, any prescription medications)
- Personal medications (in original containers with prescriptions)
- Contact lenses and solution (if applicable)
- Feminine hygiene products (if applicable)

## Technology and Electronics

Consider your needs carefully to avoid carrying unnecessary gadgets:

- Smartphone and charger
- Camera (if your phone camera isn't sufficient)
- Power bank
- Universal travel adapter
- Headphones
- E-reader or tablet (optional)
- Laptop (only if absolutely necessary)

## Travel Accessories

These items can enhance your comfort and convenience:

- Travel pillow and eye mask
- Earplugs or noise-canceling headphones
- Reusable water bottle (empty before security)
- Day bag or collapsible backpack
- Packing cubes (to keep luggage organized)
- Luggage locks
- Travel clothesline
- Quick-dry travel towel
- Ziplock bags (for liquids, wet items, or organization)

## Destination-Specific Items

Adjust your packing list based on your specific destination and planned activities:

### Beach Vacation:
- Multiple swimsuits
- Beach cover-up
- Beach towel
- Sun hat
- Sunglasses
- Stronger sunscreen
- After-sun lotion

### Cold Weather Destination:
- Thermal underwear
- Heavy sweaters
- Winter coat
- Gloves or mittens
- Warm hat
- Scarf
- Wool socks
- Snow boots
- Lip balm and moisturizer (for dry air)

### Urban Exploration:
- Comfortable but stylish walking shoes
- Cross-body bag or theft-proof backpack
- City map or offline maps app
- Portable Wi-Fi device (if needed)

### Wilderness Adventure:
- Appropriate hiking boots
- Moisture-wicking clothing
- Water filtration system
- Navigation tools
- First aid kit with wilderness-specific supplies
- Emergency blanket
- Multi-tool

## Packing Tips

Maximize space and minimize wrinkles with these techniques:

1. **Roll clothing** instead of folding to save space and reduce wrinkles.
2. **Use packing cubes** to organize clothes by category or outfit.
3. **Fill empty spaces** strategically: stuff socks in shoes, use corners for small items.
4. **Place heavy items** at the bottom of wheeled luggage (near the wheels).
5. **Keep liquids accessible** for airport security checks.
6. **Wear your bulkiest items** on travel days to save luggage space.

Remember, the best packing strategy is one that fits your personal travel style and specific trip needs. Before finalizing your packing list, research your destination's weather forecast, cultural norms, and any specific requirements for activities you've planned. And always leave a little extra space in your luggage for souvenirs!
    `,
    featuredImage: "/images/blog/travel-packing.jpg",
    category: "travel",
    tags: ["travel", "packing", "vacation", "adventure"],
    author: blogAuthors[0],
    publishDate: new Date("2024-05-25"),
    comments: [
      {
        id: "comment6",
        author: "Thomas Green",
        email: "thomas@example.com",
        content:
          "Great list! I would add a portable door lock for solo travelers - it's a small device that adds extra security to hotel rooms.",
        date: new Date("2024-05-26"),
      },
    ],
    featured: false,
  },
];

// Get all blog posts
export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [...blogPosts].sort(
    (a, b) => b.publishDate.getTime() - a.publishDate.getTime()
  );
};

// Get blog post by slug
export const getBlogPostBySlug = async (
  slug: string
): Promise<BlogPost | undefined> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return blogPosts.find((post) => post.slug === slug);
};

// Get blog posts by category
export const getBlogPostsByCategory = async (
  category: BlogCategory
): Promise<BlogPost[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400));
  return [...blogPosts]
    .filter((post) => post.category === category)
    .sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
};

// Get featured blog posts
export const getFeaturedBlogPosts = async (): Promise<BlogPost[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [...blogPosts]
    .filter((post) => post.featured)
    .sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
};

// Get recent blog posts
export const getRecentBlogPosts = async (
  limit: number = 3
): Promise<BlogPost[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [...blogPosts]
    .sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime())
    .slice(0, limit);
};

// Get all blog categories with counts
export const getBlogCategories = async (): Promise<
  { category: BlogCategory; count: number }[]
> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  const categories: BlogCategory[] = [
    "fashion",
    "technology",
    "lifestyle",
    "business",
    "travel",
  ];

  return categories.map((category) => ({
    category,
    count: blogPosts.filter((post) => post.category === category).length,
  }));
};

// Add a comment to a blog post
export const addBlogComment = async (
  postId: string,
  comment: Omit<BlogComment, "id" | "date" | "replies">
): Promise<BlogComment> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 600));

  const newComment: BlogComment = {
    id: `comment${Date.now()}`,
    author: comment.author,
    email: comment.email,
    content: comment.content,
    date: new Date(),
    replies: [],
  };

  // In a real app, this would update the database
  // Here we're just returning the new comment
  return newComment;
};
