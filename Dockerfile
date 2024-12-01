FROM node:18-alpine AS react_base

# Working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock tsconfig.json ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application
COPY src /app/src/
COPY public /app/public/

# Build the application
RUN yarn build

FROM opensuse/leap:15.6

ARG USER_ID=1000
RUN useradd \
      -rm \
      -d /home/cue \
      -s /bin/bash \
      -g audio \
      -u $USER_ID \
      cue

WORKDIR /home/cue

RUN zypper install -y \
    git \
    alsa \
    alsa-firmware \
    alsa-ucm-conf \
    alsa-utils \
    libgtk-3-0 \
    libsndfile1 \
    libstdc++6 \
    libasound2 \
    Mesa-libGL-devel \
    pipewire \
    pipewire-alsa \
    pipewire-libjack-0_3 \
    pipewire-modules-0_3 \
    pipewire-pulseaudio \
    pipewire-spa-plugins-0_2 \
    pipewire-spa-tools \
    pipewire-spa-tools \
    libpipewire-0_3-0 \
    wget \
    tar \
    xz

RUN wget --no-check-certificate https://www.reaper.fm/files/7.x/reaper727_linux_x86_64.tar.xz \
    && tar -xvf reaper727_linux_x86_64.tar.xz --directory /opt \
    && rm reaper727_linux_x86_64.tar.xz \
    && chown cue:audio /opt/reaper_linux_x86_64 \
    && /opt/reaper_linux_x86_64/install-reaper.sh --usr-local-bin-symlink

USER cue

COPY --chown=cue project /home/cue/project/
COPY --from=react_base --chown=cue /app/build /opt/reaper_linux_x86_64/REAPER/Plugins/reaper_www_root
RUN mv /opt/reaper_linux_x86_64/REAPER/Plugins/reaper_www_root/index.html /opt/reaper_linux_x86_64/REAPER/Plugins/reaper_www_root/cue_mix.html

CMD ["reaper", "-cfgfile", "/home/cue/project/reaper.ini", "/home/cue/project/test.rpp"]
