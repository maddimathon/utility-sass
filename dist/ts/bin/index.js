/**
 * @since 0.1.0-alpha.draft
 *
 * @packageDocumentation
 */
/*!
 * @maddimathon/utility-sass@0.1.0-alpha.draft
 * @license MIT
 */
import minimist from 'minimist';
import { CLI } from '../classes/index.js';
const params = minimist(process.argv.slice(2));
const cli = new CLI(params);
await cli.go();
//# sourceMappingURL=index.js.map