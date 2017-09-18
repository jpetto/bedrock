## 9/17/2017

With container for bedrock and running gulp on host:

- Response times are ~5s for first byte - no good
- Unmapping /media and/or /static in docker-compose didn't seem to help

Hypothesis: reading media files from host is just too slow

Next: Have Gulp compile to .css and figure out how to turn off Pipeline in bedrock container

# Next Steps

- get `gulp` running in a separate container
    - container should map to ./media?

1. build Dockerfile for gulp
    a. find node version for base image
    b. find gulp docker example to work from


Try skip mapping of the following directories/scenarios:

1. bedrock container > host OS
    - does not need to see anything in /media
    - does not need to see anything in /static

2. gulp container > host OS
    - only needs to see /media - should be read only

3. bedrock container > gulp container
    - bedrock container's /app/static should mirror/watch (read only) gulp container's /app/static

