import axios from 'axios';
import { Industry } from '../types';
import ApiClient from './api-clients';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('api-client', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // get industries from and return industry list
  it('Should able to get industires', async () => {
    const industry: Industry[] = [
      { sic_code: 100, title: 'Agricultural Production-crops' },
    ];
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: industry })
    );

    const result = await ApiClient.getIndustryList();
    expect(result).toEqual(industry);
  });
});
