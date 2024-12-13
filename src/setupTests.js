import { TextDecoder, TextEncoder } from 'text-encoding';
import fetch from 'node-fetch';

// Configuración global existente
global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;
global.fetch = fetch;


