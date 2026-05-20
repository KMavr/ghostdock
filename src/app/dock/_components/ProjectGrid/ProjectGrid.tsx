import ProjectCard from '@/components/dock/ProjectCard/ProjectCard';
import { cn } from '@/lib/utils/cn';

interface Project {
  id: string;
  repoOwner: string;
  repoName: string;
  nameOverride: string | null;
  slug: string | null;
  isPublished: boolean;
}

interface ProjectGridProps {
  projects: Project[];
}

function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className={styles.grid}>
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  );
}

const styles = {
  grid: cn('grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'),
};

export default ProjectGrid;
