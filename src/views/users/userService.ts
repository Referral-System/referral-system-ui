import axios from "axios";
import {useMutation} from "@tanstack/react-query";

const API_URL = 'https://referral-system-api.onrender.com'

const fetchAllUsers: any = async () => {
    try {
        const { data } = await axios.get(`${API_URL}/api/v1/users`);

        return data;
    } catch(e) {
        throw e;
    }
}

export const useFetchAllUsers = () => {
    const { isSuccess, isLoading, mutateAsync} = useMutation(fetchAllUsers);

    return { isSuccessFetchAllUsers: isSuccess, isLoadingFetchAllUsers: isLoading, fetchAllUsers: mutateAsync };
}

const fetchAllRoles: any = async () => {
    try {
        const { data } = await axios.get(`${API_URL}/api/v1/roles`);

        return data;
    } catch(e) {
        throw e;
    }
}

export const useFetchAllRoles = () => {
    const { isSuccess, isLoading, mutateAsync} = useMutation(fetchAllRoles);

    return { isSuccessFetchAllRoles: isSuccess, isLoadingFetchAllRoles: isLoading, fetchAllRoles: mutateAsync };
}

const updateUser = async ( params: any ) => {
    try {
        const url = `${API_URL}/api/v1/users/${params.userData.id}` 
        const role_id = getByValue(params.roles, params.userData.value);
        const data = { role_id: role_id };

        const response = await axios.patch(url, data)
        
        return response;
    } catch(e) {
        throw e;
    }
}

export const useUpdateUser = () => {
    const { isSuccess, isLoading, mutateAsync} = useMutation(updateUser);

    return { isSuccessUpdateUser: isSuccess, isLoadingUpdateUser: isLoading, updateUser: mutateAsync };
}

function getByValue(map: Map<string, string>, searchValue: string) {
    for (let [key, value] of map.entries()) {
      if (value === searchValue)
        return key;
    }
}

