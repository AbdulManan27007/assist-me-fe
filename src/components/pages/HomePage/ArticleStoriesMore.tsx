import { Button } from '@/components/ui/button';

// Add proper TypeScript interface for articles
interface Article {
  title: string;
  description: string;
  image: string;
}

const ArticleStoriesMore = () => {
  // Type the articles array with the interface
  const articles: Article[] = [
    {
      title: 'Lorem ipsum dolor sit amet',
      description:
        'Lorem ipsum dolor sit amet consectetur. Non amet non lectus etiam sit. Nisl sollicitudin euismod purus eget. Euismod ',
      image: '/images/article1.jpeg',
    },
    {
      title: 'Lorem ipsum dolor sit amet',
      description:
        'Lorem ipsum dolor sit amet consectetur. Non amet non lectus etiam sit. Nisl sollicitudin euismod purus eget. Euismod ',
      image: '/images/article2.jpeg',
    },
    {
      title: 'Lorem ipsum dolor sit amet',
      description:
        'Lorem ipsum dolor sit amet consectetur. Non amet non lectus etiam sit. Nisl sollicitudin euismod purus eget. Euismod ',
      image: '/images/article3.jpeg',
    },
  ];

  return (
    <div className="my-4 sm:my-[22px] px-4">
      <h3 className="text-black text-3xl sm:text-4xl md:text-5xl font-semibold">
        Articles, Stories and more
      </h3>

      <div className="mt-8 sm:mt-[62px] pb-10 sm:pb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-3">
        {articles.map((article, index) => (
          <div
            key={index}
            className="bg-[#D9D9D9] rounded-[9.764px] overflow-hidden shadow-custom-soft transition-transform hover:scale-[1.02]"
          >
            <div className="rounded-[9.764px] overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-[188.442px] object-cover object-center"
                loading="lazy"
              />
            </div>
            <div className="p-6 sm:pl-8 sm:pr-[17.968px] sm:pt-[23.323px] sm:pb-[22.019px] flex flex-col gap-3 sm:gap-[2.74px]">
              <h4 className="font-medium text-[#1E1E1E] text-lg sm:text-base">
                {article.title}
              </h4>
              <p className="text-sm text-[#2b2b2b]">{article.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleStoriesMore;
