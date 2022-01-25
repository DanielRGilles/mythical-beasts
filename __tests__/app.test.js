const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Creature = require('../lib/models/creature');

describe('refactory routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should be able to create a creature', async () => {
    const res = await Creature.insert({ title:'Falcore', species:'Dogon', lifespan:'not long enough', environment:'the-sky', img_url:'https://static.wikia.nocookie.net/theneverendingstory/images/8/8a/Falkor-neverending-story-96.2.jpg/revision/latest?cb=20190524234115' });

    expect(res).toEqual({ title:'Falcore', species:'Dogon', lifespan:'not long enough', environment:'the-sky', img_url:'https://static.wikia.nocookie.net/theneverendingstory/images/8/8a/Falkor-neverending-story-96.2.jpg/revision/latest?cb=20190524234115' });
  });

  it('should be able to list an creatures by id', async () => {
    const creatures = await Creature.insert({ title:'', species:'', lifespan:'', environment:'', img_url:'' });
    const res = await request(app).get(`/api/v1/creatures/${creatures.id}`);
    expect(res.body).toEqual(creatures);
  });

  it('should be able to list creatures', async () => {
    await Creature.insert({ product: 'Widget', quantity: 1 });
    const res = await request(app).get('/api/v1/creatures');

    expect(res.body).toEqual([
      {
        id: expect.any(String),
        title:'', species:'', lifespan:'', environment:'', img_url:'' 
      },
    ]);
  });

  it('should be able to update an creatures', async () => {
    const creatures = await Creature.insert({ title:'Falcore', species:'Dogon', lifespan:'not long enough', environment:'the-sky', img_url:'https://static.wikia.nocookie.net/theneverendingstory/images/8/8a/Falkor-neverending-story-96.2.jpg/revision/latest?cb=20190524234115' });
    
    const res = await request(app)
      .patch(`/api/v1/creatures/${creatures.id}`)
      .send({ title:'Falcore', species:'Dogon', lifespan:'forever', environment:'the-sky', img_url:'https://static.wikia.nocookie.net/theneverendingstory/images/8/8a/Falkor-neverending-story-96.2.jpg/revision/latest?cb=20190524234115' });

    const expected = {
      id: expect.any(String),
      title:'Falcore', species:'Dogon', lifespan:'forever', environment:'the-sky', img_url:'https://static.wikia.nocookie.net/theneverendingstory/images/8/8a/Falkor-neverending-story-96.2.jpg/revision/latest?cb=20190524234115' };

    expect(res.body).toEqual(expected);
    expect(await Creature.getById(creatures.id)).toEqual(expected);
  });

  it('should be able to delete an creatures', async () => {
    const creatures = await Creature.insert({ title:'Falcore', species:'Dogon', lifespan:'not long enough', environment:'the-sky', img_url:'https://static.wikia.nocookie.net/theneverendingstory/images/8/8a/Falkor-neverending-story-96.2.jpg/revision/latest?cb=20190524234115' });
    const res = await request(app).delete(`/api/v1/creatures/${creatures.id}`);
  
    expect(res.body).toEqual(creatures);
    expect(await Creature.getById(creatures.id)).toBeNull();
  });
});
