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

This project will be managed using Github Projects. You can find the link to it
[here](https://github.com/users/sins621/projects/2). A Github 'issue' is
essentially a ticket and the only rule in this repository is that only
mainters can open issues. If you have a feature request, a bug report or any
other inquiry please head towards the [discussion](https://github.com/sins621/timesheet-sst/discussions) section of
this repository.

## Architectural Overview

This live [link](https://www.tldraw.com/p/-XyDBMROKtnRQAAfLuDOb?d=v-544.-640.3252.1611.BRqTNP0vnSLtqyl0khIpk) will be updated to maintain a visual representation of the 
application's architecture.

## Contributing

Please see the current [issues](https://github.com/sins621/timesheet-sst/issues) or [discussions](https://github.com/sins621/timesheet-sst/discussions) for the project and indicate by commenting that you would
like to contribute to these issues then simply open up pull requests.

Please see the [Documentation](./docs/) section for style guides, architecture guidelines, etc.

### Getting up and running.

- Clone the project
- Run `pnpm i`
- See the [env](./src/env.ts), comments included for where to get envs or contact me
- See the [package.json](./package.json) for commands to run the application
- In order to run tests you must have Playwright installed with the chromium driver.

## Stack

### Core

This is a Next.js 16 project with plans to deploy to Vercel and use Vercel Queues
for creating timesheet entries.

### Frontend

The project uses Tailwind & Shadcn (suprise) for styling.
Tanstack Query for data fetching.
Because this project will primarily be behind an auth wall we will _not_ make use of
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

### Library Documentation

- [Next.js](https://nextjs.org/docs)
- [Nuqs](https://nuqs.dev/)
- [Tanstack Query](https://tanstack.com/query/latest)
- [BetterAuth](https://better-auth.com/docs/introduction)
- [Tailwind](https://tailwindcss.com/)
- [Shadcn](https://ui.shadcn.com/docs/components)
- [Base-UI](https://base-ui.com/react/overview)
- [Stepperize](https://stepperize.vercel.app/docs/react)
- [Tanstack Table](https://tanstack.com/table/latest/docs/introduction)
- [Drizzle](https://orm.drizzle.team/)
- [Got](https://www.npmjs.com/package/got)
- [Zod](https://zod.dev/)
- [React Hook Form](https://react-hook-form.com/docs)
- [Neverthrow](https://github.com/supermacro/neverthrow)
- [T3Env](https://env.t3.gg/docs/introduction)
- [Dotenvx](https://dotenvx.com/docs/introduction)
- [Vitest](https://vitest.dev/guide/)
- [Playwright](https://playwright.dev/docs/intro)
- [Storybook](https://storybook.js.org/docs)
- [Mock Service Worker](https://mswjs.io/docs)
- [Nock](https://github.com/nock/nock)
- [Faker](https://fakerjs.dev/)

## Style

Read the room.
