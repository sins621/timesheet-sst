# Glossary
Explanation of different terms used in the project.

## Sheet
A sheet is a timesheet but more importantly it is a destination for where timesheet entries
will be commited to. For starters, a sheet would be a 'Project' on Warp.

## Board
A board is a single place on project management software where tickets will be created and
tracked. This could be a Twillio Kanban or a Jira Project.

## Ticket/Issue
This is a piece of work to be carried out by the employee, this will be found on boards.

## Status
A ticket status like 'In-progress' or 'To-do' etc.

## Stub
A stub is an object that links message templates to status conditions. There are two kinds, 
transitional and stationary. A stationary ticket links message templates to the condition that
the ticket remained stationary in a specific status. For example, if a ticket remained in
'In-progress' then we would associate the 'Today I continued working on...' message template to
it. If it is a 'transitional' ticket then we would link tickets that moved from a beginning status
to an ending status that day to a message template. For example, the user would specify that tickets
that move from 'To-do' to 'In-progress' be linked to the message template 'Today I began working on...".

## Message Template
A template with text used to create entry descriptions like "Today I began working on..." or "Today I
finished working on..."
