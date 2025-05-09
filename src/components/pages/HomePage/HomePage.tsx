import ArticleStoriesMore from '@/components/pages/HomePage/ArticleStoriesMore';
import Banner from '@/components/pages/HomePage/Banner';
import FeaturedTradies from '@/components/pages/HomePage/FeaturedTradies';
import Footer from '@/components/pages/HomePage/Footer';
import PopularAds from '@/components/pages/HomePage/PopularAds';
import PopularServices from '@/components/pages/HomePage/PopularServices';

const HomePage = () => {
  return (
    <>
      <div>
        <div className="max-w-[1200px] mx-auto">
          <Banner  />
        </div>
        <div className="max-w-[1512] ">
        <PopularAds />
          <FeaturedTradies />
          <PopularServices />
          <ArticleStoriesMore />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
