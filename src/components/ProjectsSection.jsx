import { ArrowRight, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "VitaminJob",
    description: "A Job Portal Application which provides a platform for job seekers to find job opportunities.",
    image: "/projects/vitaminjob.png",
    tags: ["React", "Express.js", "MongoDB"],
    demoUrl: "https://vitaminjob.com",
    githubUrl: "https://github.com/santhosh-2504/vitaminjob-nextjs",
  },
  {
    id: 2,
    title: "Exameets",
    description: "A complete website for a start-up which has all necessary features for an ed-tech platform.",
    image: "/projects/examees-home.png",
    tags: ["Next.js", "TailwindCSS", "MongoDB"],
    demoUrl: "https://exameets-user.vercel.app",
    githubUrl: "https://github.com/exameets-1/exameets-user",
  },
  {
    id: 3,
    title: "CodeAlong",
    description: "A platform to learn coding by watching tutorials and practicing in-browser with JS compiler and video progress tracking.",
    image: "/projects/codealong.png",
    tags: ["Next.js", "TailwindCSS", "LocalStorage", "Video.js"],
    demoUrl: "https://codealong-theta.vercel.app/",
    githubUrl: "https://github.com/santhosh-2504/codealong",
  },
  {
    id: 4,
    title: "Quizara",
    description: "An AI-powered quiz app that generates MCQs instantly from text or images using GPT and OCR.",
    image: "/projects/quizara.png",
    tags: ["React Native", "Expo", "OpenAI API", "OCR"],
    demoUrl: "https://github.com/santhosh-2504/Quizara/releases/tag/v1.0.0",
    githubUrl: "https://github.com/santhosh-2504/Quizara",
  },
  {
    id: 5,
    title: "Smart-Wait",
    description: "An advanced queuing system to reduce physical wait times by digitizing token management for service centers.",
    image: "/projects/smart-wait.png",
    tags: ["React", "Node.js", "MongoDB", "Socket.io"],
    demoUrl: "https://github.com/santhosh-2504/smart-wait#readme",
    githubUrl: "https://github.com/santhosh-2504/smart-wait",
  },
];


export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          {" "}
          Featured <span className="text-primary"> Projects </span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects. Each project was carefully
          crafted with attention to detail, performance, and user experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {projects.map((project, key) => (
   <div
   key={key}
   className="group grid grid-rows-[auto_1fr_auto_auto_auto] h-full bg-card rounded-lg overflow-hidden shadow-xs card-hover"
 >
   {/* Image */}
   <div className="h-48 overflow-hidden">
     <img
       src={project.image}
       alt={project.title}
       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
     />
   </div>
 
   {/* Title + Description */}
   <div className="p-6">
     <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
     <p className="text-muted-foreground text-sm mb-0 line-clamp-3">
       {project.description}
     </p>
   </div>
 
   {/* Divider 1 */}
   <div className="border-t border-border mx-6" />
 
   {/* Tech Tags */}
   <div className="p-6 pt-4">
     <div className="flex flex-wrap gap-2">
       {project.tags.map((tag, tagIndex) => (
         <span
           key={tagIndex}
           className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
         >
           {tag}
         </span>
       ))}
     </div>
   </div>
 
   {/* Divider 2 + Links */}
   <div className="border-t border-border mx-6">
     <div className="flex items-center gap-3 p-6 pt-4">
       <a
         href={project.demoUrl}
         target="_blank"
         rel="noopener noreferrer"
         className="text-foreground/80 hover:text-primary transition-colors duration-300"
         aria-label={`View ${project.title} demo`}
       >
         <ExternalLink size={20} />
       </a>
       <a
         href={project.githubUrl}
         target="_blank"
         rel="noopener noreferrer"
         className="text-foreground/80 hover:text-primary transition-colors duration-300"
         aria-label="View on GitHub"
       >
         <Github size={20} />
       </a>
     </div>
   </div>
 </div>
 
  ))}
</div>


        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            href="https://github.com/santhosh-2504"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};