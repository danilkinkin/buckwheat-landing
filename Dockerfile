# stage 1 as builder
FROM node:latest as builder

WORKDIR /app

# Copy in the package file as well as other yarn
# dependencies in the local directory, assuming the
# yarn berry release module is inside .yarn/releases
# already

COPY . .

# Install the dependencies and make the folder
RUN yarn install --immutable



# Build the project and copy the files
RUN yarn build

EXPOSE 3000

ENTRYPOINT ["yarn", "start"]