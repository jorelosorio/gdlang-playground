FROM node:18-bullseye-slim

# Install apt packages wget
RUN apt-get update && apt-get install -y wget

# Install Yarn
RUN corepack enable

RUN yarn set version 4.0.2

# Switch to a working directory
WORKDIR /workspace