#!/bin/bash
echo "setting vite env variable for api"
if [ "$IS_PULL_REQUEST" == "true" ]
then
  export VITE_FRI_API_URL="https://$RENDER_GIT_BRANCH.$FRI_API_HOST"
else 
  export VITE_FRI_API_URL="https://$FRI_API_HOST"
fi

export VITE_BERGUR=prufa1
export BERGUR=prufa2
echo $VITE_FRI_API_URL
echo $BERGUR