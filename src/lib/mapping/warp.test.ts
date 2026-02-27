import { describe, expect, it } from "vitest";
import {
  projectClientSchema,
  projectSchema,
  timeSchema,
} from "../schemas/warp";
import type { Project, ProjectView } from "../types/warp";
import { mapProjectsToProjectViews } from "./warp";

describe("mapProjectsToProjectViews", () => {
  it("should map an array of Projects to an array of Project Views", () => {
    const testProjectA: Project = projectSchema.parse({
      TaskId: 3,
      Name: "Some Project Name",
      IsActive: true,
      Created_On: timeSchema.parse("2007-01-10T14:49:26.093"),
      Updated_On: timeSchema.parse("2007-01-10T14:49:26.093"),
      Client: projectClientSchema.parse({
        GroupId: 145,
        Name: "Test Client",
        Currency: "Some Currency",
      }),
    });
    const testProjectB: Project = projectSchema.parse({
      TaskId: 56,
      Name: "Some Other Project Name",
      IsActive: true,
      Created_On: timeSchema.parse("2007-01-10T14:49:26.093"),
      Updated_On: timeSchema.parse("2007-01-10T14:49:26.093"),
      Client: projectClientSchema.parse({
        GroupId: 145,
        Name: "Test Client",
        Currency: "Some Currency",
      }),
    });

    const expectedMappedResult: ProjectView[] = [
      {
        name: "Test Client",
        currency: "Some Currency",
        groupId: 145,
        projects: [
          {
            name: "Some Project Name",
            taskId: 3,
            createdOn: new Date("2007-01-10T14:49:26.093"),
            updatedOn: new Date("2007-01-10T14:49:26.093"),
          },
          {
            name: "Some Other Project Name",
            taskId: 56,
            createdOn: new Date("2007-01-10T14:49:26.093"),
            updatedOn: new Date("2007-01-10T14:49:26.093"),
          },
        ],
      },
    ];

    const mappedProjects = mapProjectsToProjectViews([
      testProjectA,
      testProjectB,
    ]);

    expect(mappedProjects).toEqual(expectedMappedResult);
  });
  it("should group clients with the same name together", () => {
    const testProjectA: Project = projectSchema.parse({
      TaskId: 3,
      Name: "Some Project Name",
      IsActive: true,
      Created_On: timeSchema.parse("2007-01-10T14:49:26.093"),
      Updated_On: timeSchema.parse("2007-01-10T14:49:26.093"),
      Client: projectClientSchema.parse({
        GroupId: 145,
        Name: "Test Client",
        Currency: "Some Currency",
      }),
    });
    const testProjectB: Project = projectSchema.parse({
      TaskId: 56,
      Name: "Some Other Project Name",
      IsActive: true,
      Created_On: timeSchema.parse("2007-01-10T14:49:26.093"),
      Updated_On: timeSchema.parse("2007-01-10T14:49:26.093"),
      Client: projectClientSchema.parse({
        GroupId: 145,
        Name: "Test Client",
        Currency: "Some Currency",
      }),
    });
    const testProjectC: Project = projectSchema.parse({
      TaskId: 56,
      Name: "Some Other Project Name",
      IsActive: true,
      Created_On: timeSchema.parse("2007-01-10T14:49:26.093"),
      Updated_On: timeSchema.parse("2007-01-10T14:49:26.093"),
      Client: projectClientSchema.parse({
        GroupId: 145,
        Name: "A different client",
        Currency: "Some Currency",
      }),
    });

    const expectedMappedResult: ProjectView[] = [
      {
        name: "Test Client",
        currency: "Some Currency",
        groupId: 145,
        projects: [
          {
            name: "Some Project Name",
            taskId: 3,
            createdOn: new Date("2007-01-10T14:49:26.093"),
            updatedOn: new Date("2007-01-10T14:49:26.093"),
          },
          {
            name: "Some Other Project Name",
            taskId: 56,
            createdOn: new Date("2007-01-10T14:49:26.093"),
            updatedOn: new Date("2007-01-10T14:49:26.093"),
          },
        ],
      },
      {
        name: "A different client",
        currency: "Some Currency",
        groupId: 145,
        projects: [
          {
            name: "Some Other Project Name",
            taskId: 56,
            createdOn: new Date("2007-01-10T14:49:26.093"),
            updatedOn: new Date("2007-01-10T14:49:26.093"),
          },
        ],
      },
    ];

    const mappedProjects = mapProjectsToProjectViews([
      testProjectA,
      testProjectB,
      testProjectC,
    ]);

    expect(mappedProjects).toEqual(expectedMappedResult);
  });
});
