import axios from "axios";

const createApiFunction = (method, url) => async (data) => {
    const response = await axios[method](`${process.env.NEXT_PUBLIC_BASE_URL}/${url}`, data)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return err.response ? err.response.data : { message: 'An error occurred' };
        });
    return response;
};

export default function ApiAuth() {
    return {
        Login: createApiFunction("post", "auth/login"),
        createUser: createApiFunction("post", "auth/register"),
    };
}
