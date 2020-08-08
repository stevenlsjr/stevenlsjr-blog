FROM postgres:12
RUN useradd -u 1000 -ms /bin/bash dbuser && \
  mkdir /data && \
  chown 1000:1000 /data
RUN localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8
ENV LANG en_US.utf8
