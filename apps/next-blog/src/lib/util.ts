import dayjs from 'dayjs'
const DEFAULT_FORMAT = "d MMM, YYYY h:mm A"


export const uid = () => crypto.randomUUID()

export const formatDate = (data: Date, format: string = DEFAULT_FORMAT) => dayjs(data).format(format)

export const fetchJson=<JSON = unknown>( input: RequestInfo, init?: RequestInit,): Promise<JSON> =>{
        return fetch(input, {
                headers: {
                        accept: "application/json",
                        "content-type": "application/json",
                },
                ...init,
        }).then((res) => res.json());
}