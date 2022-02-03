export interface VendorInput {
    name: string,
    ownerName: string,
    pinCode: string,
    email: string,
    password: string,
    phone: string,
    address: string
}

export interface VendorLoginInput {
    email : string,
    password : string
}

export interface VendorEditInput {
    name: string,
    ownerName: string,
    phone: string,
    address: string
}

export interface VendorPayload {
    _id : string,
    verifyTokenTracker : string
}
