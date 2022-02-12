# Common ISP Algorithm Project

## Installation

This project was set up by partially following https://vercel.com/guides/nextjs-prisma-postgres. I then
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
5. `npm run dev`

The next JS dev server runs on port 3000, but this port is exposed as 6003 to the host machine.

This means you need to open localhost:6003 to see the starter project

## Basic Components

The docker compose file is the source of truth for what's available in this repo, but below are the main components

### NextJS full stack javascript application

Essentially express and react wrapped up to abstract various rendering strategies. This is where most of your development time will be spent.

/components contains React components
/data-access contains examples of fetching data from the database
/pages has examples of different rendering strategies, data fetching, and api routes.
/lib currently only has a wrapper around the prisma client

The most important thing here is ports. `npm run dev` will spin up a development server running on port 3000 by default. Because I run next on my host machine for some apps, I forwarded port 6003 on the host machine to port 3000 within the node container. If you forget, the docker compose files have these mappings.

TLDR; To see the application, you'll need to open localhost:6003 in your browser

### Postgres Database

This should contain two tables: properties and spaces. Spaces represent a specific rentable unit, regardless of occupancy type. Spaces are related to properties by property_id, a foreign key to properties.property_id.

If you're running the environment using docker compose, this should already be populated for you. If not, you'll have to do a little extra work, but should be able to use populate-database.sql to populated your instance of postgres.

Again, ports -- Postgres runs on 5432 by default. I exposed this as port 6000 on the host machine. So, you'll need to point any clients to localhost:6000 if they're running outside of the postgres container

### Adminer

This is a php application to allow a gui interface for managing your db. I added it for convenience but I doubt you'll actually use it

If you're interested, I exposed this interface on port 6001 so it's available at localhost:6001. You can use the db credentials found in the docker-compose.yml file to log in.

### Port Mappings

docker-compose.yml is the source of truth, but thought it'd be helpful to list the ports here too. Pattern is host_port:container_port which is the same as the compose file.

- NextJS Application - 6003:3000
- Prisma Studio - 6002:5555
- Adminer - 6001:8080
- Postgres - 6000:5432

## Normal Development Tasks

Please note that anything node related should be run within the node container. Use `bin/dev-start`

### Daily Development

1. `bin/dev-start`
2. `npm run dev`

### Adding a package

It's important to use --save or --save-dev when npm installing to make sure packages are added to package.json.

`npm i package_name --save`

### Code formatting

I've set up prettier and added a .vscode folder with workspace configuration so that prettier automatically formats code on save and paste events. Feel free to change this to however works for your team, but I recommend encoding these decisions as a prettier config and then just formatting on save.

### Modifying the database schema

There are a couple of options for this:

1. Use psql or a database gui to modify by running sql. You'll need to pull those changes into
   your prima models. Once the db is how you want it run `npx prisma db pull`
2. Go the other way and modify the Prisma models and push them to the db with `npx prisma db push`

Personal preference is to let the database be the source of truth, but I'm also new to Prisma

Regardless of which way you go, run `npx prisma generate` to regenerate the prisma client.

### View Database in a gui

You can use any gui (I use TablePlus) to connect to the database using DATABASE_URL from env

Additionally, prisma studio provides a simple gui for the database based on prisma models. After
kicking off the dev environment just run `npx prisma studio`. The default port is 5555 but I've exposed this as port 6002 in the docker compose file.

## Deploying to Production

Really the only things needed to run this application are a postgres db and a box that runs node. I designed this to be deployable anywhere so you all could make that decision. Happy to advise.

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
   - Please don't go crazy with inheritance and classes. Interfaces and types are nice. Everything else should look like vanilla js.
6. npm instead of yarn
   yarn just doesn't offer enough for me and I hate installing extra things. With any project you just need to pick one and stick with it. Feel free to change if you want.

Notably I didn't make any decisions about component libraries or CSS. I'm partial to vanilla CSS and CSS Modules but feel free to choose what you're comfortable with

Additonally, this is just a starting point. While you should stick to this for the clients, you might decide it's easier to handle the computation logic externally. Deciding if that trade off is worth the extra work is up to you.

# Original Readme Follows

# Fullstack Authentication Example with Next.js and NextAuth.js

This is the starter project for the fullstack tutorial with Next.js and Prisma. You can find the final version of this project in the [`final`](https://github.com/prisma/blogr-nextjs-prisma/tree/final) branch of this repo.
