#!/usr/bin/env bash

function send_slack_message {
    curl -d "{\"text\":\"${1}\"}" -H "Content-Type: application/json" -X POST $SLACK_WEB_HOOK
}