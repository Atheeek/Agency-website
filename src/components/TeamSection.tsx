import { TeamCarousel, TeamMember } from './TeamCarousel';

const teamMembers: TeamMember[] = [
  {
    id: '2',
    name: 'Atheek Rahman',
    role: 'Full Stack Web Developer',
    image: '/team/atheek.png',
    bio: 'Based in Mangalore, Atheek is a passionate full stack developer who blends clean design with smart engineering. He’s known for building dynamic, high-performance web apps that combine creativity, logic, and precision.',
  },
  {
    id: '1',
    name: 'Furqan Sheikh',
    role: 'Project Manager',
    image: '/team/furqan.png',
    bio: 'Furqan brings structure and strategy to every project. With a sharp focus on timelines, collaboration, and execution, he ensures that creative ideas turn into polished, successful outcomes.',
  },
   {
    id: '3',
    name: 'Mohammed Mufeez',
    role: 'Web Designer',
    image: '/team/mufeez.jpg',
    bio: 'Mohammed Mufeez specializes in crafting visually engaging designs that balance modern aesthetics with usability and brand identity.',
  },
];

export function TeamSection() {
  return (
    <section className="relative w-full">
      <TeamCarousel
        members={teamMembers}
        title="MEET OUR TEAM"
        titleColor="rgba(255, 255, 255, 0.9)"
        background="linear-gradient(180deg, #000000 0%, #0A0A0A 100%)"
        cardWidth={320}
        cardHeight={420}
        autoPlay={5000}
        pauseOnHover={true}
        visibleCards={2}
        sideCardScale={0.85}
        sideCardOpacity={0.6}
        grayscaleEffect={true}
        infoPosition="bottom"
        infoTextColor="rgba(255, 255, 255, 0.9)"
        infoBackground="transparent"
        showDots={true}
        showArrows={true}
        keyboardNavigation={true}
        touchNavigation={true}
        className="py-20"
      />
    </section>
  );
}