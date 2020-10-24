
TAGS:=latest
SERVER_IMAGES:=$(TAGS:%=stevenlsjr/blog-server:%)
CLIENT_IMAGE:=stevenlsjr/blog-client:$(TAG)
PLATFORMS:=linux/arm64,linux/amd64
BUILDARGS:=--push --progress plain

.PHONY: all blog-server-image blog-client-image

blog-server-image: deploy/blog-server.dockerfile
	docker buildx build \
		$(SERVER_IMAGES:%=-t %) \
		--platform $(PLATFORMS) \
		-f $^					\
		$(BUILDARGS) .
