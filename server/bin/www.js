#!/usr/bin/env node

const app = require('../src/app')

app.listen('5000', () => {
    console.log('listening on port 5000');
})