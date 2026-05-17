# Design Brainstorming

I'm purely using this to brainstorm ideas for how to structure this application.
This document will not be updated as a 'model of the system' and will likely be
out of date by the time development begins.

## High Level

In a nutshell, this application needs to run a cron job everyday, and submit a
queue of timesheet entries to the warp endpoint. Timesheet entries themselves
will consist of message 'stubs' that read all of the issue information from a
board and then, using the stub message templates, combine them into a message
that can be submitted to Warp's endpoints.

![High Level Overview](./images/high-level.png)

## Stubs

Stubs are essentially a data type that timesheet messages are built from. There
are two kinds: 'stationary' stubs and 'transitional' stubs.

![Stub Overview](./images/stubs.png)

The stub allows for us to programmatically generate timesheet messages by filtering
tickets into these categories and depending on which category they fit, a message template
is used. The filtering is done by using the status field of the ticket. Most project
management software has a concept of 'To-do', 'In-progress', 'Done', etc. We can
use these statuses to create human readable texts explaining what work the employee
has done that day.

The concept of 'stationary' versus 'transitional' is used to further filter by
the _movement_ of the ticket _that day_. For example, if a ticket has moved from
status A: To-do to status B:In-progress then we can use the message template of
"I began working on..." to create a message from all the tickets that match this
criteria.

> "Today I began working on TKT-21 (Refactoring AI Slop) and TKT-22 (Adding Chat Bot)"

For 'stationary' stubs. These are tickets that's condition is that it *remained* 
in that position that day. For example, if the condition is that a ticket *remianed*
or was stationary in status "In-progress" then the message we build can matched to
"Today I continued working on.."

> "Today I continued working on TKT-21 (Refactoring AI Slop) and TKT-22 (Adding Chat Bot)"
