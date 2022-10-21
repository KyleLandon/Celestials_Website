class twitchAPI {
    constructor(clientId, clientSecret, channelList) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.channelList = channelList;
    }
    getTwitchAuthorization() {
        let url = `https://id.twitch.tv/oauth2/token?client_id=${clinetId}&client_secret=${clinetSecret}&grant_type=client_credentials`;
    
        return fetch(url, {
        method: "POST",
        })
        .then((res) => res.json())
        .then((data) => {
            return data;
        });
    }
    
    async getStreams() {
        let finalstreamerList = ''
        let streamListLength = this.channelList.length
        for (let i = 0; i < this.channelList.length; i++) {
            if (streamListLength != i+1) {
                finalstreamerList += `user_login=${this.channelList[i]}&`
            }
            else {
                finalstreamerList += `user_login=${this.channelList[i]}`
            }
            
        }
        console.log(finalstreamerList)
    
        const endpoint = `https://api.twitch.tv/helix/streams?${finalstreamerList}`;
       // const endpoint = 'https://api.twitch.tv/helix/streams?user_login=loltyler1&user_login=tragiicisbad&user_login=xqc' ;
    
        let authorizationObject = await this.getTwitchAuthorization();
        let { access_token, expires_in, token_type } = authorizationObject;
    
        //token_type first letter must be uppercase    
        token_type =
        token_type.substring(0, 1).toUpperCase() +
        token_type.substring(1, token_type.length);
    
        let authorization = `${token_type} ${access_token}`;
    
        let headers = {
        authorization,
        "Client-Id": clinetId,
        };
    
        fetch(endpoint, {
        headers,
        })
        .then((res) => res.json())
        .then((data) => this.renderStreams(data));
    }
    
    renderStreams(data) {
        console.log(JSON.stringify(data));
    }
}




class CreateStreamerElements {
    constructor(container, streamerList) {
        this.container = document.getElementById("container");
        this.streamerList = streamerList
    }
    
    createStreamerList(streamer) {
        let streamerElement = document.createElement("li");
        streamerElement.classList.add("streamer");
        streamerElement.innerHTML = streamer;
        this.streamerList.appendChild(streamerElement);
    }
    
    removeStreamer(e) {
        if (e.target.classList.contains("streamer")) {
            e.target.remove();
        }
    }
    
    createStreamCard(streamer) {
        let streamCard = document.createElement("div");
        streamCard.classList.add("streamCard");
        streamCard.innerHTML = streamer;
        this.container.appendChild(streamCard);
    }
}


let callAPI = new twitchAPI('jld8u8wgq6gptu0aqtn4pwi3icyo4', 'yoh9ddqqr0p82hk0zfup4688esbyrn', ['bigrodentt', 'tragiicisbad', 'loltyler1', 'lirik'])



callAPI.getStreams()