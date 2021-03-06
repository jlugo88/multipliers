const test = require('ava')
const request = require('supertest')
const express = require('express')

let app = require('../../app')

test.beforeEach('setup', t => {
    // TODO in order to clear stored values, we should
    // "reload" the app before every test to make them
    // independent (since they alter server's state)
})

// moved to a different file in order to achieve tests isolation
// test('GET /value should return an empty array if no values added', async t => {
//     const response = await request(app)
//         .get('/value')
//         .send()
//     t.is(response.status, 200)
//     t.deepEqual(response.body, [])
// })
// test('GET /value should return all added values', async t => {
//     await request(app)
//         .post('/value')
//         .send({number:1})
//     await request(app)
//         .post('/value')
//         .send({number:2})
//     await request(app)
//         .post('/value')
//         .send({number:3})
//     const response = await request(app)
//         .get('/value')
//         .send()
//     t.is(response.status, 200)
//     t.deepEqual(response.body, [1,2,'Type 1'])
// })

test('POST /value should return 201 when value saves OK', async t => {
    const response = await request(app)
        .post('/value')
        .send({number:1})
    t.is(response.status, 201)
})
test('POST /value should return 409 when value already exists', async t => {
    await request(app)
        .post('/value')
        .send({number:2})
    const response = await request(app)
        .post('/value')
        .send({number:2})
    t.is(response.status, 409)
})
test('POST /value should return 400 when missing mandatory params', async t => {
    let response = await request(app)
        .post('/value')
        .send({number:'invalidNumber'})
    t.is(response.status, 400)
    response = await request(app)
        .post('/value')
        .send('invalidBody')
    t.is(response.status, 400)
})

test('GET /value/:value should return same number for 7', async t => {
    await request(app)
        .post('/value')
        .send({number:7})
    const response = await request(app)
        .get('/value/7')
        .send()
    t.is(response.status, 200)
    t.is(response.text, '7')
})
test('GET /value/:value should return "Type 1" number for 3', async t => {
    await request(app)
        .post('/value')
        .send({number:3})
    const response = await request(app)
        .get('/value/3')
        .send()
    t.is(response.status, 200)
    t.is(response.text, 'Type 1')
})
test('GET /value/:value should return "Type 2" number for 5', async t => {
    await request(app)
        .post('/value')
        .send({number:5})
    const response = await request(app)
        .get('/value/5')
        .send()
    t.is(response.status, 200)
    t.is(response.text, 'Type 2')
})
test('GET /value/:value should return "Type 3" number for 15', async t => {
    await request(app)
        .post('/value')
        .send({number:15})
    const response = await request(app)
        .get('/value/15')
        .send()
    t.is(response.status, 200)
    t.is(response.text, 'Type 3')
})
test('GET /value/:value should return 404 when number is missing', async t => {
    const response = await request(app)
        .get('/value/7777')
        .send()
    t.is(response.status, 404)
})
test('GET /value/:value should return 400 when arg is not a valid number', async t => {
    const response = await request(app)
        .get('/value/invalidNumber')
        .send()
    t.is(response.status, 400)
})