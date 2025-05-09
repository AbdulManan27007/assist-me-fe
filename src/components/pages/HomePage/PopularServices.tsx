// Define interfaces for type safety
interface Service {
  name: string;
  icon: string;
}

const PopularServices = () => {
  const services: Service[] = [
    {
      name: 'Plumbing',
      icon: '/icons/shower.svg',
    },
    {
      name: 'Cleaning',
      icon: '/icons/cleaning_services.svg',
    },
    {
      name: 'Handyman',
      icon: '/icons/home_repair_service.svg',
    },
    {
      name: 'Electrical work',
      icon: '/icons/lightbulb_2.svg',
    },
    {
      name: 'Painting',
      icon: '/icons/carpenter.svg',
    },
  ];

  return (
    <div className="my-8 sm:my-12 lg:my-16 px-4 sm:px-6 xl:px-0">
      <div className="rounded-xl bg-black-1 p-6 sm:p-8 lg:p-12">
        <h3 className="text-white-1 font-light text-3xl sm:text-4xl lg:text-5xl">
          Popular <span className="font-extrabold">services</span>
        </h3>

        <div className="mt-6 sm:mt-8 lg:mt-12 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 sm:p-5 lg:p-6 cursor-pointer transition-transform hover:scale-[1.02]"
            >
              <h4 className="text-black-1 font-bold text-base sm:text-lg truncate">
                {service.name}
              </h4>
              <div className="flex mt-4 sm:mt-5 lg:mt-6 w-full justify-end">
                <img
                  src={service.icon}
                  alt={`${service.name} icon`}
                  className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularServices;
