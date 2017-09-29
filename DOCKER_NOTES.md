## 9/30/2017

- Try having Gulp process all .scss files and skip Django pipeline?
    - do not have structure set up to support this
        - rebuilding all .css files is only option, but would take too long
    - restructuring could be a possibility?

## 9/29/2017

- Keep gulp out of Docker for now
- Make sure Docker image is up to date/correct for all cases:
    - new branch off master *should* be fine?
    - pulling down someone else's PR/branch
    - do we need a Docker image for every branch?
    - wouldn't the container sync with local file system? might be slow, but should work?
- How best to run Python tests?
    - `docker exec bedrock_web_1 py.test lib bedrock` works!

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

