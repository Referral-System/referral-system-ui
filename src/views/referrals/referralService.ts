import axios from "axios";
import {useMutation} from "@tanstack/react-query";

const fetchAllReferrals: any = async () => {
    try {
        const { data } = await axios.get('https://pure-caverns-73223.herokuapp.com/api/v1/referrals');

        return data;
    } catch(e) {
        throw e;
    }
}

export const useFetchAllReferrals = () => {
    const { isSuccess, isLoading, isError, error, mutateAsync} = useMutation(fetchAllReferrals);

    return { isSuccessFetchAllReferrals: isSuccess, isLoadingFetchAllReferrals: isLoading, fetchAllReferrals: mutateAsync };
}

const createReferral = async ({referral}: any) => {
    const data = await axios.post('https://pure-caverns-73223.herokuapp.com/api/v1/referrals')

    return data;
}

export const useCreateReferrals = () => {
    const { isSuccess, isLoading, isError, error, mutateAsync} = useMutation(createReferral);

    return { isSuccessCreateReferrals: isSuccess, isLoadingCreateReferrals: isLoading, createReferral: mutateAsync };
}

