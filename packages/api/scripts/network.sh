#! /bin/bash

function getHubNetworkType {
  local status="$(sudo systemctl show hostapd@wlan1 --no-page)"
  local active_state=$(echo "${status}" | grep 'ActiveState=' | cut -f2 -d=)

  if [ "${active_state}" == "active" ]
  then
      echo "hubfi"
  else
      echo "wifi"
  fi
}

# Enable wlan1 (hub) network type (wifi or ap)
function setHubNetworkType {
  local type=$1

  if [ -z $type ]; then 
    echo "argument must be either 'wifi' or 'ap'. nothing provided." 1>&2
    exit 1
  fi

  if [ $type == "wifi" ]; 
  then
    sudo systemctl disable --now hostapd@wlan1 2> /dev/null
    sudo cp /etc/dnsmasq.wifi.conf /etc/dnsmasq.conf 1> /dev/null || exit 1
    sudo cp /etc/dhcpcd.wifi.conf /etc/dhcpcd.conf 1> /dev/null || exit 1 
    sudo systemctl restart dnsmasq dhcpcd 
    sudo ifconfig wlan1 down && sudo ifconfig wlan1 up
    exit 0
  elif [ $type == "hubfi" ]; 
  then
    sudo systemctl enable --now hostapd@wlan1 2> /dev/null
    sudo cp /etc/dnsmasq.ap.conf /etc/dnsmasq.conf 1> /dev/null || exit 1
    sudo cp /etc/dhcpcd.ap.conf /etc/dhcpcd.conf 1> /dev/null || exit 1 
    sudo systemctl restart dnsmasq dhcpcd 
    sudo ifconfig wlan1 down && sudo ifconfig wlan1 up
    exit 0
  else
    echo "argument must be either 'wifi' or 'hubfi'." 1>&2  
    exit 1
  fi
}

function restartHostapdInterface {
  local type=$1

  local interface=$("$PWD/network_util.sh" getInterfaceByDeviceType $type 2>/dev/null || echo "__ERROR__")

  if [ $interface == "__ERROR__" ]; then
    echo "invalid arg provided to 'getInterfaceByDeviceType'"
    exit 1
  fi

  sudo systemctl restart "hostapd@$interface" 1> /dev/null || exit 1
  exit 0
}

function deleteTempFile {
  local wlan_temp=$1
  sudo rm wlan_temp
}

function setAPCredentials {
  local type=$1
  local ssid=$2
  local pw=$3
  local wlan_temp="/etc/hostapd/wlan-temp.conf"

  if [[ -z $type || -z $ssid || -z $pw ]]; then 
    echo "required args not provided" 1>&2
    exit 1
  fi

  local interface=$("$PWD/network_util.sh" getInterfaceByDeviceType $type 2>/dev/null || echo "__ERROR__")

  if [ $interface == "__ERROR__" ]; then
    echo "invalid arg provided to 'getInterfaceByDeviceType'"
    exit 1
  fi

  # Make changes in temp file so we can easily rollback transaction if necessary
  sudo cp "/etc/hostapd/$interface.conf" $wlan_temp 1> /dev/null || exit 1
  bash "$PWD/network_util.sh" setConfFileValue $wlan_temp "ssid" $ssid 1> /dev/null || { deleteTempFile $wlan_temp; exit 1; }
  bash "$PWD/network_util.sh" setConfFileValue $wlan_temp "wpa_passphrase" $pw 1> /dev/null || { deleteTempFile $wlan_temp; exit 1; }

  # validate changes
  local check_ssid=$("$PWD/network_util.sh" getConfFileValue $wlan_temp "ssid" 2>/dev/null || echo "__ERROR__")
  if [[ $check_ssid == "__ERROR__" || $check_ssid != $ssid ]]; then
    { deleteTempFile $wlan_temp; echo "ssid validation failed"; exit 1; }
  fi

  local check_pw=$("$PWD/network_util.sh" getConfFileValue $wlan_temp "wpa_passphrase" 2>/dev/null || echo "__ERROR__")
  if [[ $check_pw == "__ERROR__" || $check_pw != $pw ]]; then
    { deleteTempFile $wlan_temp; echo "wpa_passphrase validation failed"; exit 1; }
  fi

  # set temp file as permanent interface
  sudo mv -f $wlan_temp "/etc/hostapd/$interface.conf" 1> /dev/null || { deleteTempFile $wlan_temp; echo "failed to set permanent interface"; exit 1; }
}



function getAPCredentials {
  local type=$1 # hub | node

  if [ -z $type ]; then 
    echo "required args not provided" 1>&2
    exit 1
  fi

  local interface=$("$PWD/network_util.sh" getInterfaceByDeviceType $type 2>/dev/null || echo "__ERROR__")

  if [ $interface == "__ERROR__" ]; then
    echo "invalid arg provided to 'getInterfaceByDeviceType'"
    exit 1
  fi

  local ssid=$("$PWD/network_util.sh" getConfFileValue "/etc/hostapd/$interface.conf" ssid 2>/dev/null || echo "__ERROR__")

  if [ $ssid == "__ERROR__" ]; then
    echo "ssid not found"
    exit 1
  fi

  local pw=$("$PWD/network_util.sh" getConfFileValue "/etc/hostapd/$interface.conf" wpa_passphrase 2>/dev/null || echo "__ERROR__")

  if [ $pw == "__ERROR__" ]; then
    echo "wpa_passphrase not found"
    exit 1
  fi

  echo "{\"ssid\": \"$ssid\", \"password\": \"$pw\"}"
  
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