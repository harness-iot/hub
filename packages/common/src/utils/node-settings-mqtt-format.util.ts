import { NodeEntity } from '../entities';

interface ChannelOperationalSetting {
  [channel: number]: { [key: string]: string };
}

interface NodeOperationalSetting {
  node: { [key: string]: string };
  channels: ChannelOperationalSetting;
}

export const nodeSettingsMqttFormat = (
  node: NodeEntity,
): NodeOperationalSetting => {
  const nodeSettings = node.settings.reduce(
    (acc: { [key: string]: string }, setting) => ({
      [setting.key]: setting.value,
      ...acc,
    }),
    {},
  );

  const channelSettings = node.channels.reduce(
    (acc: ChannelOperationalSetting, channel) => ({
      [channel.channel]: channel.settings.reduce(
        (acc2: { [key: string]: string }, setting) => ({
          [setting.key]: setting.value,
          ...acc2,
        }),
        {},
      ),
      ...acc,
    }),
    {},
  );

  return {
    node: nodeSettings,
    channels: channelSettings,
  };
};
