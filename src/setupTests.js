import { TextDecoder, TextEncoder } from 'text-encoding';
import fetch from 'node-fetch';

global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;
global.fetch = fetch;
