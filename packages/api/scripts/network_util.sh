#! /bin/bash

function setConfFileValue {
    local file=$1
    local key=$2
    local value=$3
    sudo sed -i "s/\(^$key *= *\).*/\1$value/" $file 1> /dev/null || exit 1
    exit 0
}

function getConfFileValue {
    local file=$1
    local key=$2
    
    local value=$((grep -E "^${key}=" -m 1 "$file" 2>/dev/null || echo "VAR=__UNDEFINED__") | head -n 1 | cut -d '=' -f 2-);

    if [ "${value}" = "__UNDEFINED__" ]; then
        echo "key not found: $key" 1>&2
        exit 1
    fi

    echo $value
}

function getInterfaceByDeviceType {
  local type=$1 

  if [ $type == "node" ]; then
    echo "wlan0"
    exit 0
  elif [ $type == "hub" ]; 
  then
    echo "wlan1"
    exit 0
  else
    echo "first argument must be either 'hub' or 'node'." 1>&2  
    exit 1
  fi
}

function getInterfaceIpAddress {
  local interface=$1

  if [[ $interface != "wlan0" && $interface != "wlan1" ]]; then
    echo "invalid argument" 1>&2  
      exit 1
  fi

  ip addr show $interface | grep "inet\b" | awk '{print $2}' | cut -d/ -f1
}

# Check if the function exists (bash specific)
if declare -f "$1" > /dev/null
then
  "$@"
else
  # Show a helpful error
  echo "'$1' is not a known function name" >&2
  exit 1
fi