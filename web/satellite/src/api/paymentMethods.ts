// Copyright (C) 2019 Storj Labs, Inc.
// See LICENSE for copying information.

import apollo from '@/utils/apolloManager';
import gql from 'graphql-tag';
import { RequestResponse } from '@/types/response';

export async function addProjectPaymentMethodRequest(projectID: string, cardToken: string, makeDefault: boolean): Promise<RequestResponse<null>> {
    let result: RequestResponse<null> = new RequestResponse<null>();

    let response: any = await apollo.mutate(
        {
            mutation: gql(`
                mutation {
                        addProjectPaymentMethod(
                            projectID: "${projectID}",
                            cardToken: "${cardToken}",
                            isDefault: ${makeDefault}
                        ) 
                }
            `),
            fetchPolicy: 'no-cache',
            errorPolicy: 'all'
        }
    );

    if (response.errors) {
        result.errorMessage = response.errors[0].message;
    } else {
        result.isSuccess = true;
    }

    return result;
}

export async function setDefaultPaymentMethodRequest(projectID: string, paymentID: string): Promise<RequestResponse<null>> {
    let result: RequestResponse<null> = new RequestResponse<null>();

    let response: any = await apollo.mutate(
        {
            mutation: gql(`
                mutation {
                    setDefaultPaymentMethod(
                        projectID: "${projectID}",
                        id: "${paymentID}"
                    )
                }
           `),
            fetchPolicy: 'no-cache',
            errorPolicy: 'all'
        }
    );

    if (response.errors) {
        result.errorMessage = response.errors[0].message;
    } else {
        result.isSuccess = true;
    }

    return result;
}

export async function deletePaymentMethodRequest(paymentID: string, projectID: string): Promise<RequestResponse<null>> {
    let result: RequestResponse<null> = new RequestResponse<null>();

    let response: any = await apollo.mutate(
        {
            mutation: gql(`
                mutation {
                    deletePaymentMethod(
                        id: "${paymentID}"
                        projectID: "${projectID}",
                    )
                }
           `),
            fetchPolicy: 'no-cache',
            errorPolicy: 'all'
        }
    );

    if (response.errors) {
        result.errorMessage = response.errors[0].message;
    } else {
        result.isSuccess = true;
    }

    return result;
}

// fetchProjectInvoices retrieves project invoices
export async function fetchProjectPaymentMethods(projectID: string): Promise<RequestResponse<PaymentMethod[]>> {
    let result: RequestResponse<PaymentMethod[]> = new RequestResponse<PaymentMethod[]>();

    let response: any = await apollo.query(
        {
            query: gql(`
                query {
                    project(id: "${projectID}") {
                        paymentMethods {
                            id,
                            expYear,
                            expMonth,
                            brand,
                            lastFour,
                            holderName,
                            addedAt,
                            isDefault
                        }
                    }
                }`
            ),
            fetchPolicy: 'no-cache',
            errorPolicy: 'all'
        }
    );

    if (response.errors) {
        result.errorMessage = response.errors[0].message;
    } else {
        result.isSuccess = true;
        result.data = response.data.project.paymentMethods;
    }

    return result;
}

export async function addUserPaymentMethod(cardToken: string): Promise<RequestResponse<boolean>> {
    let result: RequestResponse<boolean> = new RequestResponse();

    let response: any = await apollo.mutate(
        {
            mutation: gql(`
                mutation {
                    addUserPaymentMethod(
                        cardToken: "${cardToken}"
                    )
                }
           `),
            fetchPolicy: 'no-cache',
            errorPolicy: 'all'
        }
    );

    if (response.errors) {
        result.errorMessage = response.errors[0].message;
    } else {
        result.isSuccess = true;
    }

    return result;
}

export async function fetchUserPaymentMethods(): Promise<RequestResponse<PaymentMethod[]>> {
    let result: RequestResponse<PaymentMethod[]> = new RequestResponse();

    let response: any = await apollo.query(
        {
            query: gql(`
                query {
                    userPaymentMethods {
                            id,
                            expYear,
                            expMonth,
                            brand,
                            lastFour,
                            holderName,
                            addedAt,
                    }
                }`
            ),
            fetchPolicy: 'no-cache',
            errorPolicy: 'all'
        }
    );

    if (response.errors) {
        result.errorMessage = response.errors[0].message;
    } else {
        result.isSuccess = true;
        result.data = response.data.userPaymentMethods;
    }

    return result;
}

export async function attachUserPaymentMethod(paymentMethodID: string, projectID: string): Promise<RequestResponse<null>> {
    let result: RequestResponse<null> = new RequestResponse();

    let response: any = await apollo.mutate(
        {
            mutation: gql(`
                mutation {
                    attachPaymentMethod(
                        projectID: "${projectID}",
                        id: "${paymentMethodID}"
                    )
                }
           `),
            fetchPolicy: 'no-cache',
            errorPolicy: 'all'
        }
    );

    if (response.errors) {
        result.errorMessage = response.errors[0].message;
    } else {
        result.isSuccess = true;
    }

    return result;
}

