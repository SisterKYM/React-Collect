#!/bin/bash

if [[ "$S3_DEPLOYMENT_BUCKET" != "" ]]; then
  echo Bucket ${S3_DEPLOYMENT_BUCKET} provided by ENV var
else
  if [[ "$1" != "" ]]; then
      S3_DEPLOYMENT_BUCKET="$1"
  else
      echo ERROR: Failed to supply S3 bucket name
      exit 1
  fi
fi

aws s3 sync build s3://$S3_DEPLOYMENT_BUCKET --delete --cache-control max-age=31536000,public --exclude build/service-worker.js --exclude build/index.html
aws s3 cp build/index.html s3://$S3_DEPLOYMENT_BUCKET/index.html --metadata-directive REPLACE --cache-control max-age=0,no-cache,no-store,must-revalidate --content-type text/html --acl public-read

if [[ "$CLOUDFRONT_ID" != "" ]]; then
    aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_ID --paths /\*
fi

