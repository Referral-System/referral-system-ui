import axios from "axios";
import {useMutation} from "@tanstack/react-query";

const fetchAllUsers: any = async () => {
    try {
        const { data } = await axios.get('https://pure-caverns-73223.herokuapp.com:443/api/v1/users');

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
        const { data } = await axios.get('https://pure-caverns-73223.herokuapp.com:443/api/v1/roles');

        return data;
    } catch(e) {
        throw e;
    }
}

export const useFetchAllRoles = () => {
    const { isSuccess, isLoading, mutateAsync} = useMutation(fetchAllRoles);

    return { isSuccessFetchAllRoles: isSuccess, isLoadingFetchAllRoles: isLoading, fetchAllRoles: mutateAsync };
}

const createReferral = async () => {
    const data = await axios.post('https://pure-caverns-73223.herokuapp.com/api/v1/referrals')

    return data;
}

export const useCreateReferrals = () => {
    const { isSuccess, isLoading, mutateAsync} = useMutation(createReferral);

    return { isSuccessCreateReferrals: isSuccess, isLoadingCreateReferrals: isLoading, createReferral: mutateAsync };
}

const updateUser = async ( params: any ) => {
    const url = `https://pure-caverns-73223.herokuapp.com/api/v1/users/${params.userData.id}`
    const role_id = getByValue(params.roles, params.userData.value);
    const data = { role_id: role_id };

    const response = await axios.patch(url, data)
        
    return response;
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

