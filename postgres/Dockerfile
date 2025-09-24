FROM postgres
COPY 001_create-multiple-postgresql-databases.sh /docker-entrypoint-initdb.d/
RUN apt-get update && apt-get install -y dos2unix \
    && dos2unix /docker-entrypoint-initdb.d/001_create-multiple-postgresql-databases.sh \
    && chmod +x /docker-entrypoint-initdb.d/001_create-multiple-postgresql-databases.sh \
    && rm -rf /var/lib/apt/lists/*
