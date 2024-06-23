"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = exports.details = void 0;
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
var details = function () { return ({
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
}); };
exports.details = details;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var plugin = function (args) {
    var _a, _b;
    var lib = require('../../../../../methods/lib')();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-param-reassign
    args.inputs = lib.loadDefaultValues(args.inputs, details);
    var isStreamable = false;
    if ((_b = (_a = args.inputFileObj) === null || _a === void 0 ? void 0 : _a.mediaInfo) === null || _b === void 0 ? void 0 : _b.track) {
        args.inputFileObj.mediaInfo.track.forEach(function (stream) {
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
exports.plugin = plugin;
