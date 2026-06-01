const technologies = [
  {
    name: 'React',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  },
  {
    name: 'JavaScript',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  },
  {
    name: 'TypeScript',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  },
  {
    name: 'Tailwind CSS',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  },
  {
    name: 'Node.js',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  },
  {
    name: 'Express',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  },
  {
    name: 'MongoDB',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  },
  {
    name: 'MySQL',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  },
  {
    name: 'PostgreSQL',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  },
  {
    name: 'AWS',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
  },
  {
    name: 'Git',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  },
  {
    name: 'Python',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  },
  {
    name: 'Java',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  },
  {
    name: 'LangChain',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
  },
];

const TechMarquee = () => {
  const logoTrain = [...technologies, ...technologies];

  return (
    <div className="tech-marquee relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/70 py-4 shadow-lg">
      <div className="tech-marquee-fade-left pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-slate-950 to-transparent" />
      <div className="tech-marquee-fade-right pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-slate-950 to-transparent" />

      <div className="tech-marquee-track flex w-max items-center gap-4">
        {logoTrain.map((tech, index) => (
          <div
            key={`${tech.name}-${index}`}
            className="flex min-w-36 items-center gap-3 rounded-xl border border-slate-800/80 bg-slate-950/70 px-4 py-3 shadow-sm"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white p-1.5">
              <img
                src={tech.logo}
                alt={`${tech.name} logo`}
                className="h-full w-full object-contain"
                loading="lazy"
              />
            </span>
            <span className="whitespace-nowrap text-sm font-semibold text-slate-100">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechMarquee;
