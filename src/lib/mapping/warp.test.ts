import { describe, expect, it } from "vitest";
import {
  warpProjectClientSchema,
  warpProjectSchema,
  warpTimeSchema,
} from "../schemas/warp";
import type { WarpProject, WarpProjectView } from "../types/warp";
import { mapWarpProjectsToWarpProjectViews } from "./warp";

describe("mapProjectsToProjectViews", () => {
  it("should map an array of Projects to an array of Project Views", () => {
    const testProjectA: WarpProject = warpProjectSchema.parse({
      TaskId: 3,
      Name: "Some Project Name",
      IsActive: true,
      Created_On: warpTimeSchema.parse("2007-01-10T14:49:26.093"),
      Updated_On: warpTimeSchema.parse("2007-01-10T14:49:26.093"),
      Client: warpProjectClientSchema.parse({
        GroupId: 145,
        Name: "Test Client",
        Currency: "Some Currency",
      }),
    });
    const testProjectB: WarpProject = warpProjectSchema.parse({
      TaskId: 56,
      Name: "Some Other Project Name",
      IsActive: true,
      Created_On: warpTimeSchema.parse("2007-01-10T14:49:26.093"),
      Updated_On: warpTimeSchema.parse("2007-01-10T14:49:26.093"),
      Client: warpProjectClientSchema.parse({
        GroupId: 145,
        Name: "Test Client",
        Currency: "Some Currency",
      }),
    });

    const expectedMappedResult: WarpProjectView[] = [
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

    const mappedProjects = mapWarpProjectsToWarpProjectViews([
      testProjectA,
      testProjectB,
    ]);

    expect(mappedProjects).toEqual(expectedMappedResult);
  });
  it("should group clients with the same name together", () => {
    const testProjectA: WarpProject = warpProjectSchema.parse({
      TaskId: 3,
      Name: "Some Project Name",
      IsActive: true,
      Created_On: warpTimeSchema.parse("2007-01-10T14:49:26.093"),
      Updated_On: warpTimeSchema.parse("2007-01-10T14:49:26.093"),
      Client: warpProjectClientSchema.parse({
        GroupId: 145,
        Name: "Test Client",
        Currency: "Some Currency",
      }),
    });
    const testProjectB: WarpProject = warpProjectSchema.parse({
      TaskId: 56,
      Name: "Some Other Project Name",
      IsActive: true,
      Created_On: warpTimeSchema.parse("2007-01-10T14:49:26.093"),
      Updated_On: warpTimeSchema.parse("2007-01-10T14:49:26.093"),
      Client: warpProjectClientSchema.parse({
        GroupId: 145,
        Name: "Test Client",
        Currency: "Some Currency",
      }),
    });
    const testProjectC: WarpProject = warpProjectSchema.parse({
      TaskId: 56,
      Name: "Some Other Project Name",
      IsActive: true,
      Created_On: warpTimeSchema.parse("2007-01-10T14:49:26.093"),
      Updated_On: warpTimeSchema.parse("2007-01-10T14:49:26.093"),
      Client: warpProjectClientSchema.parse({
        GroupId: 145,
        Name: "A different client",
        Currency: "Some Currency",
      }),
    });

    const expectedMappedResult: WarpProjectView[] = [
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

    const mappedProjects = mapWarpProjectsToWarpProjectViews([
      testProjectA,
      testProjectB,
      testProjectC,
    ]);

    expect(mappedProjects).toEqual(expectedMappedResult);
  });
});
