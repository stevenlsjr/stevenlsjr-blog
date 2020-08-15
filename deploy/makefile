TMPDIR=$(shell mktemp -d)
PLATFORMS:=linux/amd64,linux/arm64
BUILDER_NAME=stevenlsjrbuilder
BUILDX_FLAGS=--platform=$(PLATFORMS) --progress=plain
BUILDX_OUTPUT:=--push

all: stevenlsjr/postgres stevenlsjr/blog-server

stevenlsjr/postgres:
	echo $(TMPDIR)
	docker buildx build \
		-t stevenlsjr/postgres:12 \
		-t stevenlsjr/postgres:latest \
		-f postgres.dockerfile \
		$(BUILDX_FLAGS) \
		$(TMPDIR) $(BUILDX_OUTPUT)
	rm -fr $(TMPDIR)

stevenlsjr/blog-server:
	docker buildx build \
		-t stevenlsjr/blog-server:latest \
		-f blog-server.dockerfile \
		$(BUILDX_FLAGS) \
		..	\
		$(BUILDX_OUTPUT)
