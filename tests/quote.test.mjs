import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateQuote, submitQuote } from '../src/lib/quote.js';
const valid = { name:'Test Homeowner',phone:'+27 82 123 4567',email:'home@example.com',service:'house-wiring',area:'Example suburb',description:'Install lighting.' };
test('requires all quote fields and validates contact formats',()=>{ assert.equal(Object.keys(validateQuote({})).length,6); assert.deepEqual(validateQuote(valid),{}); assert.ok(validateQuote({...valid,email:'bad',phone:'abc'}).email); assert.ok(validateQuote({...valid,phone:'abc'}).phone); });
test('unconfigured delivery never reports success',async()=>{ await assert.rejects(submitQuote(valid,''),/have not been sent/); });
test('sends JSON and handles endpoint success and rejection',async()=>{ const original=globalThis.fetch; try { globalThis.fetch=async(url,options)=>{ assert.equal(url,'https://example.com/quote');assert.deepEqual(JSON.parse(options.body),valid);return {ok:true}; }; assert.equal(await submitQuote(valid,'https://example.com/quote'),true);globalThis.fetch=async()=>({ok:false});await assert.rejects(submitQuote(valid,'https://example.com/quote'),/could not be sent/); } finally {globalThis.fetch=original;} });
