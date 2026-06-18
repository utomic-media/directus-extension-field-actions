ARG DIRECTUS_VERSION=12.0.2
ARG NODE_VERSION=24


# # # # # # # # # # # # # # # # # # # # #
# Base stage (Directus project)
FROM directus/directus:${DIRECTUS_VERSION}

USER root
RUN corepack enable

# Switch back to the node user
USER node


RUN pnpm install \
  directus-extension-sync