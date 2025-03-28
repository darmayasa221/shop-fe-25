import HeroSection from "../components/home/HeroSection";
import FeaturedProducts from "../components/home/FeaturedProducts";
import CategorySection from "../components/home/CategorySection";
import PromoBanner from "../components/home/PromoBanner";
import FeaturedBlogPosts from "../components/home/FeaturedBlogPosts";
import NewsletterSignup from "../components/home/NewsletterSignup";
import Testimonials from "../components/home/Testimonials";
import FeatureHighlights from "../components/home/FeatureHighlights";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FeatureHighlights />
      <FeaturedProducts />
      <PromoBanner />
      <CategorySection />
      <Testimonials />
      <FeaturedBlogPosts />
      <NewsletterSignup />
    </div>
  );
};

export default HomePage;
