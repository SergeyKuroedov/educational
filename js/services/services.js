const postData = async (url, obj) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: obj
    })

    return await res.json();
};

const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};


export {postData};
export {getResource};