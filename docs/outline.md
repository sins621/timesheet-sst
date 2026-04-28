# Outline

## The Problem

Currently employees at Warp Development manually enter their timesheets at
`office.warpdevelopment.com` each day. The timesheet entry usually consists of 
the following:

- Some Project Identifier
- Hours Worked
- Description

There are other details that can be indicated such as if overtime was worked.

Most employees generally just indicate that they worked a full 8 hour day and 
provide a summary description of their work done in the description box.
I believe this flow can be automated.

## The Solution

It's possible to programmatically enter timesheets to `office.warpdevelopment.com`
by using their Rest API. This will enable us to build software that can automate
timesheet entry as manual entry is not required. 

In order to fully automate this process we will need to solve two problems:

1. Create a timesheet entry for a specific project.

Developers at Warp work across different projects and we'll need to be able to 
link the entries we create to these projects.

2. Generate a description for the entry.

We will need to describe the work done by the user in the entry, in order to do
that we will need to be able to programmatically track the work done by an 
employee. 

Fortunately most if not all projects at Warp make use of a project management
or issue tracking software. Going forward we'll refer to this kind of software as
an ITS (Issue Tracking Software). If a project is correctly managed, an ITS will
track a developer's work using a board with tickets. We can use the Rest API 
provided by this software to track what project an employee is working on and 
also what work they are doing at any time.

### Warp's Rest API

The Rest API for `office.warpdevelopment.com` exposes the following capabilities:

- **Authenticate**:
  Returns a token when provided with a username and password.

- **Get Projects**:
  Returns a list of projects.
  Projects can be thought of as *areas of work* or *where* hours will go toward.

- **Get Person ID**:
  Returns the user's Person ID.
  This identifier is used when submitting a timesheet entry.

- **Create Entry**:
  Allows for the creation of a timesheet entry.

### ITS

We can query details from an ITS like Jira such as a project's board, what 
tickets are being worked on and what their status is. The status is the useful 
bit that we can use to determine what work an employee is doing by tracking the
status of tickets. Jira provides us with the detail of what statuses a ticket has
been in and moved from. For example, if a ticket has moved from To-do to 
In-progress we can assume that the employee has just started working on that
ticket. If a ticket is stationary in In-progress then we can assume the employee
is currently working on that ticket. 

## The Bit We Can't Automate

We'll need to manually link 'projects' on Warp to 'boards' on an ITS. A lot of 
the time a single client project at warp might be split into multiple actual 
projects on the application where it was necessary to log timesheets in a more
granular fashion. I don't think we should support this case out the gate but it's
something to keep in mind. We can attempt to vectorize project and board names to
attempt to semantically match them but this will most likely be innaccurate and 
require a human in the loop and so for v0 I think the best approach is to have an
employee manually link projects to boards. 

## Tying It All Together

So what we'll need to build is the following:

- Warp Application Integration
- ITS Software Integration
- A Web UI for Linking Projects to Boards
- Cron Jobs for Making Entries Each Day