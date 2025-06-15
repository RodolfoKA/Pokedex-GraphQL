import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';

describe('"pokemon" module tests', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should return 151 entries', async () => {
    const response: any = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: 
        `query
    findManyPokemon {
        findManyPokemon(filter:{}) {
            id
            name
            type {
                name
            }
            secondaryType {
                name
            }
        }
    }`,
      });

    expect(response.body.errors).toBeUndefined();
    expect(response.body.data.findManyPokemon).toHaveLength(151);
  });
});
