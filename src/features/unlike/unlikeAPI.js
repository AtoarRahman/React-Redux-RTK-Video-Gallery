export const unlikedVideo = async (id, value) => {

    const response = await fetch(`https://lwsjsonserver.herokuapp.com/videos/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                unlikes: value + 1 ,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });

    return await response.json();

};
