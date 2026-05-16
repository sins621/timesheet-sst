# Timekeeper

Why is it necessary for us to manually enter Timesheets every day? If only there
was a tool that tracked all the work we do each day and we could pull data from
that tool to author our timesheets?

## The problem

We as developers have to manually enter in plain text what we do each day and
many of us often forget to do this process angering management and incurring
fines to us.

## The solution

Most developers here should be working on a project that uses some form of
project management software like Jira, Trello, Linear, Monday etc. The goal of
this software is to read the information from these platforms and automate the
submission of timesheets by generating plain text timesheet entries from the
information gathered from project management software.

First, we will attempt to support Jira and at a basic level support linking a
Jira 'board' to an 'activity' on the Warp timesheets platform.

There is a longer planning document available here: [link](./docs/outline.md)

## Issue tracking

I'm giving [Fizzy](https://www.fizzy.do/) a try which is a Kanban board made by the
people over at Basecamp and fortunately it's possible to make the board publically
viewable [here](https://app.fizzy.do/6200411/public/boards/HnAkwSq5KsHCeVzEA7JV7t5q)

## Contributing

Please see the Fizzy link for issues and if you would like to get involved you're
welcome to message me on Teams to get access to the Fizzy board and indicate that
you are working on issues. *Please note:* no slop allowed.

## Stack

### Core
This is a Next.js 16 project with plans to deploy to Vercel and use Vercel Queues
for creating timesheet entries.

### Frontend
The project uses Tailwind & Shadcn (suprise) for styling.
Tanstack Query for data fetching. 
Because this project will primarily be behind an auth wall we will *not* make use of 
server components. Nuqs has also been included for type safe router parameter use.

### Backend
Whether we will use oRPC or API endpoints is still TBD 
We are centering the project around error management using Neverthrow. try-catch 
is banned in this codebase. 
T3 Env is used for type safe env management and dotenvx is used for env injection.

### Testing
This project uses vitest with the storybook integration so that frontend tests
can run inside of playwright. For mocking endpoints, the project incorporates 
Mock Service Worker.

## Style
Read the room.
