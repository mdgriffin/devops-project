#!/usr/bin/env bash

function send_slack_message {
    curl -d "{\"text\":\"${1}\"}" -H "Content-Type: application/json" -X POST $SLACK_WEB_HOOK
}

function pipe_slack_message {
    while read data; do
      send_slack_message "$data"
    done
}