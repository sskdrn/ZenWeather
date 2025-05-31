import axios, { AxiosResponse } from 'axios';
import {
    BaseUrls,
    OpenWeatherApiKey,
    ApiNinjaApiKey,
    NetworkRequestConfig,
    GoogleMapsApiKey,
    RequestMethods,
} from './api.constants';

type DefaultApiConfig = Omit<Required<NetworkRequestConfig>, 'endpoint'>;

const getDefaultConfig = (baseUrl: string): DefaultApiConfig => {
    const config: DefaultApiConfig = {
        baseUrl,
        method: RequestMethods.Get,
        params: {},
        headers: {},
    };
    switch (baseUrl) {
        case BaseUrls.OpenWeatherUrl:
            config.params.appid = OpenWeatherApiKey;
            break;
        case BaseUrls.ApiNinjaUrl:
            config.headers['X-Api-Key'] = ApiNinjaApiKey;
            break;
        case BaseUrls.GoogleMapsUrl:
        case BaseUrls.GooglePlacesUrl:
        case BaseUrls.GoogleWeatherUrl:
            config.params.key = GoogleMapsApiKey;
            break;
    }
    return config;
};

export async function makeApiCall<T>({
    baseUrl = BaseUrls.OpenWeatherUrl,
    endpoint,
    method = RequestMethods.Get,
    params = {},
    headers = {},
}: NetworkRequestConfig): Promise<T> {
    const url = baseUrl + endpoint;
    const { params: defaultParams, headers: defaultHeaders } =
        getDefaultConfig(baseUrl);
    const config = {
        url,
        method,
        params: { ...defaultParams, ...params },
        headers: { ...defaultHeaders, ...headers },
    };
    const response: AxiosResponse<T> = await axios.request<T>(config);
    return response.data;
}
