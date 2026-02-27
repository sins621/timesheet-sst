import type { Project, ProjectView } from "../types/warp";

export function mapProjectsToProjectViews(projects: Project[]): ProjectView[] {
  const map = new Map<string, ProjectView>();

  for (const project of projects) {
    const key = project.Client.Name;

    if (!map.has(key)) {
      map.set(key, {
        name: key,
        groupId: project.Client.GroupId,
        currency: project.Client.Currency,
        projects: [],
      });
    }

    map.get(key)!.projects.push({
      taskId: project.TaskId,
      name: project.Name,
      createdOn: new Date(project.Created_On),
      updatedOn: new Date(project.Updated_On),
    });
  }

  return Array.from(map.values());
}
