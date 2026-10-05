There is an error when running the application. See below output and explain what needs to be done to fix then fix it and explain the fix done. Also, the project does not save any data in the database. Check why this is happening and fix it and explain the fix done.

## Error Type
Console Error

## Error Message
(node:16228) Warning: SECURITY WARNING: The SSL modes 'prefer', 'require', and 'verify-ca' are treated as aliases for 'verify-full'.
In the next major version (pg-connection-string v3.0.0 and pg v9.0.0), these modes will adopt standard libpq semantics, which have weaker security guarantees.

To prepare for this change:
- If you want the current behavior, explicitly use 'sslmode=verify-full'
- If you want libpq compatibility now, use 'uselibpqcompat=true&sslmode=require'

See https://www.postgresql.org/docs/current/libpq-ssl.html for libpq SSL mode definitions.
(Use `node --trace-warnings ...` to show where the warning was created)


    at EditorLayout (unknown:0:0)

Next.js version: 16.3.8 (Turbopack)

## This is what shows up in the logs after `npm run dev`
[browser] Clerk: Clerk has been loaded with development keys. Development instances have strict usage limits and should not be used when deploying your application to production. Learn more: https://clerk.com/docs/deployments/overview

