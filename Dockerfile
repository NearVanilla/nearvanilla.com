ARG SITE_DIR=/website
# Nightly buster
FROM rustlang/rust@sha256:24b958d780c2804aabc496787266fedfaedae193df8e565a38e1d64149b3d09f as builder

ARG SITE_DIR
WORKDIR $SITE_DIR
ENV USER=root

# create a new empty shell project
RUN cargo init --bin
# copy over manifests
COPY Cargo.* ./
# cache dependencies
RUN cargo build --release
RUN rm -rf src/ target/release/deps/nearvanilla_com*

COPY ./src ./src
RUN cargo build --release

FROM debian:buster-slim
USER 80
ARG SITE_DIR
WORKDIR $SITE_DIR
ENV EXECUTABLE=/$SITE_DIR/nearvanilla_com
COPY --from=builder $SITE_DIR/target/release/nearvanilla_com $EXECUTABLE
COPY ./static ./templates /$SITE_DIR/
ENV ROCKET_ENV=stage
CMD "${EXECUTABLE?}"

