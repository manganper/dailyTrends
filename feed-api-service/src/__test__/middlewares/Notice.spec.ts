import { Origin } from '@config/Origin';
import { deleteNotice, getFeed, getNotice, saveNotice } from '@middlewares/Notice';
import { INotice } from '@types';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { apiNotices, createMockNotice, insertNotices, mundoNotices, paisNotices } from '../mock/Notice';

describe('Notices middleware', () => {
  beforeAll(async () => {
    const mongodb = await MongoMemoryServer.create();
    const uri = mongodb.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    // Cerrar la conexión a la base de datos
    await mongoose.connection.close();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return an empty feed if no notices are found', async () => {
    const expectedFeed = { notices: [], };
    const result = await getFeed();

    expect(result).toEqual(expectedFeed);
  });

  it('should return the feed with notices from all origins', async () => {
    const expectedFeed = {
      notices: mundoNotices.concat(paisNotices, apiNotices),
    };
    await insertNotices(expectedFeed.notices);
    const result = await getFeed();

    expect(result?.notices?.length).toEqual(expectedFeed.notices.length);
    expect(typeof result?.notices[0]?.tittle).toEqual('string');
    expect(typeof result?.notices[0]?.body).toEqual('string');
    expect(typeof result?.notices[0]?.url).toEqual('string');
    expect(typeof result?.notices[0]?.date).toEqual('string');
    expect(typeof result?.notices[0]?.origin).toEqual('string');
  });

  it('should save a notice and return its id', async () => {
    // Arrange
    const notice: INotice = {
      origin: Origin.MUNDO,
      tittle: 'New notice',
      body: 'Content of new notice',
      date: '2022-01-04',
      url: 'http://www.test.com/',
    };

    // Act
    const id = await saveNotice(notice);
    const result = await mongoose.connection.collection('notices').findOne({ _id: new mongoose.Types.ObjectId(id) });

    // Assert
    expect(result).toBeDefined();
    expect(id).toEqual(result._id.toString());
  });

  it('should return a notice with the given id', async () => {
    const mockNotice: INotice = createMockNotice();
    const savedNoticeId = await saveNotice(mockNotice);
    const result = await getNotice(savedNoticeId);
    expect(result).toBeDefined();
    expect(result?.tittle).toEqual(mockNotice.tittle);
    expect(result?.body).toEqual(mockNotice.body);
    expect(result?.url).toEqual(mockNotice.url);
    expect(result?.date).toEqual(mockNotice.date);
    expect(result?.origin).toEqual(mockNotice.origin);
  });

  it('should throw an error if the notice with the given id is not found', async () => {
    const invalidId = 'invalid-id';
    await expect(getNotice(invalidId)).rejects.toThrow(`Unable to get a notice with id ${invalidId}`);
  });

  it('should delete a notice', async () => {
    const notice: INotice = {
      tittle: 'Test notice',
      body: 'Test body',
      url: 'https://test.com',
      date: '2022-04-01',
      origin: Origin.PAIS,
    };
    const id = await saveNotice(notice);

    const result = await deleteNotice(id);

    expect(result).toBe(true);
  });

  it('should return false if notice does not exist', async () => {
    const id = '644051d4d0c4c22122d2d6cd';
    const result = await deleteNotice(id);
    expect(result).toBe(false);
  });
});
