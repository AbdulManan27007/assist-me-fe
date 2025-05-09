import { Button } from "@/components/ui/button";
import Link from "next/link";

// Define interfaces for type safety
interface TeamMember {
  name: string;
  profession: string;
  image: string;
  link: string;
}

const ExpertTechnicalTeam = () => {
  const teamMembers: TeamMember[] = [
    {
      name: "Raffaele Giraldo",
      profession: "Electrical Engineer",
      image: "/images/team02.png",
      link: "/profile",
    },
    {
      name: "Raffaele Giraldo",
      profession: "Master Plumber",
      image: "/images/team04.png",
      link: "/profile",
    },
    {
      name: "Raffaele Giraldo",
      profession: "Electrical Engineer",
      image: "/images/team02.png",
      link: "/profile",
    },
    {
      name: "Raffaele Giraldo",
      profession: "Electrical Engineer",
      image: "/images/team04.png",
      link: "/profile",
    },
  ];

  return (
    <div className="bg-orange-500 py-16 px-4 sm:px-6 xl:px-0 text-center">
      {/* Heading Section */}
      <div className="mb-12">
        <p className="text-white text-xl">Our Professional</p>
        <h2 className="text-white text-4xl sm:text-5xl font-bold mt-1">
          Expert Technical Team
        </h2>
      </div>

      {/* Team Members Grid */}
      <div className="max-w-[1512px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
        {teamMembers.map((member, index) => (
          <div  className="flex flex-col">
          <Link
            href={member.link}
            key={index}
            className=" bg-gray-200 rounded-lg gap-8 overflow-hidden px-32 pt-[89px] transition-transform hover:scale-[1.02]"
          >
              <img
                src={member.image}
                alt={member.name}
                className=" !size-48 bg-inherit"
              />
          </Link>
            <div className="pt-2 pb-6 text-start">
              <h4 className="text-lg font-medium text-[#D5F2E3]">{member.name}</h4>
              <p className="text-sm text-[#D5F2E3]">{member.profession}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpertTechnicalTeam;