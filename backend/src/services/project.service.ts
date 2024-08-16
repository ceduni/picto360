import Project, { ProjectDocument } from '@/models/project.model';

class ProjectService {
  async createProject(project: ProjectDocument) {
    const newProject = new Project(project);
    await newProject.save();
    return newProject;
  }

  async getProject(id: string) {
    return Project.findById(id);
  }

  async updateProject(id: string, update: Partial<ProjectDocument>) {
    const updatedProject = await Project.findByIdAndUpdate(id, update, { new: true });
    return updatedProject;
  }

  async deleteProject(id: string) {
    await Project.findByIdAndDelete(id);
  }

  async getAllProjects() {
    return Project.find();
  }
}

export default new ProjectService();
