ARG DIRECTUS_VERSION=11.11.0
ARG NODE_VERSION=22


####################################################################################################
####################################################################################################
# Base stage (Directus project)
FROM directus/directus:${DIRECTUS_VERSION}

USER root
RUN corepack enable

# Switch back to the node user
USER node


RUN pnpm install \
  directus-extension-sync