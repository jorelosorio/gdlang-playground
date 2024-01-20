FROM node:18-bullseye-slim

# Install Yarn
RUN corepack enable

RUN yarn set version stable

# Switch to a working directory
WORKDIR /workspace