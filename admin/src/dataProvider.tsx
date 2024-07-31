import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

const apiUrl = import.meta.env.VITE_API_URL;
const httpClient = (url: string, options: any = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('authToken');
    options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
};

export default {
    getList: async (resource: string, params: any) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({ headers, json }) => ({
            data: json,
            total: parseInt(headers.get('Content-Range') || '0', 10),
        }));
    },
    getOne: (resource: string, params: any) => httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
        data: json,
    })),
    getMany: async (resource: string, params: any) => {
        const query = {
            filter: JSON.stringify({ ids: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({ json }) => ({
            data: json,
        }));
    },
    getManyReference: async (resource: string, params: any) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({ ...params.filter, [params.target]: params.id }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({ headers, json }) => ({
            data: json,
            total: parseInt(headers.get('Content-Range') || '0', 10),
        }));
    },
    update: async (resource: string, params: any) => {
        const url = `${apiUrl}/${resource}/${params.id}`;
        return httpClient(url, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: json,
        }));
    },
    updateMany: async (resource: string, params: any) => {
        const promises = params.ids.map((id: number) =>
            httpClient(`${apiUrl}/${resource}/${id}`, {
                method: 'PUT',
                body: JSON.stringify(params.data),
            })
        );
        return Promise.all(promises).then(responses => ({
            data: responses.map(({ json }) => json.id),
        }));
    },
    create: async (resource: string, params: any) => {
        const url = `${apiUrl}/${resource}`;
        if (resource.startsWith('images')){
            const formData = new FormData();
            formData.append('image', params.data.image.rawFile);
            formData.append('title', params.data.title);
            formData.append('tag', resource.split('/')[1].toUpperCase());
            return httpClient(url, {
                method: 'POST',
                body: formData,
            }).then(({ json }) => ({
                data: { ...params.data, id: json.id },
            }));
        } else {
            return httpClient(url, {
                method: 'POST',
                body: JSON.stringify(params.data),
            }).then(({ json }) => ({
                data: { ...params.data, id: json.id },
            }));
        }
    },
    delete: async (resource: string, params: any) => {
        const url = `${apiUrl}/${resource}/${params.id}`;
        return httpClient(url, {
            method: 'DELETE',
        }).then(({ json }) => ({
            data: json,
        }));
        
    },
    deleteMany: async (resource: string, params: any) => {
        const promises = params.ids.map((id: number) =>
            httpClient(`${apiUrl}/${resource}/${id}`, {
                method: 'DELETE',
            })
        );
        return Promise.all(promises).then(responses => ({
            data: responses.map(({ json }) => json.id),
        }));
    }
}