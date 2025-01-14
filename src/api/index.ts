type TokensType = {
    accessToken: string
    refreshToken: string
}

export const login = (username: string) => {
    return fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username
        })
    }).then<TokensType>(res => res.json())
}

export const resource = (accessToken: string) => {
    return fetch('http://localhost:3000/resource', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    }).then(res => res.json())
}