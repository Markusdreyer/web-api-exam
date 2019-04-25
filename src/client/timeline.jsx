import React from "react";

export class Timeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        this.socket = new WebSocket("ws://" + window.location.host);

        this.socket.onmessage = (event => {

            const msg = JSON.parse(event.data);

            this.setState(
                prev => {
                    if (prev.posts === null) {
                        return { posts: [msg] };
                    } else {
                        return { posts: [...prev.posts, msg] };
                    }
                }
            );
        });
    }

    createPost = async () => {

        const url = "/api/posts";

        const payload = { author: this.props.user.id, text: this.state.text };

        let response;

        try {
            response = await fetch(url, {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
        } catch (err) {
            alert("Failed to connect to server: " + err);
            return;
        }

        if (response.status !== 201) {
            alert("Error when connecting to server: status code " + response.status);
            return;
        }

        //reset text after sending a message
        this.setState({ text: "" });
    };


    fetchPosts = async () => {

        let since = "";
        if (this.state.posts !== null && this.state.posts.length !== 0) {
            since = "?since=" + Math.max(...this.state.posts.map(m => m.id));
        }

        const url = "/api/posts" + since;

        let response;
        let payload;

        try {
            response = await fetch(url);
            payload = await response.json();
        } catch (err) {
            alert("Failed to connect to server: " + err);
            return;
        }

        if (response.status === 200) {

            this.setState(
                prev => {
                    if (prev.posts === null) {
                        return { posts: payload };
                    } else {
                        return { posts: prev.posts.concat(payload) };
                    }
                }
            );

        } else {
            alert("Error when connecting to server: status code " + response.status);
        }
    };


    render() {
        return (
            <div>
                <div className="postEditor">
                    <textarea cols="50"
                        rows="5"
                        value={this.state.text}
                        onChange={this.onTextChange}
                        id="msgInputId"
                    />
                </div>
            </div>
        );
    }
}


