#!/bin/bash
curl --request POST \
     --url "https://api.render.com/v1/services/$RENDER_SERVICE_ID/custom-domains" \
     --header "accept: application/json" \
     --header "Authorization: Bearer $RENDER_API_KEY" \
     --header "content-type: application/json" \
     --data-raw "{ \"name\": \"$RENDER_GIT_BRANCH.api-test.fri.is\" }"