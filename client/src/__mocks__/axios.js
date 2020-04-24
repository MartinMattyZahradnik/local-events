const defaultResponse = { data: {} };

const mockAxios = {
  reset() {
    Object.assign(mockAxios.instance, {
      get: jest.fn(() => Promise.resolve(defaultResponse)),
      put: jest.fn(() => Promise.resolve(defaultResponse)),
      post: jest.fn(() => Promise.resolve(defaultResponse)),
      delete: jest.fn(() => Promise.resolve(defaultResponse)),
      defaults: { headers: { common: {} } },
    });
  },
  instance: {},
  create() {
    return mockAxios.instance;
  },
};

mockAxios.reset();

export const resetMock = mockAxios.reset;
export const create = () => mockAxios.instance;
export default mockAxios;
