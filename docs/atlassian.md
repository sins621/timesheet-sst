## Get Ticket History

The field you're looking for is the **changelog**. It records every field change on an issue, including status transitions.

### Option 1: Expand changelog on the issue

Add `expand=changelog` to your issue request:

```
/rest/api/3/issue/LUM-123?expand=changelog
```

### Option 2: Dedicated changelog endpoint

```
/rest/api/3/issue/LUM-123/changelog
```

## What to look for

In the changelog response, look for entries where `field` is `"status"`:

```json
{
  "histories": [
    {
      "author": { "displayName": "Bradly Carpenter" },
      "created": "2026-05-15T10:30:00.000+0200",
      "items": [
        {
          "field": "status",
          "fromString": "To Do",
          "toString": "In Progress"
        }
      ]
    },
    {
      "author": { "displayName": "Bradly Carpenter" },
      "created": "2026-05-18T14:00:00.000+0200",
      "items": [
        {
          "field": "status",
          "fromString": "In Progress",
          "toString": "Done"
        }
      ]
    }
  ]
}
```

The key fields in each history item are:

| Field | Description |
|---|---|
| `fromString` | The previous status |
| `toString` | The new status |
| `created` | When the transition happened |
| `author` | Who made the change |

So for your Postman GET request, it would look like:

```
{{protocol}}://{{host}}/rest/api/3/issue/LUM-123?expand=changelog
```

## Get Tickets with Changed Statuses

For **individual issues**, yes — the changelog is the way to get the full transition history with timestamps and who made the change.

But if you want to **find issues that transitioned between specific statuses** across a project, JQL is far more efficient. You don't need to fetch each issue's changelog one by one.

## JQL Status Change Functions

```sql
-- Issues that moved from "To Do" to "In Progress"
project = LUM AND status CHANGED FROM "To Do" TO "In Progress"

-- Issues where status changed in the last 7 days
project = LUM AND status CHANGED AFTER -7d

-- Issues that were ever "In Progress"
project = LUM AND status WAS "In Progress"

-- Issues where YOU changed the status
project = LUM AND status CHANGED BY currentUser()

-- Combine them
project = LUM AND status CHANGED FROM "To Do" TO "In Progress" AFTER "2026-05-01"
```

## Which approach to use

| Goal | Best approach |
|---|---|
| Full transition history of a single issue (timestamps, who, what) | Changelog |
| Find all issues that moved between specific statuses | JQL with `status CHANGED` |
| Bulk reporting on transitions across a project | JQL first, then changelog on matching issues if you need details |

So for your Postman request, if you want to find all LUM issues that transitioned recently:

```
/rest/api/3/search/jql?jql=project=LUM AND status CHANGED AFTER -7d&fields=summary,status
```
