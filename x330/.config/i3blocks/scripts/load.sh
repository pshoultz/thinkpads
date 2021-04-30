#!/bin/bash

INSTANCE="${BLOCK_INSTANCE:-1}"

URGENT_VALUE=90

LOAD=$(cat /proc/loadavg | awk -F ' ' '{print $'"${INSTANCE}"'}')
if [[ "${LOAD}" != "" ]]; then
  LOAD_PERC=$(echo "scale=0; ${LOAD} * 100" | bc -l)
  LOAD_PERC=${LOAD_PERC%.*}

  echo "${LOAD}"
  echo "${LOAD}"
  echo ""

  if [[ "${LOAD_PERC}" -ge "${URGENT_VALUE}" ]]; then
    exit 33
  fi
fi
