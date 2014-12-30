#!/bin/sh

sh ./scripts/reset-database.sh

psql -U postgres << EOF
    CREATE user pgrating with encrypted password 'pgrating';
    GRANT CONNECT, TEMP ON DATABASE rating TO pgrating;
    GRANT USAGE ON SCHEMA public TO pgrating;
EOF
