#! /bin/bash
# IMPORTANT: Untested...

INSTALL_DIR="/home/ty/harriot/packages/api/install/network/"
SCRIPT_DIR="/home/ty/harriot/packages/api/scripts/"

function setupHostapdConfFile {
    local interface=$1
    local setupFile="/etc/hostapd/${interface}.conf"
    sudo cp "${INSTALL_DIR}hostapd-base.conf" $setupFile 1> /dev/null || exit 1
    bash "${SCRIPT_DIR}network_util.sh" setConfFileValue $setupFile "interface" $interface 1> /dev/null || exit 1
}

function dhcpcdBaseInterface {
local interface=$1
local staticIP=$2

cat << EndOfMessage

interface $interface
    static ip_address=$staticIP
    nohook wpa_supplicant
EndOfMessage
}

function setupDhcpcdAPConfFile {
    sudo cp /etc/dhcpcd.conf /etc/dhcpcd.ap.conf 1> /dev/null || exit 1
    dhcpcdBaseInterface wlan0 192.168.4.1/24 | sudo tee -a /etc/dhcpcd.ap.conf 1> /dev/null || exit 1
    dhcpcdBaseInterface wlan1 192.168.5.1/24 | sudo tee -a /etc/dhcpcd.ap.conf 1> /dev/null || exit 1
}

function setupDhcpcdWifiConfFile {
    sudo cp /etc/dhcpcd.conf /etc/dhcpcd.wifi.conf 1> /dev/null || exit 1
    dhcpcdBaseInterface wlan0 192.168.4.1/24 | sudo tee -a /etc/dhcpcd.wifi.conf 1> /dev/null || exit 1
}

function dnsmasqWlan0Interface {
cat << EndOfMessage

interface=wlan0 # Listening interface
dhcp-range=set:node,192.168.4.3,192.168.4.20,255.255.255.0,24h # Range of IPs leased to nodes
domain=harr_node,192.168.4.1/24 # DNS domain for node subnet  
address=/connect.harr_node/192.168.4.1 # Forces domain to particular IP 
EndOfMessage
}

function dnsmasqWlan1Interface {
cat << EndOfMessage

interface=wlan1
dhcp-range=set:hub,192.168.5.2,192.168.5.40,255.255.255.0,24h
domain=harr_hub,192.168.5.1/24
address=/connect.harr_hub/192.168.5.1
dhcp-option=tag:hub,3
EndOfMessage
}


echo "setting up wifi"
sudo rfkill unblock 0 1> /dev/null || exit 1
sudo chown ty:ty /etc/wpa_supplicant/wpa_supplicant.conf 1> /dev/null || exit 1
sudo gpasswd -a [username] netdev 1> /dev/null || exit 1

echo "setting up hostapd (access point)"
sudo apt install hostapd 1> /dev/null || exit 1
sudo cp "${INSTALL_DIR}hostapd@.service" /usr/lib/systemd/system/hostapd@.service 1> /dev/null || exit 1
sudo systemctl disable --now hostapd # enabled by default
sudo mkdir -p /etc/hostapd 1> /dev/null || exit 1
setupHostapdConfFile "wlan0"
setupHostapdConfFile "wlan1"
sudo systemctl daemon-reload 1> /dev/null || exit 1 # recognize hostapd@.service
sudo systemctl unmask hostapd 1> /dev/null || exit 1
sudo systemctl enable --now hostapd@wlan0 # wlan0 (node) always enabled, wlan1 wifi by default

echo "setting up ap DNS"
## DNSMASQ
sudo apt install dnsmasq 1> /dev/null || exit 1
sudo mv /etc/dnsmasq.conf /etc/dnsmasq.conf.orig 1> /dev/null || exit 1 # keep original config
# Dnsmasq ap file setup
sudo touch /etc/dnsmasq.ap.conf
dnsmasqWlan0Interface | sudo tee -a /etc/dnsmasq.ap.conf 1> /dev/null || exit 1
dnsmasqWlan1Interface | sudo tee -a /etc/dnsmasq.ap.conf 1> /dev/null || exit 1
# Dnsmasq wifi file setup
sudo touch /etc/dnsmasq.wifi.conf
dnsmasqWlan0Interface | sudo tee -a /etc/dnsmasq.ap.conf 1> /dev/null || exit 1
# set wifi confir by default
sudo cp /etc/dnsmasq.wifi.conf /etc/dnsmasq.conf 1> /dev/null || exit 1 
sudo service dnsmasq restart
## DHCPCD
setupDhcpcdAPConfFile 1> /dev/null || exit 1
setupDhcpcdWifiConfFile 1> /dev/null || exit 1
sudo cp /etc/dhcpcd.wifi.conf /etc/dhcpcd.conf 1> /dev/null || exit 1 # wifi config by default
sudo service dhcpcd restart
sudo ifconfig wlan0 down && sudo ifconfig wlan0 up # restart node ap to reflect changes