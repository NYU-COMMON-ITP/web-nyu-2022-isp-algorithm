# Common ISP Algorithm Project
## Installation
This project was set up following https://vercel.com/guides/nextjs-prisma-postgres. I then
wrapped everything up in docker and added some scripts to populate the environment. I've
tried to comment liberally, but do ask if you're interested in going deeper.

Highly recommend using docker to run this environment. It's totally possible to set
up on your host machine, but why? If you're really set on that I'm happy to help with that.

The following steps will take care of setting up containers for node, postgres, and adminer.
Additionally, it will populate database tables from the csvs in ./nyu-csv-data.

1. Install docker desktop - https://www.docker.com/products/docker-desktop
2. `docker compose build`
3. `bin/dev-start` -- This should drop you in bash within the node container
4. `npm install`
TODO: Prisma needs some documentation here.
5. `npm run dev`

## Normal Development Tasks
Please note that anything node related should be run within the node container. Use `bin/dev-start`
### Daily Development
1. `bin/dev-start`
2. `npm run dev`

### Adding a package
It's important to use --save or --save-dev when npm installing to make sure packages are added to package.json.

`npm i package_name --save`

### Modifying the database schema
There are a couple of options for this:

1. Use psql or a database gui to modify by running sql. You'll need to pull those changes into
your prima models. Once the db is how you want it run `npx prisma db pull`
2. Go the other way and modify the Prisma models and push them to the db with `npx prisma db push`

## Breaking Down bin/dev-start
## Initial Technical Decisions
1. NextJS
    - Abstracts away lower level rendering concerns like Server side rendering (SSR), Static Site Generation (SSG), and Static rendering. Additionally, Incremental Static Site Generation is available
    - Node, Express, and React knowledge transfers 
    - Well documented and plays nice anywhere node apps can be deployed
2. Postgres
    - Solid and popular relational database. Happens to be what we use at common, so makes transferring data over easier
3. Prisma (ORM)
    - Easy integration with postgres
    - Easily generate Typescript models via introspection
    - Open to changes here - TypeORM is a solid alternative or you can use pg to go a little lower level and actually write queries. Sequelize is also still alive, but a less active project. Would recommend TypeORM over Sequelize. Generally my preference is to use an ORM until performance begins to cause pain.
4. Docker/Docker Compose
    - Optional
    - I run an M1 macbook and sometimes have issues with dependencies. Wrapping components in a docker compose and specifying an intel architecture is a way around this. However, it most likely will run slightly slower due to virtuallization. In case that becomes an issue, everything can easily be installed on the host machine.
    - Running dependencies like databases and node in containers also helps with deployment. This is because it's super simple to map the components to addons in your deployment environment
5. Typescript
    - Optional, but worth knowing enough to be dangerous. I love TS for boundaries like api/client and data layer/ui component
    - tsconfig.json can be modified to allow plain javascript/jsx files

Notably I didn't make any decisions about component libraries or CSS. I'm partial to vanilla CSS and CSS Modules but feel free to choose what you're comfortable with

# Original Readme Follows
# Fullstack Authentication Example with Next.js and NextAuth.js

This is the starter project for the fullstack tutorial with Next.js and Prisma. You can find the final version of this project in the [`final`](https://github.com/prisma/blogr-nextjs-prisma/tree/final) branch of this repo.
