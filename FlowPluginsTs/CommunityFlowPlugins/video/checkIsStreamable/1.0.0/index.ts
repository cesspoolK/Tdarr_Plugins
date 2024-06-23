import {
  IpluginDetails,
  IpluginInputArgs,
  IpluginOutputArgs,
} from '../../../../FlowHelpers/1.0.0/interfaces/interfaces';

/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
const details = (): IpluginDetails => ({
  name: 'Check Is Video Streamable',
  description: 'Check if a video has faststart set (MOOV atom is in the begin).',
  style: {
    borderColor: 'orange',
  },
  tags: 'video',
  isStartPlugin: false,
  pType: '',
  requiresVersion: '2.11.01',
  sidebarPosition: -1,
  icon: 'faQuestion',
  inputs: [],
  outputs: [
    {
      number: 1,
      tooltip: 'File is streamable',
    },
    {
      number: 2,
      tooltip: 'File is not streamable',
    },
  ],
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const plugin = (args: IpluginInputArgs): IpluginOutputArgs => {
  const lib = require('../../../../../methods/lib')();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-param-reassign
  args.inputs = lib.loadDefaultValues(args.inputs, details);

  let isStreamable = false;

  if (args.inputFileObj?.mediaInfo?.track) {
    args.inputFileObj.mediaInfo.track.forEach((stream) => {
      if (stream.IsStreamable === 'Yes') {
        isStreamable = true;
      }
    });
  }

  return {
    outputFileObj: args.inputFileObj,
    outputNumber: isStreamable ? 1 : 2,
    variables: args.variables,
  };
};
export {
  details,
  plugin,
};
