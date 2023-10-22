import getLevel from '../getlevel';
import fetchData from '../http';

jest.mock('../http.js');

beforeEach(() => {
  jest.resetAllMocks();
});

test('выбрасывает исключение с сообщением "Mock this!"', () => {
  fetchData.mockReturnValue(JSON.stringify({}));
  getLevel(1);
  expect(fetchData).toBeCalledWith('https://server/user/1');
});

test('возвращает текущий уровень, если response.status равен "ok"', () => {
  fetchData.mockReturnValue({ status: 'ok', level: 5 });
  const result = getLevel(1);
  expect(result).toBe('Ваш текущий уровень: 5');
});

test('возвращает сообщение об временной недоступности информации об уровне, если response.status не равен "ok"', () => {
  fetchData.mockReturnValue(JSON.stringify({ status: 'error' }));
  const result = getLevel(1);
  expect(result).toBe('Информация об уровне временно недоступна');
});
