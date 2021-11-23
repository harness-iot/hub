#!/bin/bash

sudo cp /home/ty/intrakit/config/systemd/kit_power_up.service /lib/systemd/system/kit_power_up.service
sudo systemctl enable kit_power_up.service

sudo cp /home/ty/intrakit/config/systemd/kit_power_down.service /lib/systemd/system/kit_power_down.service
sudo systemctl enable kit_power_down.service

sudo cp /home/ty/intrakit/config/systemd/kit_power_off.service /lib/systemd/system/kit_power_off.service
sudo systemctl enable kit_power_off.service

sudo cp /home/ty/intrakit/config/systemd/kit_start_app.service /lib/systemd/system/kit_start_app.service
sudo systemctl enable kit_start_app.service


